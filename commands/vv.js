const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

async function handleViewOnceMedia(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted) {
    try {
      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      // Handle different types of view-once media
      let mediaStream;
      let filePath;
      let mimetype;
      
      // View Once Media (Image, Video, Document, etc.)
      if (quoted?.imageMessage?.viewOnce === false) {
        // Handle view once images
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `viewOnceImage_${Date.now()}.jpg`);
        mimetype = 'image/jpeg';
      }
      else if (quoted?.videoMessage?.viewOnce === false) {
        // Handle view once videos
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `viewOnceVideo_${Date.now()}.mp4`);
        mimetype = 'video/mp4';
      }

      // Save and forward the view once media
      if (mediaStream) {
        const writeStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
          mediaStream.pipe(writeStream);
          mediaStream.on('end', resolve);
          mediaStream.on('error', reject);
        });

        // Send the downloaded media back to the user
        await sock.sendMessage(message.key.remoteJid, {
          [mimetype.split('/')[0]]: { url: filePath },
          caption: 'Here is your view-once media!',
          mimetype,
        });

        // Clean up the temporary file
        fs.unlinkSync(filePath);
      } else {
        await sock.sendMessage(message.key.remoteJid, { text: 'No view-once media found in the quoted message!' });
      }
    } catch (error) {
      console.error('Error handling view-once media:', error);
      await sock.sendMessage(message.key.remoteJid, { text: 'Failed to process the view-once media.' });
    }
  } else {
    await sock.sendMessage(message.key.remoteJid, { text: 'No quoted view-once media found!' });
  }
}

const viewOnceCommand = new Command('viewonce', 'Handle view-once media separately', handleViewOnceMedia);
module.exports = {viewOnceCommand};
