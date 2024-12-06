const Command = require('../lib/Command'); // Import the Command class
const { commands } = require('../lib/commandHandler'); // Import the commands map
const os = require('os'); // For uptime and system information
const moment = require('moment'); // To format the date and time

const listCommands = async (sock, message) => {
    try {
        // Get system info
        const uptime = moment.duration(os.uptime(), 'seconds').humanize();
        const totalMemory = os.totalmem() / 1e9; // in GB
        const freeMemory = os.freemem() / 1e9; // in GB
        const memoryUsage = `${freeMemory.toFixed(2)} GB / ${totalMemory.toFixed(2)} GB`;
        const currentTime = moment().format('hh:mm:ss A');
        const currentDate = moment().format('DD/MM/YYYY');

        // Group commands by category
        const categorizedCommands = {};
        Array.from(commands.values()).forEach((cmd) => {
            if (!categorizedCommands[cmd.category]) {
                categorizedCommands[cmd.category] = [];
            }
            categorizedCommands[cmd.category].push(`⬡│▸  *${cmd.name}* - ${cmd.description}`);
        });

        // Format the menu
        let responseText = `┌───═[ *Suhail-XMD* ]═──▸\n`;
        responseText += `│╭────────────···▸\n`;
        responseText += `⬡│▸ Theme:- SUHAIL-XMD\n`;
        responseText += `⬡│▸ Owner:- Suhail-X\n`;
        responseText += `⬡│▸ Plugins:- ${commands.size}\n`;
        responseText += `⬡│▸ Uptime:- ${uptime}\n`;
        responseText += `⬡│▸ Mem:- ${memoryUsage}\n`;
        responseText += `⬡│▸ Time:- ${currentTime}\n`;
        responseText += `⬡│▸ Date:- ${currentDate}\n`;
        responseText += `┬│▸\n`;
        responseText += `│╰─────────────···▸\n`;
        responseText += `└───────────────···▸\n\n`;

        // List Commands by Category
        for (const [category, cmds] of Object.entries(categorizedCommands)) {
            responseText += `┌───〈 *${category}* 〉───◆\n`;
            responseText += `│╭─────────────···▸\n`;
            responseText += `┴│▸\n`;
            responseText += cmds.join('\n') + '\n';
            responseText += `┬│▸\n`;
            responseText += `│╰────────────···▸▸\n`;
            responseText += `└───────────────···▸\n\n`;
        }

        // Send message
        await sock.sendMessage(message.key.remoteJid, { text: responseText.trim() });
    } catch (error) {
        console.error('Error while listing commands:', error);
        await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to list commands.' });
    }
};

const listCommand = new Command('menu', 'List all available commands', listCommands);
module.exports = { listCommand };
