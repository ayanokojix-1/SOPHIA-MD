const { useMultiFileAuthState, Browsers, fetchLatestBaileysVersion, makeInMemoryStore } = require('@whiskeysockets/baileys');
const makeWASocket = require('@whiskeysockets/baileys').default;
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const { registerCommands } = require('./CommandRegistry');
const { messageListener } = require('./listener');
const { 
  getSessionData, 
  moveToSecondaryDatabase, 
  storeInMongoDB, 
  storeInLocalStorage, 
  deleteSessionData 
} = require('./dbHelper');
const sendRestartMessage = require('./restartMessage'); // Import the restart message handler
const config = require('../config');
const { execSync } = require('child_process');

// Create the store
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

// Persist the store
store.readFromFile('./baileys_store.json');
setInterval(() => {
  store.writeToFile('./baileys_store.json');
}, 10_000);

async function connectionLogic() {
  const sessionId = config.SESSION_ID;
  const authDir = './auth';
  const credsFile = path.join(authDir, 'creds.json');
  let retryCount = 0;
  let restartMessageSent = false;

  console.log('Initializing connection... ⏳');

  try {
    const base64Creds = await getSessionData(sessionId);
    if (base64Creds) {
      const creds = JSON.parse(Buffer.from(base64Creds, 'base64').toString('utf8'));
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }
      fs.writeFileSync(credsFile, JSON.stringify(creds, null, 2));
      console.log('Storing authentication file... 📂');
    } else {
      console.error('SESSION ID INVALID. GET NEW SESSION ID ❌');
      execSync(`npm stop`);
    }
  } catch (error) {
    console.error('❌ Error initializing session:', error.message || 'Unknown error');
    execSync(`npm stop`);
  }

  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`);

  async function connect() {
    const sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: "silent" }),
      browser: Browsers.windows('Safari'),
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
    });

    store.bind(sock.ev);

    global.console.wa = async (message) => {
      if (global.currentChat) {
        try {
          await sock.sendMessage(global.currentChat, { text: message });
          console.log(`Message sent to ${global.currentChat}: ${message}`);
        } catch (error) {
          console.error('Failed to send message via console.wa:', error.message);
        }
      } else {
        console.error('No active chat to send message.');
      }
    };

global.console.getMessage = async (key) => {
    try {
        if (store) {
            // Retrieve the message from the store using the key
            const msg = await store.loadMessage(key.remoteJid, key.id);
            
            // Extract the message content (either extended text or regular conversation)
            const messageContent = msg?.message?.extendedTextMessage?.text || msg?.message?.conversation;
            
            if (messageContent) {
                // Send the message content back to the remoteJid
                console.wa(messageContent, key.remoteJid); // Assuming console.wa sends messages to the remoteJid
            } else {
                console.warn('No message content found.');
            }

            return msg?.message || undefined; // Return the message
        }
        console.warn('Store not initialized, returning an empty message.');
        return {};
    } catch (error) {
        console.error('Error fetching message from store:', error.message);
        return {}; // Return an empty object on error
    }
};
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        console.log('✅ Connected to WhatsApp.');
        retryCount = 0;

        try {
          await sock.resyncAppState(['critical_block', 'critical_unblock_low']);
          console.log('🔑 Encryption keys resynchronized.');
        } catch (error) {
          console.error('❌ Failed to resync encryption keys:', error.message || 'Unknown error');
        }

        if (!restartMessageSent) {
          await sendRestartMessage(sock);
          restartMessageSent = true;
          console.log('📩 Restart message sent.');

          await deleteSessionData(sessionId);
          console.log('ENJOY SOPHIA-MD 🥳');
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
          connect();
        }
      }
    });

    sock.ev.on('creds.update', saveCreds);

    registerCommands();
    messageListener(sock);
  }

  await connect();
}

module.exports = connectionLogic
