const Command = require('../lib/Command'); // Import the Command class
const { commands } = require('../lib/commandHandler'); // Import the commands map
const path = require('path');
const fs = require('fs');

// Define different font styles
const fonts = [
    str => `𝓖𝓸𝓽𝓱𝓲𝓬: ${str}`, // Gothic style
    str => `Ｔｉｍｅｓ: ${str}`, // Times New Roman style
    str => `🅱🅾🅻🅳: ${str}`, // Bold style
    str => `ＣＯＯＬ: ${str}`, // Cool font
    str => `𝐌𝐨𝐧𝐨𝐬𝐩𝐚𝐜𝐞: ${str}`, // Monospace
];

// Define stars for decoration
const stars = ['✯', '✰', '✱', '✶', '✵', '✲', '✩', '✸', '✬', '✭', '❂'];

const listCommands = async (sock, message) => {
    try {
        // Get the user's WhatsApp name
        const userName = message.pushName || 'User';

        // Group commands by category
        const categorizedCommands = {};
        Array.from(commands.values()).forEach((cmd) => {
            const category = cmd.category || 'General'; // Default category
            if (!categorizedCommands[category]) {
                categorizedCommands[category] = [];
            }
            categorizedCommands[category].push(cmd.name.toUpperCase());
        });

        // Generate random font and star for this session
        const randomFont = () => fonts[Math.floor(Math.random() * fonts.length)];
        const randomStar = () => stars[Math.floor(Math.random() * stars.length)];

        // Header with dynamic user information
        let responseText = `${randomStar()} ╭═══ ${randomFont()('SOPHIA-MD')} ═══⊷\n`;
        responseText += `${randomStar()} ┃ ᴜꜱᴇʀ: ${randomFont()(userName)}\n`;
        responseText += `${randomStar()} ┃ ᴅᴀᴛᴇ: ${new Date().toLocaleDateString()}\n`;
        responseText += `${randomStar()} ┃ ᴛɪᴍᴇ: ${new Date().toLocaleTimeString()}\n`;
        responseText += `${randomStar()} ┃ ᴘʟᴀᴛꜰᴏʀᴍ: VPS (Linux)\n`;
        responseText += `${randomStar()} ╰═════════════════⊷\n\n`;

        // Add categorized commands with random fonts
        for (const [category, cmds] of Object.entries(categorizedCommands)) {
            responseText += `${randomStar()} ╭─❏ ${randomFont()(category.toUpperCase())} ❏\n`;
            cmds.forEach(cmd => {
                responseText += `${randomStar()} │ ${randomFont()(cmd)}\n`;
            });
            responseText += `${randomStar()} ╰─────────────────\n`;
        }

        // Path to image in the 'assets' folder
        const imagePath = path.join(__dirname, '../assets/my-image.jpg');
        if (fs.existsSync(imagePath)) {
            // Caption with dynamic user information
            const caption = `✨ *Sophia-MD* - ${randomFont()('Hello')} ${userName}!`;

            // Send the menu image with caption
            await sock.sendMessage(message.key.remoteJid, {
                image: fs.readFileSync(imagePath),
                caption: responseText,
            });
        } else {
            // Send just the menu text if no image is available
            await sock.sendMessage(message.key.remoteJid, { text: responseText });
        }
    } catch (error) {
        console.error('Error while listing commands:', error);
        await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to list commands.' });
    }
};

// Register the menu command
const listCommand = new Command('menu', 'List all available commands', listCommands);
module.exports = { listCommand };
