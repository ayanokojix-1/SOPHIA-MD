const Command = require('../lib/Command'); // Import the Command class
const { commands } = require('../lib/commandHandler'); // Import the commands map
const path = require('path');
const fs = require('fs');

const listCommands = async (sock, message) => {
    try {
        // Get the user's WhatsApp name (fall back to "User" if unavailable)
        const userName = message.pushName || 'User';

        // Group commands by category
        const categorizedCommands = {};
        Array.from(commands.values()).forEach((cmd) => {
            const category = cmd.category || 'General';  // Default category as 'General' if undefined
            if (!categorizedCommands[category]) {
                categorizedCommands[category] = [];
            }

            const commandName = typeof cmd.name === 'string' ? cmd.name.toUpperCase() : 'UNKNOWN COMMAND';
            if (commandName && cmd.description) {
                categorizedCommands[category].push(`│  ${commandName} - ${cmd.description}`);
            }
        });

        // Format response text with dynamic user info
        let responseText = `╭═══ SOPHIA-MD ═══⊷\n`;
        responseText += `┃❃╭──────────────\n`;
        responseText += `┃❃│ Prefix : .\n`; // Add your desired prefix here
        responseText += `┃❃│ User : ${userName} \n`; // Display the user's WhatsApp name
        responseText += `┃❃│ Time : ${new Date().toLocaleTimeString()}\n`; // Get current time
        responseText += `┃❃│ Day : ${new Date().toLocaleDateString('en-EN', { weekday: 'long' })}\n`;
        responseText += `┃❃│ Date : ${new Date().toLocaleDateString()}\n`; // Current date
        responseText += `┃❃│ Version : 3.3.2\n`; // Your bot version
        responseText += `┃❃│ Plugins : ${Object.keys(categorizedCommands).length}\n`; // Count of available categories
        responseText += `┃❃│ Platform : vps (Linux)\n`; // Replace with your platform information
        responseText += `┃❃╰───────────────\n`;
        responseText += `╰═════════════════⊷\n\n`;

        // Add the categorized commands
        for (const [category, cmds] of Object.entries(categorizedCommands)) {
            responseText += `╭─❏ ${category.toUpperCase()} ❏\n`;
            cmds.forEach(cmd => {
                responseText += `${cmd}\n`;
            });
            responseText += `╰─────────────────\n`;
        }

        // Path to image in the 'assets' folder
        const imagePath = path.join(__dirname, '../assets/my-image.jpg');
        if (fs.existsSync(imagePath)) {
            const caption = `✨ *LEA Bot Menu* - Welcome ${userName}!`; // Custom caption

            // Send the image along with the formatted menu
            await sock.sendMessage(message.key.remoteJid, {
                image: fs.readFileSync(imagePath), // Load the image
                caption: responseText, // Attach the formatted menu as caption
            });
        } else {
            // If image doesn't exist, send just the formatted text
            await sock.sendMessage(message.key.remoteJid, { text: responseText });
        }

    } catch (error) {
        console.error('Error while listing commands:', error);
        await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to list commands.' });
    }
};

const listCommand = new Command('menu', 'List all available commands', listCommands);
module.exports = { listCommand };
