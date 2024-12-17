const Command = require('../lib/Command');
const { commandFileMap } = require('../lib/CommandRegistry'); // Import the map from registerCommands

const command = new Command(
    'where',
    'Find out the file location of a specific command.',
    async (sock, message, args) => {
        const commandName = args[0]?.toLowerCase();

        if (!commandName) {
            await sock.sendMessage(message.key.remoteJid, {
                text: `⚠️ Please specify a command name. Example: *#where ping*`,
            });
            return;
        }

        // Check if the command exists in the map
        const fileName = commandFileMap.get(commandName);

        if (fileName) {
            await sock.sendMessage(message.key.remoteJid, {
                text: `📂 The command *${commandName}* is located in the file: *${fileName}*`,
            });
        } else {
            await sock.sendMessage(message.key.remoteJid, {
                text: `❌ Command *${commandName}* not found. Make sure it exists and is registered.`,
            });
        }
    },
    'private', // Access level
    'Utility', // Category
    false // Group-only restriction
);

module.exports = { command };
