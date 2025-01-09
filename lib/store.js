const fs = require('fs');
const path = require('path');
const makeInMemoryStore = require('@whiskeysockets/baileys').makeInMemoryStore;
const { proto } = require('@whiskeysockets/baileys');
// Create a store instance
const logger = require('pino')({ level: 'silent' }); // Modify logger as needed
const store = makeInMemoryStore({ logger });

// Bind store to a file for persistence
const storeFilePath = path.join(__dirname, './database/baileys_store_multi.json');

// Read store data from file (if it exists)
if (fs.existsSync(storeFilePath)) {
  store.readFromFile(storeFilePath);
  console.log('Store data loaded from file.');
}

// Save store data to file periodically
setInterval(() => {
  store.writeToFile(storeFilePath);
}, 10_000);

// Function to load a message using the store
async function loadMessage(remoteJid, messageId) {
  if (store) {
    try {
      const msg = await store.loadMessage(remoteJid, messageId);
      return msg || undefined;
    } catch (error) {
      console.error('Failed to load message:', error);
      return undefined;
    }
  }
  return undefined;
}

// Function to get a message (fallback to a default if no store is present)
async function getMessage(key) {
  if (store) {
    const msg = await loadMessage(key.remoteJid, key.id);
    return msg || undefined;
  }
  // Return an empty message object as fallback
  return proto.Message.fromObject({});
}

// Export the store and helper functions
module.exports = {
  store,
  loadMessage,
  getMessage,
};