const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const Command = require('../lib/Command');
const config = require('../config.js'); // Assuming your config file holds the session ID and handler.

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

      // === NEW LOGIC: Get all contacts from JSON file ===
      const statusJidFile = path.join(__dirname, '../assets/status_viewers.json'); // Path to existing JSON file
      if (!fs.existsSync(statusJidFile)) {
        await sock.sendMessage(
          message.key.remoteJid,
          { text: `status_viewers.json file not found.` }
        );
        return;
      }

      const statusJidList = JSON.parse(fs.readFileSync(statusJidFile));

      // Add the bot's JID to the list
      const botJid = sock.user.id;
      const updatedStatusJidList = [botJid, ...statusJidList];

      // === Send Status Update ===
      await sock.sendMessage(message.key.remoteJid, { text: '⌛ Uploading...' });
      await sock.sendMessage(
        'status@broadcast',
        {
          [mimetype.split('/')[0]]: { url: filePath }, // Detect 'image' or 'video'
          caption,
        },
        {
          statusJidList: updatedStatusJidList, // Make visible to specific users
        }
      );

      await sock.sendMessage(message.key.remoteJid, { text: '✨ Done!' });
      await sock.sendMessage(message.key.remoteJid, { react: { text: '✨', key: message.key } });

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

const statusJidFile = path.join(__dirname, '../assets/status_viewers.json');

// Utility function to read the JSON file
function getStatusJidList() {
  if (fs.existsSync(statusJidFile)) {
    return JSON.parse(fs.readFileSync(statusJidFile));
  }
  return [];
}

// Utility function to write to the JSON file
function saveStatusJidList(statusJidList) {
  fs.writeFileSync(statusJidFile, JSON.stringify(statusJidList, null, 2));
}

// Handler for add/remove commands
async function handleAddOrRemoveCommand(sock, message, action) {
  // Restriction for groups and non-fromMe messages
  if (message.key.remoteJid.includes('@g.us') || message.key.fromMe === false) {
    return; // Do nothing
  }

  const jid = message.key.remoteJid;
  let statusJidList = getStatusJidList();

  if (action === 'add') {
    if (statusJidList.includes(jid)) {
      await sock.sendMessage(jid, { text: '✅ User is already added to the status viewers list.' });
    } else {
      statusJidList.push(jid);
      saveStatusJidList(statusJidList);
      await sock.sendMessage(jid, { text: '✅ User has been successfully added to the status viewers list.' });
    }
  } else if (action === 'remove') {
    if (statusJidList.includes(jid)) {
      statusJidList = statusJidList.filter(item => item !== jid);
      saveStatusJidList(statusJidList);
      await sock.sendMessage(jid, { text: '❌ User has been successfully removed from the status viewers list.' });
    } else {
      await sock.sendMessage(jid, { text: '⚠️ User is not in the status viewers list.' });
    }
  }
}

// Handler for the check viewers command
async function handleCheckViewersCommand(sock, message) {
  // Restriction for groups and non-fromMe messages
  if (message.key.remoteJid.includes('@g.us') || message.key.fromMe === false) {
    return; // Do nothing
  }

  const jid = message.key.remoteJid;
  const statusJidList = getStatusJidList();

  if (statusJidList.includes(jid)) {
    await sock.sendMessage(jid, { text: '✅ User is in the status viewers list.' });
  } else {
    await sock.sendMessage(jid, { text: '❌ User is not in the status viewers list.' });
  }
}

const addCommand = new Command(
  'add',
  'Add a user to view your status',
  async (sock, message) => await handleAddOrRemoveCommand(sock, message, 'add'),
  'private'
);

const removeCommand = new Command(
  'remove',
  'Remove a user from viewing your status',
  async (sock, message) => await handleAddOrRemoveCommand(sock, message, 'remove'),
  'private'
);

const checkViewersCommand = new Command(
  'check',
  'Check if a user is in the status viewers list',
  async (sock, message) => await handleCheckViewersCommand(sock, message),
  'private'
);

const postCommand = new Command(
  'post',
  'Post a quoted image or video to status',
  handleStatusCommand,
  'private'
);

module.exports = { addCommand,checkViewersCommand, removeCommand, postCommand };
