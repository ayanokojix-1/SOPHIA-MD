const Command = require('../lib/Command');
const  {downloadMediaMessage} = require ('@whiskeysockets/baileys')
const quotedCommand = new Command (
	"another",
	"hello",
	quotedMediaCommand,
	"private",
	"test",
	false
);

async function quotedMediaCommand(sock, message) {
    let mediaMessage;

    // Check if the message has a quoted message with media
    if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quotedMessage = message.message.extendedTextMessage.contextInfo.quotedMessage;
        mediaMessage = quotedMessage.imageMessage || quotedMessage.videoMessage;

        // If the quoted message has media, send it back
        if (mediaMessage) {
            try {
                const mediaBuffer = await downloadMediaMessage(message, 'buffer', {}, { logger: undefined, reuploadRequest: sock.updateMediaMessage });

                if (!mediaBuffer) {
                    await sock.sendMessage(message.key.remoteJid, { text: 'Failed to download the quoted media. Please try again.' });
                    return;
                }

                // Send the quoted media back to the user
                await sock.sendMessage(message.key.remoteJid, {
                    image: mediaBuffer,
                    caption: 'Here is your quoted media!',
                });

            } catch (error) {
                console.error('Error processing quoted media:', error);
                await sock.sendMessage(message.key.remoteJid, { text: 'An error occurred while processing the quoted media. Please try again.' });
            }
        } else {
            await sock.sendMessage(message.key.remoteJid, { text: 'The quoted message does not contain an image or video.' });
        }
    } else {
        await sock.sendMessage(message.key.remoteJid, { text: 'Please quote a message with media (image or video) to get it sent back.' });
    }
}
module.exports ={ quotedCommand } 
