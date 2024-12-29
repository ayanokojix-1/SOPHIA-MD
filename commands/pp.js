const Command = require('../lib/Command'); // Assuming you're using this structure for commands
const fs = require('fs');
const path = require('path');
const names= "pp";
// Define the '.pp' command
const ppCommand = new Command(
  "pp",
  'Updates your profile picture with the quoted image.',
  async (sock, message) => {
      const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage
    if (quoted?.imageMessage) {
      try {
        const imagepath = await console.downloadImage(quoted,sock)
        const jid = sock.user.id;
        await sock.updateProfilePicture(jid,{url: imagepath});
        await console.wa("successfully updated pfp");
	await  console.removeFile(imagepath);
      } catch (error) {
        console.log("pp error:", error);
        await console.wa("an error occurred");
      }
    } else {
      await console.wa("cannot use command");
    }
  },

  'private', // This is a private command
  'Profile', // Category for organization
  false // No group restriction
);

module.exports = { ppCommand };
