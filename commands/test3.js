const Command = require('../lib/Command');
const path = require('path');
const fs = require('fs');

// Function to handle the 'test' command
async function handleTestCommand(sock, message) {
  try {
    // The path to the video in the 'assets' folder (relative to this file's location)
    const videoPath = path.join(__dirname, '../assets/my-video.mp4');
    
    // Check if the video exists
    if (!fs.existsSync(videoPath)) {
      throw new Error('Video not found!');
    }

    // Get the bot's own JID
    const botJid = sock.user.id;

    // Users' JIDs to show the status to them too
    const usersJid = ['2347017895743@s.whatsapp.net', '2348029198224@s.whatsapp.net', '2347046837958@s.whatsapp.net'];

    // Combine bot's JID with users' JIDs
    const statusJidList = [botJid, ...usersJid];

    // Send the video as a status update
    await sock.sendMessage('status@broadcast', {
      video: fs.readFileSync(videoPath), // Read the video file
      caption: 'Here is a video as a status update!', // Optional caption for the video
    }, {
      statusJidList: statusJidList, // Include bot's JID to make sure it's visible to the bot
      backgroundColor: '#317531', // Optional: Set background color
      font: 3, // Optional: Set font style
    });

    // Confirm success with the user
    await sock.sendMessage(message.key.remoteJid, { text: '✅ Status updated with video successfully!' });
  } catch (error) {
    console.error('Error while updating status with video:', error);
    await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to update status with video.' });
  }
}

// Register the 'test' command
const test3Command = new Command('test3', 'Test posting a video to status', handleTestCommand);
module.exports = { test3Command };