const Command = require('../lib/Command'); // Assuming you're using this structure for commands
const fs = require('fs');
const path = require('path');

// Define the '.pp' command
const ppCommand = new Command(
  'pp', 
  'Updates your profile picture with the quoted image.',
	async (sock , message) =>{
	if (message.key.remoteJid.endsWith('@s.whatsapp.net')){
		try{ 
	const imagepath = path.join(__dirname, "../assets/my-image.jpg");
	const imagebuffer = fs.readFileSync(imagepath);
	const jid = sock.user.id;
	await sock.updateProfilePicture(jid,imagebuffer);
	await console.wa("successfuly updated pfp");
	}	catch(error) {
		console.log("pp error:", error);
		console.wa("an error occured");
		
		}
	}
	else{
		await console.wa("cannot use command");
	}

	},


  'private', // This is a private command
  'Profile', // Category for organization
  false // No group restriction
);

module.exports = { ppCommand };
