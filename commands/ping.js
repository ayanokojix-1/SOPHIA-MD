const Command = require('../lib/Command'); // Import Command structure
const config = require('../config');
const axios = require('axios');
const os = require('os');
const fs = require('fs');
const {delay} = require('../lib/functions');
const { exec } = require('child_process');

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
        await sock.sendMessage(message.key.remoteJid, { text: "Couldn't find the definition for that word. ❌"});
    }
}


const restartCommand = new Command(
  'restart',
  'Restart the bot',
  async (sock, message) => {
    console.log('Restarting the bot...');
    // Send restart message using console.wa
    await console.wa('Bot is restarting... 🔄');
    
    // Wait for 1 second using your delay helper
    await delay(1000);

    // Restart logic
    console.log('Bot restarting now...');
    exec("npm restart", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting bot: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  },
  'private', // Access level (for admins only)
  'Utility', // Category
  false // Group-only restriction
);


const statusCommand = new Command('status', 'Displays the current status of the bot', handleStatusCommand);
const pingCommand = new Command('ping', 'Responds with Pong and latency', handlePingCommand);
const defineCommand = new Command('define', 'inbuilt dictionary for helping',handleDefineCommand, 'public')


module.exports = { statusCommand,restartCommand,pingCommand, defineCommand };
