const Command = require('../lib/Command');

async function handleTestCommand(sock, message) {
  try {
    const text = 'Hello World'; // The text to post as a status

    // Get the bot's own JID
    const botJid = sock.user.id; // Or use the appropriate method to fetch the bot's JID

    // You can optionally include users' JIDs to show the status to them too
    const usersJid = ['2347017895743@s.whatsapp.net', '2348029198224@s.whatsapp.net', '2347046837958@s.whatsapp.net']; // Example JIDs
    // Example JIDs
    // Combine bot's JID with users' JIDs
    const statusJidList = [botJid, ...usersJid];

    // Send the status update
    await sock.sendMessage('status@broadcast', {
      text: text, // Text for the status
    }, {
      statusJidList: statusJidList, // Include bot's JID to make sure it's visible to the bot
      backgroundColor: '#317531', // Optional: Set background color
      font: 3, // Optional: Set font style
    });

    // Confirm success with the user
    await sock.sendMessage(message.key.remoteJid, { text: '✅ Status updated successfully!' });
  } catch (error) {
    console.error('Error while updating status:', error);
    await sock.sendMessage(message.key.remoteJid, { text: '☠️ Failed to update status.' });
  }
}

// Register the command
const testCommand = new Command('test', 'Test posting text to status', handleTestCommand);
module.exports = {testCommand};
