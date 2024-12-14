const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const ffmpeg = require('fluent-ffmpeg')

async function handleQuotedMedia(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted?.audioMessage) {
    try {
      const ptt = quoted.audioMessage.ptt || false; // Access the `ptt` property
      console.log('PTT status:', ptt); // Logs whether it's a voice note (true) or a regular audio (false)


      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      // Download the quoted audio
      const mediaStream = await downloadMediaMessage(
        {
          key: { id: key, remoteJid: message.key.remoteJid, participant },
          message: quoted,
        },
        sock
      );

      if (mediaStream) {
        const originalFilePath = path.join(mediaPath, `audio_${Date.now()}.ogg`);
        const opusFilePath = path.join(mediaPath, `audio_${Date.now()}.opus`);

        // Save the original audio file
        const writeStream = fs.createWriteStream(originalFilePath);
        await new Promise((resolve, reject) => {
          mediaStream.pipe(writeStream);
          mediaStream.on('end', resolve);
          mediaStream.on('error', reject);
        });

        // Convert the audio file to OGG Opus format
        await new Promise((resolve, reject) => {
          ffmpeg(originalFilePath)
            .audioCodec('libopus')
            .toFormat('ogg')
            .on('end', resolve)
            .on('error', reject)
            .save(opusFilePath);
        });
	      await sock.sendMessage(message.key.remoteJid, {
          audio: { url: opusFilePath },
          mimetype: 'audio/ogg; codecs=opus',
          ptt, // Pass the PTT status back in the response
          quoted: message,
        });

        // Add success reaction
        await sock.sendMessage(message.key.remoteJid, { react: { text: '✨', key: message.key } });

        // Clean up temporary files
        fs.unlinkSync(originalFilePath);
        fs.unlinkSync(opusFilePath);
      } else {
        // If no valid audio media, add error reaction
        await sock.sendMessage(message.key.remoteJid, { react: { text: '☠️', key: message.key } });
        await sock.sendMessage(message.key.remoteJid, { text: 'No valid audio found in the quoted message!' });
      }
    } catch (error) {
      console.error('Error handling quoted media:', error);
      await sock.sendMessage(message.key.remoteJid, { text: 'Failed to process the quoted audio.' });
    }
  } else {
    // If no quoted audio found, add error reaction
    await sock.sendMessage(message.key.remoteJid, { react: { text: '☠️', key: message.key } });
    await sock.sendMessage(message.key.remoteJid, { text: 'No quoted audio found!' });
  }
}
const quotedMediaCommand = new Command(
  'saveaudio',
  'Download quoted audio and convert it to MP3 format',
  handleQuotedMedia
);
module.exports = { quotedMediaCommand };
