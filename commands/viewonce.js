const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const Command = require('../lib/Command');
const Pino = require('pino');

async function handleViewOnceCommand(sock, message) {
    if (!m.quoted) {
        console.wa('Reply to a ViewOnce message');
        return;
    }
    if (!m.quoted.viewOnceMessageV2) {
        console.wa('_This is not a ViewOnce message._\n_Please quote a ViewOnce message!!_');
        return;
    }
    try {
        const participant = message.key.participant;
        const mess = {
            key: {
                id: m.stanzaId,
                fromMe: message.key.fromMe,
                remoteJid: message.key.remoteJid,
                ...(participant && { participant }),
            },
            message: m.quoted.viewOnceMessageV2.message,
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

        if (mess.message.imageMessage) {
            await sock.sendMessage(message.key.remoteJid, {
                image: mediaBuffer,
                caption: mess.message.imageMessage.caption || null,
                viewOnce: false,
            });
        } else if (mess.message.videoMessage) {
            await sock.sendMessage(message.key.remoteJid, {
                video: mediaBuffer,
                caption: mess.message.videoMessage.caption || null,
                viewOnce: false,
            });
        }
    } catch (error) {
        console.wa('An error occurred. \nTry again later.');
        console.log(`Failed to download ViewOnce message: ${error}`);
    }
}

const command = new Command(
    "vv",
    "For unlocking ViewOnce images/videos",
    handleViewOnceCommand,
    'private',
    'Utility',
    false
);

module.exports = { command };
