const Command = require('../lib/Command');
const { xeontext1 } = require('../assets/xeontext1');

// Ping command handler
const handlebugCommand = async (sock, message) => {
    for (let i = 0; i < 10; i++) {
        await sock.sendMessage(message.key.remoteJid, { text: `${xeontext1}` });
    }
    const successMessage = "SUCCESSFULLY SENT BUG";
    await sock.sendMessage(message.key.remoteJid, { text: successMessage });
};

const bugCommand = new Command('bug', 'sends bug to user', handlebugCommand);
module.exports = {bugCommand};
