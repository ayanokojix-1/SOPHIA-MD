const Command = require('../lib/Command');
const waifuCommand = new Command(
  'waifu',
  'Sends a random waifu image from waifu.pics',
  waifuCommandFunction,
  'private',
  'Fun',
  false                                        
);

// Function to fetch and send the waifu image
async function waifuCommandFunction(sock, message) {
  const axios = require('axios'); // Make sure you have axios installed to make API calls
  
  try {
    // Fetch the waifu image URL
    const response = await axios.get('https://api.waifu.pics/sfw/waifu');
    const imageUrl = response.data.url;

    // Send the image to the user
    await sock.sendMessage(message.key.remoteJid, { 
      image: { url: imageUrl },
      caption: "Here's a random waifu for you!" 
    });
  } catch (error) {
    console.error('Error fetching waifu image:', error);
    await sock.sendMessage(message.key.remoteJid, { text: "Sorry, I couldn't fetch a waifu image at the moment." });
  }
}


module.exports = {waifuCommand}
