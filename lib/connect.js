const { useMultiFileAuthState, Browsers,fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const makeWASocket = require('@whiskeysockets/baileys').default;
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const { setupLinkDetection } = require('./antilink2');
const { registerCommands } = require('./CommandRegistry');
const { messageListener } = require('./listener');
const { 
  downloadFile
} = require('./dbHelper');

const sendRestartMessage = require('./restartMessage'); // Import the restart message handler
const config = require('../config');
const { execSync } = require('child_process');
const {
  store,
  getMessage
} = require('./store')
const {delay} = require('./functions')

async function connectionLogic() {
  const sessionId = config.SESSION_ID;
  const authDir = './auth';
  const credsFile = path.join(authDir, 'creds.json');
  let retryCount = 0;
  let restartMessageSent = false;
  console.log('Initializing connection... ⏳');

if (!sessionId) {
  console.error('SESSION_ID NOT FOUND');
  process.exit(1); // Exit the process to prevent further execution
}

if (!sessionId.includes('sophia_md')) {
  console.error('SESSION_ID INVALID');
  process.exit(1);
}

try {
  if(!fs.existsSync(authDir)){
    fs.mkdirSync(authDir);
  }
  console.log('Loading Authentication file');
  const credsBuff = await downloadFile(sessionId);
  console.log("Connecting to Sophia database🔌");
  if (!credsBuff) {
    throw new Error('Session file not found or empty.');
  }
  await fs.promises.writeFile(credsFile, credsBuff);
} catch (error) {
  console.error(`SESSION_ID ERROR: ${error}`);
  process.exit(1); // Stop execution on error
}

  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`);

  async function connect() {
    console.log('Attempting to connect to WhatsApp ⬆️');
    sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      browser: Browsers.windows('Safari'),
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      linkPreviewImageThumbnailWidth: 640,
      shouldSyncHistoryMessage: (msg) => true,
      getMessage: async (key) => await getMessage(key),
    });
    store.bind(sock.ev);
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        console.log('✅ Connected to WhatsApp successfully . ');
        retryCount = 0;

        if (!restartMessageSent) {
           sendRestartMessage(sock);
          restartMessageSent = true;
            setupLinkDetection(sock);
         
        }
      } else if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        if (reason === 401) {
          console.error('❌ Bot logged out. Stopping...');
           process.exit(1);
          if(reason === 408){
            console.error("⏰ Timed out restarting");
           connect()
          }
        } else if (++retryCount > 3) {
          console.error('❌ Retry limit exceeded. Stopping...');
           process.exit(1);
        } else {
          console.warn(`🔄 Reconnecting (${retryCount}/3)...`);
          await delay(5000);
          connect();
        }
      }
    });

    sock.ev.on('creds.update', saveCreds);

    registerCommands();
    messageListener(sock);
    require('./console')
  }

  await connect();
}

module.exports = connectionLogic;
