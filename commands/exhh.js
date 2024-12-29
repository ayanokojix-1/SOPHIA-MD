const Command = require('../lib/Command'); // Assuming you're using this structure for commands

// Define the '.pp' command
const ppCommand = new Command(
  'pp2', 
  'Updates your profile picture with the quoted image.',
  async (sock, message) => {
    // Ensure that the quoted message contains an image
    const quoted = message.message.extendedTextMessage.contextInfo.quotedMessage;

    if (quoted && quoted.imageMessage) {
      try {
        // Extract the image from the quoted message
        const image = quoted.imageMessage;
        
        // Download the image and get the file path
        const filepath = await console.downloadImage(image, sock); 

        // Update the profile picture using the downloaded image
        await sock.updateProfilePicture(sock.user.id, { url: filepath });

        // Optionally, remove the image file after use
        await console.removeFile(filepath);

        console.log('Profile picture updated!');
        // Send success message to the user
        await console.wa('Your profile picture has been updated!');
      } catch (error) {
        console.error('Failed to update profile picture:', error.message);
        await console.wa('Sorry, I couldn\'t update your profile picture.');
      }
    } else {
      // If no image is quoted, ask the user to quote an image
      await console.wa('Please quote an image to update your profile picture.');
    }
  },
  'private', // This is a private command
  'Profile', // Category for organization
  false // No group restriction
);

module.exports = { ppCommand };
