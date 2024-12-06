const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg'); // Install ffmpeg using npm
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

async function handleStatusCommand(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted) {
    try {
      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      let mediaStream, filePath, mimetype, caption;
      
      // Download quoted media
      mediaStream = await downloadMediaMessage(
        {
          key: { id: key, remoteJid: message.key.remoteJid, participant },
          message: quoted,
        },
        sock
      );

      if (quoted?.imageMessage) {
        filePath = path.join(mediaPath, `image_${Date.now()}.jpg`);
        mimetype = 'image/jpeg';
        caption = quoted.imageMessage.caption || '*Saved!*';
      } else if (quoted?.videoMessage) {
        filePath = path.join(mediaPath, `video_${Date.now()}.mp4`);
        mimetype = 'video/mp4';
        caption = quoted.videoMessage.caption || '*Saved!*';
      } else {
        await sock.sendMessage(message.key.remoteJid, { text: '*No valid media to post!*' });
        return;
      }

      const writeStream = fs.createWriteStream(filePath);
      await new Promise((resolve, reject) => {
        mediaStream.pipe(writeStream);
        mediaStream.on('end', resolve);
        mediaStream.on('error', reject);
      });

      // If the media is a video, check its duration and trim if necessary
      if (mimetype === 'video/mp4') {
        const trimmedFilePath = path.join(mediaPath, `trimmed_${Date.now()}.mp4`);

        // Get video duration
        await new Promise((resolve, reject) => {
          ffmpeg(filePath)
            .ffprobe((err, metadata) => {
              if (err) return reject(err);
              const duration = metadata.format.duration;

              // Trim if duration exceeds 60 seconds
              if (duration > 60) {
                ffmpeg(filePath)
                  .setStartTime(0)
                  .setDuration(60)
                  .output(trimmedFilePath)
                  .on('end', () => {
                    fs.unlinkSync(filePath); // Remove original file
                    filePath = trimmedFilePath; // Update filePath to trimmed file
                    resolve();
                  })
                  .on('error', reject)
                  .run();
              } else {
                resolve();
              }
            });
        });
      }

      // Send to status
      await sock.sendMessage(message.key.remoteJid, { text: '⌛ Uploading...' });
      await sock.sendMessage(message.key.remoteJid, { text: '✨ Done!' });
      await sock.sendMessage(message.key.remoteJid, { react: { text: '✨', key: message.key } });

      await sock.sendMessage('status@broadcast', {
        [mimetype.split('/')[0]]: { url: filePath },
        caption,
      }, {
        broadcast: true,
      });

      // Clean up
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error handling status command:', error);
      await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to process the quoted media.' });
    }
  } else {
    await sock.sendMessage(message.key.remoteJid, { text: '*Please quote an image or video to post on status.*' });
  }
}

const postCommand = new Command('post', 'Post a quoted image or video to status', handleStatusCommand, 'private')
module.exports ={ postCommand }
