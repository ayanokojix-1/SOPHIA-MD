const Command = require('../lib/Command');
const quotedImageCommand = new Command(
  'quotedstick', // Command name
  'Sends the quoted image back to the user', // Command description
  async (sock, message) => { // Asynchronous function
    // Get the quoted image from the message
    const quotedImage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    
    // Check if there's a quoted image (stickerMessage)
    if (quotedImage && quotedImage.stickerMessage) {
      try {
        // Download the sticker image
        const imagePath = await console.downloadSticker(quotedImage, sock);
        
        if (imagePath) {
          // Send the downloaded image back to the user
          await sock.sendMessage(message.key.remoteJid, {
            sticker: { url: imagePath }
          });
        } else {
          // If the imagePath is not valid
          await sock.sendMessage(message.key.remoteJid, {
            text: 'Failed to download the image.'
          });
        }
      } catch (error) {
        // Error handling if something goes wrong
        console.error('Error downloading or sending the image:', error);
        await sock.sendMessage(message.key.remoteJid, {
          text: 'Failed to download or send the image.'
        });
      }
    } else {
      // If no quoted image found
      await console.wa("No quoted image.");
    }
  },
  'public', // Access level (can be 'public', 'private', 'admin', etc.)
  'Media', // Category
  false // Group-only restriction (true means only available in groups)
);
module.exports = { quotedImageCommand };

