const Command = require('../lib/Command'); // Assuming you're using this structure for commands

// Define the '.edit' command
const editCommand = new Command(
  'edit', 
  'Edit the quoted text based on provided commands (+<text>, -<number>, -<number>+<text>).',
  async (sock, message) => {
    // Get the quoted message
    const quoted = message.message.extendedTextMessage.contextInfo.quotedMessage;
    
    // Ensure the message has a quoted text
    if (!quoted) {
      return await console.wa("Please quote a message to edit.");
    }
    
    let quotedText = quoted.text || quoted.caption; // Extract text or caption from quoted message
    let command = message.text.split(' ')[1]; // Extract the command after the space
    
    // Check if a valid command is passed
    if (command) {
      try {
        // Process the command for adding text (+<text>) or removing characters (-<number>)
        if (command.startsWith('+')) {
          let addText = command.substring(1); // Get text after '+' sign
          quotedText += addText; // Add it to the quoted text
          await sock.sendMessage(message.from, { text: `Edited text: ${quotedText}` });
        }
        else if (command.startsWith('-')) {
          let removeCount = parseInt(command.substring(1), 10); // Get the number after '-' sign
          if (isNaN(removeCount)) {
            return await console.wa("Please specify a valid number to remove.");
          }
          quotedText = quotedText.slice(0, -removeCount); // Remove the last 'n' characters
          await sock.sendMessage(message.from, { text: `Edited text: ${quotedText}` });
        }
        // Handle cases like -<number>+<text>
        else if (command.includes('-') && command.includes('+')) {
          let [removePart, addText] = command.split('+');
          let removeCount = parseInt(removePart.substring(1), 10); // Get the number after '-'
          if (isNaN(removeCount)) {
            return await console.wa("Please specify a valid number to remove.");
          }
          quotedText = quotedText.slice(0, -removeCount) + addText; // Remove and then add
          await sock.sendMessage(message.from, { text: `Edited text: ${quotedText}` });
        } else {
          await console.wa("Invalid command format.");
        }
      } catch (error) {
        console.error('Error editing text:', error.message);
        await console.wa("Sorry, I couldn't edit the text.");
      }
    } else {
      await console.wa("Please provide a valid command to edit the quoted text.");
    }
  },
  'private', // This is a private command
  'Editing', // Category for organization
  false // No group restriction
);

module.exports = { editCommand };
