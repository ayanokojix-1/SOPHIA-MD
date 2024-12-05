const Command = require('../lib/Command'); // Import Command structure
const config = require('../config');
const axios = require('axios');
const os = require('os');
const fs = require('fs');

// Function to detect platform (Render, Heroku, VPS, or Unknown)
const detectPlatform = () => {
    const hostname = os.hostname();

    if (hostname.includes('heroku')) {
        return 'Heroku';
    } else if (hostname.includes('render')) {
        return 'Render';
    } else if (hostname.includes('vps')) {
        return 'VPS';
    } else if (fs.existsSync('/opt/render/')) {
        return 'Render'; // Specific check for Render
    } else if (fs.existsSync('/app')) {
        return 'Heroku'; // Specific check for Heroku
    } else {
        return 'Unknown Platform';
    }
};

// Ping command handler
const handlePingCommand = async (sock, message) => {
 const startTime = Date.now();
    await sock.sendMessage(message.key.remoteJid, { text: '_*Pong!!!🏓*_' });
    const latency = Date.now() - startTime;
    await sock.sendMessage(message.key.remoteJid, { text: `_*Latency: ${latency} ms*_` });
};
// Status command handler
const handleStatusCommand = async (sock, message) => {
    const uptime = (Date.now() - global.startTime) / 1000;
    const uptimeFormatted = new Date(uptime * 1000).toISOString().substr(11, 8);
    const botMode = config.MODE || "Unknown";
    const platform = detectPlatform();

    const replyMessage = `
✨ **Bot Status** ✨

🟢 **Online**: SOPHIA MD is currently up and running!

⏱️ **Uptime**: ${uptimeFormatted} (HH:MM:SS)

🔒 **Mode**: ${botMode === 'public' ? 'Public' : 'Private'}

🌐 **Platform**: ${platform}
`;

    await sock.sendMessage(message.key.remoteJid, { text: replyMessage });
};



async function handleDefineCommand(sock, message) {
    const text = message.message.conversation || message.message.extendedTextMessage.text || '';
    const word = text.split(' ')[1]; // Get the word after the command

    if (!word) {
        await sock.sendMessage(message.key.remoteJid, { text: "Please provide a word to define. 🧠" });
        return;
    }

    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const definition = response.data[0].meanings[0].definitions[0].definition;
        const partOfSpeech = response.data[0].meanings[0].partOfSpeech;
        const example = response.data[0].meanings[0].definitions[0].example || "No example provided.";

        const reply = `*Word:* ${word}\n*Definition:* ${definition}\n*Part of Speech:* ${partOfSpeech}\n*Example:* ${example}`;
        await sock.sendMessage(message.key.remoteJid, { text: reply });
    } catch (error) {
        console.error(error);
        await sock.sendMessage(message.key.remoteJid, { text: "Couldn't find the definition for that word. ❌" });
    }
}


function isQuotedMessage(message) {
  return message?.message?.extendedTextMessage?.contextInfo?.quotedMessage !== undefined;
}

// Forwarding the quoted message
async function handleForwardQuotedMessage(sock, message, jid) {
  try {
    if (isQuotedMessage(message)) {
      const quotedMessage = message.message.extendedTextMessage.contextInfo.quotedMessage;
      const quotedMessageId = message.message.extendedTextMessage.contextInfo.stanzaId;

      const messageContent = {
        text: quotedMessage?.conversation || "", // Extract the text, image, video, etc.
        image: quotedMessage?.imageMessage ? await downloadMediaMessage(quotedMessage) : undefined,
        video: quotedMessage?.videoMessage ? await downloadMediaMessage(quotedMessage) : undefined,
        document: quotedMessage?.documentMessage ? await downloadMediaMessage(quotedMessage) : undefined,
        mimetype: quotedMessage?.imageMessage?.mimetype || quotedMessage?.videoMessage?.mimetype,
        caption: quotedMessage?.imageMessage?.caption || quotedMessage?.videoMessage?.caption || "Forwarded message"
      };

      // Forward the message to the specified JID
      await sock.sendMessage(jid, messageContent);
      console.log(`Message forwarded to ${jid}`);
    } else {
      await sock.sendMessage(message.key.remoteJid, { text: "No quoted message to forward." });
    }
  } catch (error) {
    console.error("Error forwarding quoted message:", error);
    await sock.sendMessage(message.key.remoteJid, { text: "An error occurred while forwarding the quoted message." });
  }
}

const statusCommand = new Command('status', 'Displays the current status of the bot', handleStatusCommand);
const pingCommand = new Command('ping', 'Responds with Pong and latency', handlePingCommand);
const defineCommand = new Command('define', 'inbuilt dictionary for helping',handleDefineCommand, 'public')

// Registering the forward command
const forwardCommand = new Command('forward', 'Forwards a quoted message to a specific JID', async (sock, message) => {
  const match = message.text.match(/^forward\s+([a-zA-Z0-9@.-]+)$/); // Match for the JID in the command
  if (match) {
    const targetJid = match[1];
    await handleForwardQuotedMessage(sock, message, targetJid);
  } else {
    await sock.sendMessage(message.key.remoteJid, { text: "Please provide a valid JID to forward the message to." , },'private');
  }
});

module.exports = { statusCommand, pingCommand, defineCommand, forwardCommand };
