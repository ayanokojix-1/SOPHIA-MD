const { useMultiFileAuthState, Browsers,fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const makeWASocket = require('@whiskeysockets/baileys').default;
const pino = require('pino');
const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');
const { registerCommands } = require('./CommandRegistry');
const { messageListener } = require('./listener');
const { 
  getSessionData, 
  deleteSessionData,
  updateSession
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
  const tempZipPath = './ayanokoji.zip';
  console.log('Initializing connection... ⏳');

  try {
    // Step 1: Update session before initializing
    console.log('🔄 Updating session before connection...');
    await updateSession(sessionId); // Update the session data with the latest credentials

    const base64Creds = await getSessionData(sessionId);
    if (base64Creds) {
      const zipBuffer = Buffer.from(base64Creds, "base64");
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }
      fs.writeFileSync(tempZipPath, zipBuffer);
      const zip = new AdmZip(tempZipPath);
      zip.extractAllTo(authDir, true);
      console.log('✅ Auth files prepared.');
      fs.unlinkSync(tempZipPath);
    } else {
      console.error('❌ SESSION ID INVALID. GET NEW SESSION ID!');
      execSync('npm stop');
    }
  } catch (error) {
    console.error('❌ Error initializing session:', error.message || 'Unknown error');
    execSync(`npm stop`);
  }

  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`);

  async function connect() {
    sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      browser: Browsers.windows('Safari'),
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      shouldSyncHistoryMessage: (msg) => true,
      getMessage: async (key) => await getMessage(key),
    });
    store.bind(sock.ev);
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        console.log('✅ Connected to WhatsApp.');
        retryCount = 0;

        if (!restartMessageSent) {
          await sendRestartMessage(sock);
          restartMessageSent = true;
          console.log('📩 Restart message sent.');
          console.log('ENJOY SOPHIA-MD🥳');

          // Step 2: Update session after successful connection
          console.log('🔄 Updating session after connection...');
          await updateSession(sessionId); // Ensure session data stays updated
        }
      } else if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        if (reason === 401) {
          console.error('❌ Bot logged out. Stopping...');
          execSync(`npm stop`);
        } else if (++retryCount > 3) {
          console.error('❌ Retry limit exceeded. Stopping...');
          execSync(`npm stop`);
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

  // Step 3: Periodically update session
  setInterval(async () => {
    await updateSession(sessionId);
  }, 10 * 60 * 500); // Update every 10 minutes

  await connect();
}

module.exports = connectionLogic;
