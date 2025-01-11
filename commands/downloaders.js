const axios = require('axios'); // To make HTTP requests
const Command = require('../lib/Command');
const { isValidTikTokURL} = require('../lib/functions')
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
   
    if (!url || !isValidTikTokURL(url)) {
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
    await console.waMedia.sendVideo({url:videoUrl}, '> DOWNLOADED WITH SOPHIA-MD');

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

function isFbUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.+$/;
    return regex.test(url);
}


async function fbUrlDownloadHd(sock, message, args) {
    // Extract the URL from args or the quoted message
    const input = args[0] || 
                  m.quoted?.conversation || 
                  m.quoted?.extendedTextMessage?.matchedText;
    if (!input) {
        await console.wa('Please provide a Facebook URL or reply to a message with a valid Facebook link.');
        return;
    }

    // Check if the input is a valid Facebook URL
    if (!isFbUrl(input)) {
        await console.wa('This is not a valid Facebook link. Please send a valid Facebook URL.\nFor example: .fb www.facebook.com');
        return;
    }

    try {
        // Fetch the Facebook video from the API
        const response = await axios.get('https://api.giftedtech.web.id/api/download/facebook', {
            params: {
                apikey: "gifted",
                url: input,
            }
        });

        // Extract HD video URL
        const fbVideo = response.data?.result?.hd_video;
        
        if (!fbVideo) {
            await console.wa('No HD video found for this link.');
            return;
        }

        // Send the video
        await console.waMedia.sendVideo(
            { url: fbVideo }, 
            '> VIDEO DOWNLOADED WITH SOPHIA-MD'
        );
    } catch (err) {
        console.error('Error during Facebook video download:', err);
        await console.wa('An error occurred while processing your request.');
    }
}
const fbUrlCommand = new Command(
  'fb',
  'downloads fb video in hd with url',
  fbUrlDownloadHd,
  "public",
  "Downloaders",
  false
  );

const tiktokCommand = new Command(
  'tiktok',
  'Download TikTok videos',
  handleTikTokCommand,
  'public',
  'Downloaders',
  false
);

module.exports = { tiktokCommand,fbUrlCommand };
