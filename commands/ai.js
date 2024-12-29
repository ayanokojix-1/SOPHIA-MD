const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys'); // Adjust this to match your library import
const { AssemblyAI } = require('assemblyai');
const Command = require('../lib/Command');

// AssemblyAI setup
const client = new AssemblyAI({
  apiKey: 'ffb8372913cb4f0299ebb7a34d41656e', // Replace with your AssemblyAI API key
});

async function handleTranscriptionCommand(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  if (!quoted?.audioMessage) {
    // If no quoted audio, send an error message and reaction
    await sock.sendMessage(message.key.remoteJid, {
      text: 'Please quote an audio message to change into text'},
	    { quoted: message
    });
    await console.waReact('✖️',message.key)
  await  delay(3000)
	  console.waReact(null,message.key)
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
   delay(5000)
console.waReact(null,message.key)
      return;
    }

    // Reply with the transcribed text
    await sock.sendMessage(message.key.remoteJid, {
      text: transcript.text},
	    { quoted: message}
    );

    // Send success reaction
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '📑', key: message.key },
    });
await delay(5000)
await console.waReact(null,message.key)
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

const transCommand = new Command ( 'trans',
'change voice to text',
handleTranscriptionCommand,
'public',
'ai',
false
);

module.exports = {transCommand};
