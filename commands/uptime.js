const config = require('../config');

// Variable to store the bot's start time
let startTime = Date.now();

// The main function to handle the uptime command
async function handleUptimeCommand(sock, message) {
    const uptime = Date.now() - startTime; // Calculate uptime in milliseconds
    
    // Convert uptime to seconds, minutes, hours, and days
    const totalSeconds = Math.floor(uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format the uptime message with bold and italics
    const uptimeText = `*_The bot has been active for_*: _${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds._`;

    await sock.sendMessage(message.key.remoteJid, { text: uptimeText });
}

// Register the uptime command with name, description, and handler function
const uptimeCommand = {
    fullCommand: `${config.HANDLER}uptime`,
    name: 'uptime',
    description: 'Shows how long the bot has been active.',
    execute: handleUptimeCommand // Call the handle uptime function
};

module.exports = {uptimeCommand};
