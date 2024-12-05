const Command = require('../lib/Command'); // Import the Command class
const { commands } = require('../lib/commandHandler'); // Import the commands map

const listCommands = async (sock, message) => {
    try {
        // Group commands by category
        const categorizedCommands = {};
        Array.from(commands.values()).forEach((cmd) => {
            // If the category doesn't exist, initialize it
            const category = cmd.category || 'General';  // Default category as 'General' if undefined

            // Initialize an array for the category if it doesn't exist
            if (!categorizedCommands[category]) {
                categorizedCommands[category] = [];
            }

            // Ensure cmd.name is valid and push the formatted name and description
            if (cmd.name && cmd.description) {
                categorizedCommands[category].push(`*${cmd.name.toUpperCase()}*: ${cmd.description}`);
            }
        });

        // Format response text
        let responseText = '*Available Commands:*\n\n';
        for (const [category, cmds] of Object.entries(categorizedCommands)) {
            responseText += `*_____ ${category.toUpperCase()} _____*\n${cmds.join('\n')}\n\n`;
        }

        await sock.sendMessage(message.key.remoteJid, { text: responseText.trim() });
    } catch (error) {
        console.error('Error while listing commands:', error);
        await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to list commands.' });
    }
};

const listCommand = new Command('menu', 'List all available commands', listCommands);
module.exports = { listCommand };
