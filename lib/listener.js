const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const {exec} = require('child_process');
const { executeCommand } = require('./commandHandler');
const config = require('../config');

const unlink = promisify(fs.unlink); // To delete the file after 5 minutes

let handlerPrefix = config.HANDLER || '';  // Move this outside of the function

if (handlerPrefix.toLowerCase() === 'null') {
  handlerPrefix = '';
} else {
  handlerPrefix = handlerPrefix.toLowerCase();
}

function messageListener(sock) {
  sock.ev.on('messages.upsert', async (messageInfo) => {
   const message = messageInfo.messages[0];
    if (!message?.message) return;
const quotedMessage = message?.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;
    global.m.quoted = quotedMessage; // Update m.quoted globall
global.m.stanzaId = message.message.extendedTextMessage?.contextInfo?.stanzaId || null;
    console.log("Received message:", JSON.stringify(message, null, 2));
    // Extract the sender's remoteJid
    global.currentChat = message.key.remoteJid;

    const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    const isPrivateChat = message.key.remoteJid.endsWith('@s.whatsapp.net');

    // Normalize the message text (convert to lowercase)
    const normalizedText = text.toLowerCase();

    
    const allowedUsers = ['2348073765008@s.whatsapp.net', '2347017895743@s.whatsapp.net'];

    // Handle commands with prefix
    const commandMatch = normalizedText.match(new RegExp(`^\\s*${handlerPrefix}(\\w+)`));
    if (commandMatch) {
      const commandName = `${handlerPrefix}${commandMatch[1]}`.toLowerCase();
      await executeCommand(commandName, sock, message);
      return;
    }

    // Handle ~ command to save JS file
    if (text.startsWith('~')) {
      const commandContent = text.slice(1).trim(); // Remove the '~'
      const jid = message.key.remoteJid;
      const fromMe = message.key.fromMe;

      if (!commandContent) {
        return sock.sendMessage(jid, { text: 'Nothing to save.' });
      }
      if (!fromMe && !allowedUsers.includes(jid)) {
        return sock.sendMessage(jid, { text: 'You do not have permission.' });
      }

      // Save the content to a JS file
      const fileName = `${Math.random().toString(36).substring(2, 15)}.js`;
      const filePath = path.join(__dirname, '../commands', fileName);

      fs.writeFileSync(filePath, commandContent);

      await sock.sendMessage(jid, { text: 'File saved! Test it out.' });

      // Delete file after 5 minutes
      setTimeout(() => {
        unlink(filePath)
          .then(() => console.log(`Deleted ${fileName} after 5 minutes.`))
          .catch(err => console.error('Failed to delete file:', err));
      }, 300000); // 5 minutes
      return;
    }

    // Handle greeting (e.g., "Sophia")
    const greetingRegex = /^(sophia)\b/i;
    if (isPrivateChat && greetingRegex.test(normalizedText)) {
      await sock.sendMessage(message.key.remoteJid, { text: `Olaaaa! How's u?` });
      return;
    }

    // Handle inline evaluation commands (starts with £)
    if (text.startsWith('>')) {
      const sender = message.key.remoteJid;

      if (!allowedUsers.includes(sender) && !message.key.fromMe) {
        return;
      }

      try {
        const result = await eval(text.slice(1));
        const output = typeof result === 'object' ? JSON.stringify(result, null, 2) : result;
        await sock.sendMessage(sender, { text: `Executed: ${output}` }, { quoted: message });
      } catch (error) {
        await sock.sendMessage(sender, { text: `Error: ${error.message}` }, { quoted: message });
      }
      return;
    }

    // Handle shell commands (starts with $)
    if (text.startsWith('$')) {
      const sender = message.key.remoteJid;

      if (!allowedUsers.includes(sender) && !message.key.fromMe) {
        await sock.sendMessage(sender, { text: 'You do not have permission to run this command.' }, { quoted: message });
        return;
      }

      const command = text.slice(1).trim();

      if (!command) {
        await sock.sendMessage(sender, { text: 'Please provide a shell command to execute.' }, { quoted: message });
        return;
      }

      try {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Exec error: ${error.message}`);
            sock.sendMessage(sender, { text: `Error executing command: ${error.message}` }, { quoted: message });
            return;
          }

          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            sock.sendMessage(sender, { text: `Error output:\n${stderr}` }, { quoted: message });
            return;
          }

          sock.sendMessage(sender, { text: `Output:\n${stdout}` }, { quoted: message });
        });
      } catch (err) {
        console.error('Error executing command:', err);
        sock.sendMessage(sender, { text: 'Failed to execute command.' }, { quoted: message });
      }
      return;
    }
  });
}

module.exports = { messageListener, handlerPrefix };
