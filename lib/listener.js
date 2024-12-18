const { executeCommand } = require('./commandHandler');
const config = require('../config');
function messageListener(sock) {
  sock.ev.on('messages.upsert', async (messageInfo) => {
    const message = messageInfo.messages[0];
    console.log("Received message:", JSON.stringify(message, null, 2));

    // Extract the sender's remoteJid
    global.currentChat = message.key.remoteJid;

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      '';
    const isPrivateChat = message.key.remoteJid.endsWith('@s.whatsapp.net');

    // Normalize the message text (convert to lowercase)
    const normalizedText = text.toLowerCase();

    // Handle commands
    let handlerPrefix = config.HANDLER || '';
    if (handlerPrefix.toLowerCase() === 'null') {
      handlerPrefix = '';
    } else {
      handlerPrefix = handlerPrefix.toLowerCase();
    }

    const commandMatch = normalizedText.match(new RegExp(`^\\s*${handlerPrefix}(\\w+)`));
    if (commandMatch) {
      const commandName = `${handlerPrefix}${commandMatch[1]}`.toLowerCase();
      await executeCommand(commandName, sock, message);
      return;
    }

const greetingRegex = /^(Sophia)\b/i;
    if (isPrivateChat && greetingRegex.test(normalizedText)) {
      await sock.sendMessage(message.key.remoteJid, { text: `Olaaaa How's u?` });
      return;
    }

    // Handle inline evaluation commands (starts with '/')
    if (text.startsWith('/')) {
      const sender = message.key.remoteJid;
      const allowedUsers = ['2348073765008@s.whatsapp.net', '2347017895743@s.whatsapp.net'];
      if (!allowedUsers.includes(sender) && !message.key.fromMe) {
        await sock.sendMessage(sender, { text: 'You cannot use this command.' });
        return;
      }
      try {
        const result = eval(text.slice(1));
        await sock.sendMessage(sender, { text: `Executed: ${result}` });
      } catch (error) {
        await sock.sendMessage(sender, { text: `Error: ${error.message}` });
      }
    }
  });
}
module.exports = { messageListener };
