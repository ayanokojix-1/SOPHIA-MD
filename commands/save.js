const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { SUDO } = require('../config');// Use the SUDO numbers from the config
const { AssemblyAI } = require('assemblyai');


async function handleQuotedMedia(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted) {
    try {
      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      let mediaStream;
      let filePath;
      let mimetype;
      let caption = 'Saved!';
      
      // Add loading reaction
      await sock.sendMessage(message.key.remoteJid, { react: { text: '⌛', key: message.key } });

      // Image
      if (quoted?.imageMessage) {
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `image_${Date.now()}.jpg`);
        mimetype = 'image/jpeg';
        if (quoted?.imageMessage?.caption) {
          caption = quoted.imageMessage.caption;
        }
      }
      // Audio
      else if (quoted?.audioMessage) {
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `audio_${Date.now()}.mp3`);
        mimetype = 'audio/mpeg';
      }
      // Video
      else if (quoted?.videoMessage) {
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `video_${Date.now()}.mp4`);
        mimetype = 'video/mp4';
        if (quoted?.videoMessage?.caption) {
          caption = quoted.videoMessage.caption;
        }
      }
      // Document
      else if (quoted?.documentMessage) {
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `document_${Date.now()}.pdf`);
        mimetype = 'application/pdf'; // Adjust if it's another type of document
      }
      // Voice Note
      else if (quoted?.audioMessage) {
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `voice_${Date.now()}.ogg`);
        mimetype = 'audio/ogg;codecs=opus';
      }
      // Sticker
      else if (quoted?.stickerMessage) {
        mediaStream = await downloadMediaMessage(
          {
            key: { id: key, remoteJid: message.key.remoteJid, participant },
            message: quoted,
          },
          sock
        );
        filePath = path.join(mediaPath, `sticker_${Date.now()}.webp`);
        mimetype = 'image/webp';  // Stickers are usually in webp format
      }
      
      if (mediaStream) {
        const writeStream = fs.createWriteStream(filePath);

        // Pipe the stream to a file
        await new Promise((resolve, reject) => {
          mediaStream.pipe(writeStream);
          mediaStream.on('end', resolve);
          mediaStream.on('error', reject);
        });

        // Send the downloaded media to SUDO numbers only
        for (let sudoNumber of SUDO) {
          await sock.sendMessage(sudoNumber + '@s.whatsapp.net', {
            [mimetype.split('/')[0]]: { url: filePath },
            caption,
            mimetype,
            quoted: message, // Add quoted message for context if needed
          });
        }

        // Add success reaction
        await sock.sendMessage(message.key.remoteJid, { react: { text: '✨', key: message.key } });

        // Clean up the temporary file
        fs.unlinkSync(filePath);
      } else {
        // If no valid media, add error reaction
        await sock.sendMessage(message.key.remoteJid, { react: { text: '☠️', key: message.key } });
        await sock.sendMessage(message.key.remoteJid, { text: 'No valid media found in the quoted message!' });
      }
    } catch (error) {
      console.error('Error handling quoted media:', error);
      await sock.sendMessage(message.key.remoteJid, { text: 'Failed to process the quoted media.' });
    }
  } else {
    // If no quoted media found, add error reaction
    await sock.sendMessage(message.key.remoteJid, { react: { text: '☠️', key: message.key } });
    await sock.sendMessage(message.key.remoteJid, { text: 'No quoted media found!' });
  }
}

async function handleTranscriptionCommand(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  if (!quoted?.audioMessage) {
    // If no quoted audio, send an error message and reaction
    await sock.sendMessage(message.key.remoteJid, {
      text: 'Please quote an audio message to transcribe.',
      quoted: message,
    });
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '❌', key: message.key },
    });
    return;
  }

  try {
    const mediaPath = path.join(__dirname, '../temp');
    if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

    const audioFilePath = path.join(mediaPath, `audio_${Date.now()}.mp3`);

    // Send loading reaction
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '⏳', key: message.key },
    });

    // Download the quoted audio
    const mediaStream = await downloadMediaMessage(
      {
        key: {
          id: message.message.extendedTextMessage.contextInfo.stanzaId,
          remoteJid: message.key.remoteJid,
          participant: message.message.extendedTextMessage.contextInfo.participant,
        },
        message: quoted,
      },
      sock
    );

    // Save the audio file locally
    const writeStream = fs.createWriteStream(audioFilePath);
    await new Promise((resolve, reject) => {
      mediaStream.pipe(writeStream);
      mediaStream.on('finish', resolve);
      mediaStream.on('error', reject);
    });

    // Send the audio file to AssemblyAI for transcription
    const params = {
      audio: fs.createReadStream(audioFilePath), // Provide the file stream
    };

    const transcript = await client.transcripts.transcribe(params);

    if (transcript.status === 'error') {
      console.error(`Transcription failed: ${transcript.error}`);
      await sock.sendMessage(message.key.remoteJid, {
        text: 'Failed to transcribe the audio. Please try again later.',
        quoted: message,
      });
      // Send error reaction
      await sock.sendMessage(message.key.remoteJid, {
        react: { text: '❌', key: message.key },
      });
      return;
    }

    // Reply with the transcribed text
    await sock.sendMessage(message.key.remoteJid, {
      text: transcript.text,
      quoted: message,
    });

    // Send success reaction
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '📑', key: message.key },
    });

    // Clean up the temporary audio file
    fs.unlinkSync(audioFilePath);
  } catch (error) {
    console.error('Error handling transcription:', error);
    await sock.sendMessage(message.key.remoteJid, {
      text: 'An error occurred while processing the transcription.',
      quoted: message,
    });
    // Send error reaction
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '❌', key: message.key },
    });
  }
}

const quotedMediaCommand = new Command('save', 'Send quoted media to SUDO numbers only and add reactions', handleQuotedMedia);
module.exports = {quotedMediaCommand};
