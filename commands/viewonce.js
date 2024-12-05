 // Import downloadMediaMessage from Whiskysockets
const Command = require('../lib/Command'); 

// Unlock View Once Command
const unlockViewOnce = async (sock, message) => {
    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quotedMessage || !quotedMessage.viewOnceMessage) {
        await sock.sendMessage(message.key.remoteJid, { text: "Please quote a view-once message to unlock it." });
        return;
    }

    try {
        // Download the media from the quoted message
        const media = await downloadMediaMessage(quotedMessage.viewOnceMessage, 'buffer', {});

        // Send the media back to the chat, making it viewable multiple times
        if (quotedMessage.viewOnceMessage.message?.imageMessage) {
            await sock.sendMessage(message.key.remoteJid, { image: media, caption: "Here's the unlocked image!" });
        } else if (quotedMessage.viewOnceMessage.message?.videoMessage) {
            await sock.sendMessage(message.key.remoteJid, { video: media, caption: "Here's the unlocked video!" });
        } else {
            await sock.sendMessage(message.key.remoteJid, { text: "This type of view-once message is not supported." });
        }
    } catch (error) {
        console.error("Failed to unlock view-once message:", error);
        await sock.sendMessage(message.key.remoteJid, { text: "Failed to unlock view-once message." });
    }
};

// Export the command so it can be registered
const viewonceCommand = new Command('vv', 'Unlocking view once', unlockViewOnce, 'private');

module.exports = viewonceCommand;
