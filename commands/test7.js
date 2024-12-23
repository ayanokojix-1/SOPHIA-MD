const Command = require('../lib/Command'); 

const command = new Command(
  'edit', // Command name
  'Edits a quoted message when used with #edit followed by the new text', // Command description
  async (sock, message) => {
    try {
      const jid = message.key.remoteJid; // Gets the chat ID
      const text = message.message.conversation || message.message.extendedTextMessage?.text; // Extract the command text

      // Ensure the message is a reply
      const contextInfo = message.message.extendedTextMessage?.contextInfo;
      if (!contextInfo || !contextInfo.stanzaId) {
        return console.wa('Please reply to a message with #edit followed by the new text.');
      }

      // Extract the quoted message's stanzaId and check for the #edit prefix
      if (!text || !text.startsWith('#edit ')) {
        return console.wa('Use the command with #edit followed by the new text.');
      }

      const newText = text.slice(6).trim(); // Extract new text after #edit
      if (!newText) {
        return console.wa('You need to provide the new text after #edit.');
      }

      // Edit the quoted message with the new text
      await sock.sendMessage(jid, {
        text: newText,
        edit: contextInfo.stanzaId,
      });

      console.wa('Message updated successfully!');
    } catch (error) {
      console.wa(`An error occurred: ${error.message}`);
    }
  },
  'public', // Access level
  'Utilities', // Category
  false // Not restricted to groups
);
