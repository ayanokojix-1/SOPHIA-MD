const Command = require('../lib/Command'); 
const { updateBot,runShellCommand } = require('../lib/gitUpdate');
const { commands } = require('../lib/commandHandler');
const os = require('os');
const moment = require('moment'); 
const config = require('../config');

// Utility function to check memory usage
function formatMemoryUsage() {
    const totalMemory = os.totalmem() / 1e9; // in GB
    const freeMemory = os.freemem() / 1e9; // in GB
    return `${freeMemory.toFixed(2)} GB / ${totalMemory.toFixed(2)} GB`;
}

// Format uptime in a readable format
function formatUptime() {
    const uptime = moment.duration(os.uptime(), 'seconds').humanize();
    return uptime;
}

// Database check (to determine if PostgreSQL, MongoDB, or local is used)
function getDatabaseInfo() {
    // Assuming that your config has a method or value that tells you the DB being used
    const db = config.DATABASE_URL ? "PostgreSQL" : "MongoDB (or Local)";
    return db;
}

const listCommands = async (sock, message) => {
    try {
        // Get system info
        const uptime = formatUptime();
        const owner = config.OWNER || 'AYANOKOJI';
        const memoryUsage = formatMemoryUsage();
        const currentTime = moment().format('hh:mm:ss A');
        const currentDate = moment().format('DD/MM/YYYY');
        const db = getDatabaseInfo();  // Get DB used

        // Group commands by category with a default category of 'General'
        const categorizedCommands = {};
        Array.from(commands.values()).forEach((cmd) => {
            const category = cmd.category || 'General';  // Default category as 'General' if undefined
            if (!categorizedCommands[category]) {
                categorizedCommands[category] = [];
            }
            const commandName = cmd.name ? cmd.name.toUpperCase() : 'UNKNOWN COMMAND';  // Ensure name exists
            categorizedCommands[category].push(`│  *${commandName}*`);
        });

        // Format the menu
        let responseText = 
	`≿━━━━༺❀𝑺𝑶𝑷𝑯𝑰𝑨-𝑴𝑫༻━━━━≾
╔═══.·:·.☽✧ ✦ ✧☾.·:·.═══╗
☆   MADE BY AYANOKOJI☆
╚═══.·:·.☽✧ ✦ ✧☾.·:·.═══╝

╔══════════════════════╗
║   
\`\`\`
➛OWNER: ${owner}
➛VERSION: 1.0.0
➛Commands: ${commands.size}
➛Uptime: ${uptime}
➛RAM: ${memoryUsage}
➛DB: ${db}
➛Time: ${currentTime}
➛Date: ${currentDate}
\`\`\`
╚══════════════════════╝

`;

        // List Commands by Category
        for (const [category, cmds] of Object.entries(categorizedCommands)) {
            responseText += `\n╔═══.·:·.☽✧ ✦ ${category.toUpperCase()} ✧☾.·:·.\n`;
            responseText += `|☞|${cmds.join('\n|☞|')}\n`;
            responseText += `╚═══.·:·.☽✧ ✦ ✧☾.·:·.\n`;
        }

        // Send the message with formatted text
        await sock.sendMessage(message.key.remoteJid, { text: responseText.trim() });
    } catch (error) {
        console.error('Error while listing commands:', error);
        await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to list commands.' });
    }
};

const updateCheckCommand = new Command(
    'update', // Command name
    'Checks for bot updates', // Description
    async (sock, message) => {
        const repoUrl = 'https://github.com/ayanokojix-1/SOPHIA-MD.git';
        try {
            // Check for updates
            const localCommit = await runShellCommand('git rev-parse HEAD');
            const remoteCommit = await runShellCommand(`git ls-remote ${repoUrl} HEAD | awk '{print $1}'`);

            if (localCommit === remoteCommit) {
                await sock.sendMessage(message.key.remoteJid, { text: '_Sophia is already up-to-date!_' });
            } else {
                await sock.sendMessage(message.key.remoteJid, {
                    text: `🆕 An update is available!\n\n*Current version:* ${localCommit}\n*Latest version:* ${remoteCommit}\n\nType "update now" to update Sophia.`,
                });
            }
        } catch (err) {
            console.error('Error checking for updates:', err);
            await sock.sendMessage(message.key.remoteJid, { text: '_Failed to check for updates!_' });
        }
    },
    'owner', // Access level
    'Utility', // Category
    false // Group-only restriction
);

const updateNowCommand = new Command(
    'update now', // Command name
    'Updates and restarts the bot', // Description
    async (sock, message) => {
        const repoUrl = 'https://github.com/ayanokojix-1/SOPHIA-MD.git';
        try {
            await sock.sendMessage(message.key.remoteJid, { text: '_Updating Sophia..._' });

            // Fetch updates from the remote repo
            const updateLog = await updateBot(repoUrl);
            console.log(updateLog);

            // Notify user and restart
            await sock.sendMessage(message.key.remoteJid, { text: '_Sophia has been updated and is restarting!_' });
            process.exit(0); // Graceful restart
        } catch (err) {
            console.error('Error updating the bot:', err);
            await sock.sendMessage(message.key.remoteJid, { text: '_Failed to update Sophia!_' });
        }
    },
    'owner', // Access level
    'Utility', // Category
    false // Group-only restriction
);

// Register the menu command
const listCommand = new Command('menu', 'List all available commands', listCommands);
module.exports = { listCommand,updateCheckCommand,updateNowCommand };
