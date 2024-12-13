const Command = require('../lib/Command');

async function handleJoinCommand(sock, message, args) {
    let groupLink;

    // Extract link from quoted message or command argument
    if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation) {
        groupLink = message.message.extendedTextMessage.contextInfo.quotedMessage.conversation;
    } else if (args.length > 0) {
        groupLink = args[0];
    } else {
        await sock.sendMessage(message.key.remoteJid, {
            text: 'Please provide or quote a valid group link to join.',
        });
        return;
    }

    // Validate the group link format 
    const groupInviteRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,})/;
const match = groupLink.match(groupInviteRegex);

if (!match) {
    await sock.sendMessage(message.key.remoteJid, {
        text: 'Invalid group link! Please provide a valid WhatsApp group link.',
    });
    return;
}

const inviteCode = match[1];

try {
    // Attempt to join the group
    const groupMetadata = await sock.groupAcceptInvite(inviteCode);
    await sock.sendMessage(message.key.remoteJid, {
        text: `*Successfully joined the group*`,
    });
} catch (error) {
    console.error('Error joining group:', error);
    let errorMessage = '_Request sent I guess_';

    if (error.message.includes('request to join')) {
        // Handle request-based group
        await sock.sendMessage(message.key.remoteJid, {
            text: 'The group requires admin approval to join. Request sent successfully!',
        });
    } else if (error.message.includes('invalid')) {
        errorMessage = 'The group link is invalid or expired.';
    } else if (error.message.includes('not-authorized')) {
        errorMessage = 'The bot is not authorized to join this group.';
    }

    await sock.sendMessage(message.key.remoteJid, { text: errorMessage });
}

}

const joinCommand = new Command(
    'join',
    'Joins a WhatsApp group using an invite link',
    handleJoinCommand,
    'owner', // Restrict to owners for security
    'Utility',
    false
);

module.exports = { joinCommand };
