const config = require('../config');
const { isQuotedMessage } = require('./quotedMessageHandler');

const commands = new Map();

const registerCommand = (command) => {
    commands.set(command.fullCommand, command);
};

const executeCommand = async (commandName, sock, message) => {
    const command = commands.get(commandName);
    const sender = message.key.participant || message.key.remoteJid;
    const isFromMe = message.key.fromMe;

    // Determine access levels
    const isAdmin = config.SUDO.includes(sender.replace('@s.whatsapp.net', ''));
    const isOwner = sender.replace('@s.whatsapp.net', '') === config.OWNER;

    // Check if the command is group-only
    const isGroup = message.key.remoteJid.endsWith('@g.us');
    if (command?.isGroupOnly && !isGroup) {
        return await sock.sendMessage(message.key.remoteJid, {
            text: '_⚠️ This command can only be used in group chats._',
        });
    }

    // Initialize command text and quoted message info
    let commandText;
    let quotedMessageInfo = null;

    if (isQuotedMessage(message)) {
        commandText = message.message.extendedTextMessage.text;
        quotedMessageInfo = message.message.extendedTextMessage.contextInfo.quotedMessage.conversation;
    } else if (message.message?.conversation) {
        commandText = message.message.conversation;
    }

    if (command && commandText) {
        const args = commandText.split(/\s+/).slice(1);

        if (isFromMe || isOwner || isAdmin) {
            await command.execute(sock, message, args, quotedMessageInfo);
        } else if (config.MODE === 'public' && command.accessLevel === 'public') {
            await command.execute(sock, message, args, quotedMessageInfo);
        } else if (config.MODE === 'private' && command.accessLevel !== 'public') {
            await command.execute(sock, message, args, quotedMessageInfo);
        }
    }
};

module.exports = { registerCommand, executeCommand, commands };