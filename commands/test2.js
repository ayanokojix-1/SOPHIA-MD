const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const Command = require('../lib/Command');
const Pino = require('pino');

async function handleStickerToPhotoCommand(sock, message) {
    if (!m.quoted) {
        console.wa('Reply to a sticker with this command.');
        return;
    }
    if (!m.quoted?.stickerMessage) {
        console.wa('_This is not a sticker message._\n_Please quote a sticker!!_');
        return;
    }
if(m.quoted.stickerMessage.isAnimated!==false){
	console.wa('Reply to a none animated sticker');
	return;
}
    try {
        const participant = message.key.participant;
        const mess = {
            key: {
                id: message.key.id,
                fromMe: message.key.fromMe,
                remoteJid: message.key.remoteJid,
                ...(participant && { participant }),
            },
            message: m.quoted,
        };

        const logger = Pino({ level: 'silent' });
        const mediaBuffer = await downloadMediaMessage(
            mess,
            'buffer',
            {},
            {
                logger,
                reuploadRequest: sock.updateMediaMessage,
            }
        );

        // Save the sticker temporarily
        const tempInputPath = path.join(__dirname, 'temp.webp');
        const tempOutputPath = path.join(__dirname, 'temp.jpg');
        fs.writeFileSync(tempInputPath, mediaBuffer);

        // Convert the sticker (WebP) to a JPG using FFmpeg
        await new Promise((resolve, reject) => {
            exec(
                `ffmpeg -i ${tempInputPath} ${tempOutputPath}`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(`FFmpeg error: ${error.message}`);
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });

        // Read the converted JPG image
        const outputBuffer = fs.readFileSync(tempOutputPath);

        // Send the converted photo
        await sock.sendMessage(message.key.remoteJid, {
            image: outputBuffer,
            caption: 'Here is the sticker as a photo!',
        });

        // Clean up temporary files
        fs.unlinkSync(tempInputPath);
        fs.unlinkSync(tempOutputPath);
    } catch (error) {
        console.wa('An error occurred while processing the sticker.\nPlease try again later.');
        console.log(`Error converting sticker to photo: ${error}`);
    }
}

const command = new Command(
    "photo",
    "Convert a sticker into a photo",
    handleStickerToPhotoCommand,
    'private',
    'Media',
    false
);

module.exports = { command };

