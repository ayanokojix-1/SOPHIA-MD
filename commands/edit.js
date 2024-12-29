const Command = require('../lib/Command');

async function handleEditCommand(sock, message,args) {
    try {
      // Extract the quoted message information
      const quotedMessageContext = message.message.extendedTextMessage?.contextInfo;
      if (!quotedMessageContext || !quotedMessageContext.quotedMessage) {
        return console.wa('_please reply a message to edit_')
      }

      // Get the stanzaId (message ID), participant (sender), and remoteJid (chat ID)
      const stanzaId = quotedMessageContext.stanzaId;
      const participant = quotedMessageContext.participant || message.key.remoteJid;
      const remoteJid = message.key.remoteJid;
      const fromMe = true;

      // Reconstruct the key for the quoted message
      const quotedMessageKey = {
        remoteJid: remoteJid,
        fromMe: fromMe,
        id: stanzaId,
      };

      // Get the new text to replace the quoted message
      const newText = args.join(' ');
      if (!newText) {
        return console.wa(`_provide text to edit_`)
      }

      // Edit the quoted message
      await sock.sendMessage(remoteJid, {
        text: newText,
        edit: quotedMessageKey, // Pass the reconstructed key
      });
    } catch (error) {
      console.error('Error editing message:', error);
      sock.sendMessage(message.key.remoteJid, { text: 'Failed to edit the message.' });
    }
};
const editCommand = new Command( 'edit',
                                'edit a message',
                                handleEditCommand,
  'private',
  'Utility',
  false
);

const handCommand = new Command(
    'hand', // command name
    'send and edit a hand symbol repeatedly', // command description
    handleHandCommand, // function to handle the command
    'public', // access level
    'Fun', // category
    false // not a group command
);

async function handleHandCommand(sock, message, args) {
    // Get the chat ID where the message will be sent
    const jid = message.key.remoteJid;

    // Default hand edit array (normal)
    const normalHandEdits = [
        "8✊️===D", "8=✊️==D", "8==✊️=D", "8===✊️D",
        "8==✊️=D", "8=✊️==D", "8✊️===D", "8=✊️==D",
        "8==✊️=D", "8===✊️D 💦", "8==✊️=D💦 💦", "8=✊️==D 💦💦 💦"
    ];

    // Hand edit array for black (different emoji)
    const blackHandEdits = [
        "8✊🏿===D", "8=✊🏿==D", "8==✊🏿=D", "8===✊🏿D",
        "8==✊🏿=D", "8=✊🏿==D", "8✊🏿===D", "8=✊🏿==D",
        "8==✊🏿=D", "8===✊🏿D 💦", "8==✊🏿=D💦 💦", "8=✊🏿==D 💦💦 💦"
    ];

    // Choose the correct hand edits based on the args
    const handEdits = args[0] === 'black' ? blackHandEdits : normalHandEdits;

    let response;

    try {
        // Send the first message
        response = await sock.sendMessage(jid, { text: handEdits[0] });

        // Now loop through the rest of the array to edit the message
        for (let i = 1; i < handEdits.length; i++) {
            // Wait a bit before editing the message, to make the sequence visible
            await new Promise(resolve => setTimeout(resolve,800));

            // Edit the previously sent message
            await sock.sendMessage(jid, {
                text: handEdits[i],
                edit: response.key,
            });
        }

        
    } catch (error) {
        console.wa('An error occurred while trying to send and edit the messages.');
    }
}
module.exports = { editCommand ,handCommand};

