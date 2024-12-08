const Command = require('../lib/Command');
const { bugpdf } = require('../assets/bugpdf');
const path = require('path');
const fs = require('fs');

// Ping command handler
const handlebugCommand = async (sock, message) => {
  const imagePath = path.join(__dirname, '../assets/my-image.jpg'); // Path to the image file

  // Check if the image exists
  if (!fs.existsSync(imagePath)) {
    const errorMessage = "Image file not found.";
    await sock.sendMessage(message.key.remoteJid, { text: errorMessage });
    return;
  }

  const imageBuffer = fs.readFileSync(imagePath); // Read the image file

  for (let i = 0; i < 10; i++) {
    // Send the image with caption
    await sock.sendMessage(message.key.remoteJid, {
      image: imageBuffer,
      caption: `${bugpdf}`, // Use the caption from xeontext1
    });
  }

  const successMessage = "SUCCESSFULLY SENT BUG";
  await sock.sendMessage(message.key.remoteJid, { text: successMessage });
};

// Register the command
const bug2Command = new Command('bug2', 'sends bug to user', handlebugCommand);
module.exports = { bug2Command };
