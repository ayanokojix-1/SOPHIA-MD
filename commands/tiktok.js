const axios = require('axios'); // To make HTTP requests
const Command = require('../lib/Command');

async function handleTikTokCommand(sock, message) {
  try {
    // Extract the message text or quoted message
    const text =
      message.message?.conversation || // For normal text messages
      message.message?.extendedTextMessage?.text || // For extended text messages
      ''; // Fallback if no text is found

    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const quoting =
      quoted?.extendedTextMessage?.matchedText || // Text from quoted extendedTextMessage
      quoted?.conversation || // Text from quoted conversation
      null; // Fallback if no quoted text is found

    // Parse command arguments
    const commandArgs = text.split(' ');
    const url = commandArgs[1] || quoting; // Use URL from command or quoted message

    // Validate TikTok URL using regex
    const tiktokRegex = /^(https?:\/\/)?(vm\.tiktok\.com|www\.tiktok\.com)\/.+$/;
    if (!url || !tiktokRegex.test(url)) {
      await console.wa('Please provide a valid TikTok URL in the format: #tiktok <URL>');
      return;
    }

    // Send loading reaction
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '⏳', key: message.key },
    });

    // Fetch the video URL from the API
    const response = await axios.get(`https://nikka-api.us.kg/dl/tiktok?apiKey=nikka&url=${encodeURIComponent(url)}`);
    const videoUrl = response.data?.data;

    if (!videoUrl) {
      await console.wa('Failed to retrieve the TikTok video. Please check the URL or try again later.');
      return;
    }

    // Send the video using console.waMedia.sendVideo
    await console.waMedia.sendVideo(videoUrl, '> ENJOY SOPHIA');

    // Send success reaction
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '📹', key: message.key },
    });
await delay(5000);
await console.waReact(null,message.key);
  } catch (error) {
    console.error('Error downloading TikTok video:', error);

    // Send error message
    await console.wa('An error occurred while trying to download the TikTok video. Please try again later.');

    // Send error reaction
    await sock.sendMessage(message.key.remoteJid, {
      react: { text: '❌', key: message.key },
    });
  }
}

const tiktokCommand = new Command(
  'tiktok',
  'Download TikTok videos',
  handleTikTokCommand,
  'public',
  'media',
  false
);

module.exports = { tiktokCommand };
