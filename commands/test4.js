const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg'); // Install ffmpeg using npm
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

async function handleTrimCommand(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted) {
    try {
      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      let mediaStream, filePath, mimetype;

      // Download quoted media
      mediaStream = await downloadMediaMessage(
        {
          key: { id: key, remoteJid: message.key.remoteJid, participant },
          message: quoted,
        },
        sock
      );

      if (quoted?.videoMessage) {
        filePath = path.join(mediaPath, `video_${Date.now()}.mp4`);
        mimetype = 'video/mp4';
      } else if (quoted?.audioMessage) {
        filePath = path.join(mediaPath, `audio_${Date.now()}.mp3`);
        mimetype = 'audio/mp3';
      } else {
        await sock.sendMessage(message.key.remoteJid, { text: '*Please reply to a video or audio to trim.*' });
        return;
      }

      const writeStream = fs.createWriteStream(filePath);
      await new Promise((resolve, reject) => {
        mediaStream.pipe(writeStream);
        mediaStream.on('end', resolve);
        mediaStream.on('error', reject);
      });

      // Use fluent-ffmpeg to fetch media metadata (duration)
      const trimmedFilePath = path.join(mediaPath, `trimmed_${Date.now()}.mp4`);

      await new Promise((resolve, reject) => {
        ffmpeg(filePath)
          .ffprobe((err, metadata) => {
            if (err) return reject(err);
            const duration = metadata.format.duration; // Get the duration of the media

            // If it's a video, trim to 30 seconds if it's longer than 1 minute
            if (duration > 60) {
              ffmpeg(filePath)
                .setStartTime(0)
                .setDuration(30)
                .output(trimmedFilePath)
                .on('end', () => {
                  fs.unlinkSync(filePath); // Remove the original media file
                  filePath = trimmedFilePath; // Update filePath to the trimmed version
                  resolve();
                })
                .on('error', reject)
                .run();
            } else {
              resolve(); // No trimming needed if the media duration is <= 60 seconds
            }
          });
      });

      // Send confirmation message
      await sock.sendMessage(message.key.remoteJid, { text: '⌛ Processing complete...' });

      // Send trimmed video or audio back to the user who quoted it
      if (mimetype === 'video/mp4') {
        await sock.sendMessage(message.key.remoteJid, {
          video: { url: filePath },
          caption: '✨ Your video has been trimmed to 30 seconds!',
        });
      } else if (mimetype === 'audio/mp3') {
        await sock.sendMessage(message.key.remoteJid, {
          audio: { url: filePath },
          caption: '✨ Your audio has been trimmed to 30 seconds!',
        });
      }

      // Clean up: Delete temporary files
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error handling Trim command:', error);
      await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to process the quoted media.' });
    }
  } else {
    await sock.sendMessage(message.key.remoteJid, { text: '*Please reply to a video or audio to test trimming.*' });
  }
}

const trimCommand = new Command('trim', 'Trim video/audio if longer than 1 minute and send it back to the user', handleTrimCommand, 'private');
module.exports = { trimCommand };