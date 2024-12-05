const Command = require('../lib/Command');
const path = require('path');
const fs = require('fs');

// Function to handle the 'test' command
async function handleTestCommand(sock, message) {
  try {
    // The path to the image in the 'assets' folder (relative to this file's location)
    const imagePath = path.join(__dirname, '../assets/my-image.jpg');
    
    // Check if the image exists
    if (!fs.existsSync(imagePath)) {
      throw new Error('Image not found!');
    }

    // Get the bot's own JID
    const botJid = sock.user.id;

    // Users' JIDs to show the status to them too
    const usersJid = ['2347017895743@s.whatsapp.net', '2348029198224@s.whatsapp.net', '2347046837958@s.whatsapp.net'];

    // Combine bot's JID with users' JIDs
    const statusJidList = [botJid, ...usersJid];

    // Send the image as a status update
    await sock.sendMessage('status@broadcast', {
      image: fs.readFileSync(imagePath), // Read the image file
      caption: 'Here is an image as a status update!', // Optional caption for the image
    }, {
      statusJidList: statusJidList, // Include bot's JID to make sure it's visible to the bot
      backgroundColor: '#317531', // Optional: Set background color
      font: 3, // Optional: Set font style
    });

    // Confirm success with the user
    await sock.sendMessage(message.key.remoteJid, { text: '✅ Status updated with image successfully!' });
  } catch (error) {
    console.error('Error while updating status with image:', error);
    await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to update status with image.' });
  }
}

// Register the 'test' command
const test2Command = new Command('test2', 'Test posting an image to status', handleTestCommand);
module.exports = {test2Command};