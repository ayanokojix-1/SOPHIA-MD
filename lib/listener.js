const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const {exec} = require('child_process');
const { executeCommand } = require('./commandHandler');
const config = require('../config');

const unlink = promisify(fs.unlink); // To delete the file after 5 minutes
global.lastBotRestartTime = Date.now();
let handlerPrefix = config.HANDLER || '';  // Move this outside of the function

if (handlerPrefix.toLowerCase() === 'null') {
    handlerPrefix = '';
} else {
    handlerPrefix = handlerPrefix.toLowerCase();
}

function escapeForRegex(string) {
    if (!string) return ''; // Handle empty prefix case
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const escapedPrefix = escapeForRegex(handlerPrefix)
function messageListener(sock) {
  sock.ev.on('messages.upsert', async (messageInfo) => {
   const message = messageInfo.messages[0];
    if (!message?.message) return;
    
    const messageTimestamp = message.messageTimestamp * 1000;  // Convert message timestamp to milliseconds
        const restartTime = global.startTime;  // The bot's last restart timestamp

        // Check if the message was sent before the bot restart (ignore those messages)
        if (messageTimestamp < restartTime) {
          console.log(`This is the message timestamp ${messageTimestamp} and this is the original time ${restartTime}`)
            console.log("Ignoring message sent before bot restart.");
            return;
        }
    
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
    const commandMatch = normalizedText.match(new RegExp(`^\\s*${escapedPrefix ? `${escapedPrefix}` : ''}(\\w+)`));
        if (commandMatch) {
            const commandName = `${handlerPrefix}${commandMatch[1]}`.toLowerCase();
    
      await executeCommand(commandName, sock, message);
      return;
    }

    // Handle greeting (e.g., "Sophia")
    const greetingRegex = /^(sophia)\b/i;
    if (isPrivateChat && greetingRegex.test(normalizedText)) {
      await sock.sendMessage(message.key.remoteJid, { text: `Olaaaa! How's u?` });
      return;
    }

    // Handle inline evaluation commands (starts with £)
    if (text.startsWith('©')) {
      const sender = message.key.remoteJid
      const participant = message.key.participant

      if (!allowedUsers.includes(sender) && !allowedUsers.includes(participant)&& !message.key.fromMe) {
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
