const Command = require('../lib/Command'); 

const command = new Command(
  'play2', // Command name
  'Sends a message and logs response.key to check its contents', // Command description
  async (sock, message) => {
    try {
      const jid = message.key.remoteJid; // Gets the chat ID
      
      // Sends a message and logs the response key
      const response = await sock.sendMessage(jid, { text: 'hello!' });
      console.log("this is the response key:",response.key);

      // Sends a response to the user confirming that the key has been logged
      console.wa('Logged response.key. Check your console for details.');
    } catch (error) {
      console.wa(`An error occurred: ${error.message}`);
    }
  },
  'public', // Access level
  'Utilities', // Category
  false // Not restricted to groups
);

module.exports = { command };
