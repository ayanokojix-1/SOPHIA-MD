const { exec } = require('child_process');
const Command = require('../lib/Command');

// Command structure
const editCommand = new Command(
  'edit',
  'Edits a quoted message with new text',
  async (sock, message, args) => {
  const quotedMessage = message.message.extendedTextMessage?.contextInfo?.quotedMessage
    try {
      // Ensure there is a quoted message
      if (!quotedMessage) {
        return sock.sendMessage(message.key.remoteJid, { text: 'Please quote a message to edit.' });
      }

      // Get the quoted message key and new text
      const quotedMessageKey = message.message.extendedTextMessage.contextInfo.quotedMessage
      const newText = args.join(' '); // The text you want to replace the quoted message with

      if (!newText) {
        return sock.sendMessage(message.key.remoteJid, { text: 'You need to provide new text to edit the message.' });
      }

      // Send the edited message
      await sock.sendMessage(message.key.remoteJid, {
        text: newText,  // New text to replace the old message
        edit: quotedMessageKey.key, // Reference the original quoted message using its key
      });

    } catch (error) {
      console.error('Error editing message:', error);
      sock.sendMessage(message.key.remoteJid, { text: 'Failed to edit the message.' });
    }
  },
  'public', // Access level
  'Utility', // Category
  false // Group-only restriction
);

module.exports = { editCommand };
