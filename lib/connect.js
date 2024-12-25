const { useMultiFileAuthState, Browsers,fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
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

async function connectionLogic() {
  const sessionId = config.SESSION_ID;
  const authDir = './auth';
  const credsFile = path.join(authDir, 'creds.json');
  let retryCount = 0;
  let restartMessageSent = false;

  console.log('Initializing connection... ⏳'); // Added emoji for clarity

  try {
    const base64Creds = await getSessionData(sessionId);
    if (base64Creds) {
      const creds = JSON.parse(Buffer.from(base64Creds, 'base64').toString('utf8'));
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }
      fs.writeFileSync(credsFile, JSON.stringify(creds, null, 2));
      console.log('Storing authentication file... 📂');

      try {
        const jsonCreds = fs.readFileSync(credsFile, 'utf8');
        const reEncodedCreds = Buffer.from(jsonCreds, 'utf8').toString('base64');
        
        // Store in PostgreSQL or MongoDB, depending on what is available
        if (config.DATABASE_URL) {
          console.log('Storing authentication file to PostgreSQL... 📊');
          await moveToSecondaryDatabase(sessionId, reEncodedCreds);
        } else if (config.MONGODB_URI) {
          console.log('Storing authentication file to MongoDB... 🗄️');
          await storeInMongoDB(sessionId, base64Creds);
        } else {
          console.log('Stored  authentication file to local directory... 💾');
          await storeInLocalStorage(sessionId, base64Creds);
        }
      } catch (err) {
        console.warn('⚠️ DB operation failed, falling back to MongoDB.');
        await storeInMongoDB(sessionId, base64Creds);
      }
    } else {
      console.error('SESSION ID INVALID GET NEW SESSION ID❌');
      execSync(`npm stop`);
    }
  } catch (error) {
    console.error('❌ Error initializing session:', error.message || 'Unknown error');
    execSync(`npm stop`);
  }

  const { state, saveCreds } = await useMultiFileAuthState(authDir);
const { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

  async function connect() {
    const sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      browser: Browsers.windows('Safari'),
      syncFullHistory: false,
      generateHighQualityLinkPreview: true,
    });

// Set up console.wa
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

    global.console.waMedia = {
  sendImage: async (imagePath, caption = '') => {
    if (global.currentChat) {
      try {
        await sock.sendMessage(global.currentChat, { image: { url: imagePath }, caption });
        console.log(`Image sent to ${global.currentChat}`);
      } catch (error) {
        console.error('Failed to send image:', error.message);
      }
    } else {
      console.error('No active chat to send image.');
    }
  },

  sendVideo: async (videoPath, caption = '') => {
    if (global.currentChat) {
      try {
        await sock.sendMessage(global.currentChat, { video: { url: videoPath }, caption });
        console.log(`Video sent to ${global.currentChat}`);
      } catch (error) {
        console.error('Failed to send video:', error.message);
      }
    } else {
      console.error('No active chat to send video.');
    }
  },

  sendDocument: async (documentPath, caption = '') => {
    if (global.currentChat) {
      try {
        await sock.sendMessage(global.currentChat, { document: { url: documentPath }, caption });
        console.log(`Document sent to ${global.currentChat}`);
      } catch (error) {
        console.error('Failed to send document:', error.message);
      }
    } else {
      console.error('No active chat to send document.');
    }
  }
};

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        console.log('✅ Connected to WhatsApp.');
        retryCount = 0;

        try {
          // Resync encryption keys after reconnecting
          await sock.resyncAppState(['critical_block', 'critical_unblock_low']);
          console.log('🔑 Encryption keys resynchronized.');
        } catch (error) {
          console.error('❌ Failed to resync encryption keys:', error.message || 'Unknown error');
        }

        if (!restartMessageSent) {
          await sendRestartMessage(sock);
          restartMessageSent = true;
          console.log('📩 Restart message sent.');

          // Delete session data only after restart message is sent
          await deleteSessionData(sessionId);
          console.log('ENJOY SOPHIA-MD🥳');
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

module.exports = connectionLogic;
