const Command = require('../lib/Command');
const { bugplus } = require('../assets/bugtest');

// Ping command handler
const handlebugCommand = async (sock, message) => {
    for (let i = 0; i < 10; i++) {
        await sock.sendMessage(message.key.remoteJid, { text: `${bugplus}` });
    }
    const successMessage = "SUCCESSFULLY SENT BUG";
    await sock.sendMessage(message.key.remoteJid, { text: successMessage });
};

const bugCommand = new Command('bug', 'sends bug to user', handlebugCommand);
module.exports = {bugCommand};
