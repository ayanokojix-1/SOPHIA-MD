const Command = require('../lib/Command'); // Import the Command class
const { commands } = require('../lib/commandHandler'); // Import the commands map

const listCommands = async (sock, message) => {
    try {
        // Group commands by category
        const categorizedCommands = {};
        Array.from(commands.values()).forEach((cmd) => {
            if (!categorizedCommands[cmd.category]) {
                categorizedCommands[cmd.category] = [];
            }
            categorizedCommands[cmd.category].push(`*${cmd.name}*: ${cmd.description}`);
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