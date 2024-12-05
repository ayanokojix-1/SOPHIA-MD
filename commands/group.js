const Command = require('../lib/Command');

const tagAll = async (sock, message) => {
    if (!message.key.remoteJid.endsWith('@g.us')) {
        await sock.sendMessage(message.key.remoteJid, {
            text: '⚠️ This command can only be used in group chats.',
        });
        return;
    }

    // Fetch group metadata
    const groupMetadata = await sock.groupMetadata(message.key.remoteJid);
    const { participants } = groupMetadata;

    // Build the tag message
    let teks = "Tagging all group members:\n";
    for (let mem of participants) {
        teks += ` @${mem.id.split("@")[0]}\n`;
    }

    // Send the tag message
    await sock.sendMessage(message.key.remoteJid, {
        text: teks.trim(),
        mentions: participants.map((a) => a.id),
    });
};

// Register the command
const tagAllCommand = new Command(
    'tagall',
    'Tag all members in the group',
    tagAll,
    'public',
    'Group',
    true
);

module.exports = { tagAllCommand };
