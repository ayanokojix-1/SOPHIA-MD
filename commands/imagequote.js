const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

async function handleQuotedImage(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted?.imageMessage) {
    try {
      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      // Download media and handle it as a stream
      const stream = await downloadMediaMessage(
        {
          key: { id: key, remoteJid: message.key.remoteJid, participant },
          message: quoted,
        },
        sock
      );

      const filePath = path.join(mediaPath, `image_${Date.now()}.jpg`);
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the stream to a file
      await new Promise((resolve, reject) => {
        stream.pipe(writeStream);
        stream.on('end', resolve);
        stream.on('error', reject);
      });

      // Send the downloaded image back to the user
      await sock.sendMessage(message.key.remoteJid, {
        image: { url: filePath },
        caption: 'Here is your quoted image!',
      });

      // Clean up the temporary file
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error handling quoted image:', error);
      await sock.sendMessage(message.key.remoteJid, { text: 'Failed to process the quoted image.' });
    }
  } else {
    await sock.sendMessage(message.key.remoteJid, { text: 'No image found in the quoted message!' });
  }
}

const quotedImageCommand = new Command('quotedimage', 'Send quoted image back to the user', handleQuotedImage);
module.exports = {quotedImageCommand};
