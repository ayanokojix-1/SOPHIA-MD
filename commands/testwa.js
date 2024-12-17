const Command = require('../lib/Command');

const quotedImageCommand = new Command(
  'quotedimage2', // Command name
  'Sends the quoted image back to the user', // Command description
  async (sock, message) => {
    // Get the quoted image from the message
    const quotedImage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    // Check if there's a quoted image
    if (quotedImage.imageMessage) {
      try {
        // Download the image
        const imagePath = await console.downloadImage(quotedImage, sock);
        if (imagePath) {
          // Send the downloaded image back to the user
          await sock.sendMessage(message.key.remoteJid, {
            image: { url: imagePath },
            caption: 'Here is your quoted image!',
          });
        }
      } catch (error) {
        console.error('Error downloading or sending the image:', error);
        await sock.sendMessage(message.key.remoteJid, { text: 'Failed to download or send the image.' });
      }
    } else {
      // If no quoted image found
      await console.wa("No quoted image found.");
    }
  },
  'public', // Access level (can be 'public', 'private', 'admin', etc.)
  'Media', // Category
  false // Group-only restriction (true means only available in groups)
);

module.exports = { quotedImageCommand };

