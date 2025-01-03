const Command = require('../lib/Command');
const {isAdmin,decodeJid,parsedJid,isInGroup,delay} = require('../lib/functions');
const {isQuotedMessage, getQuotedInfo} = require('../lib/quotedMessageHandler');


const tagAll = async (sock, message) => {
    if (!isInGroup(message)) {
        await sock.sendMessage(message.key.remoteJid, {
            text: '⚠️ This command can only be used in group chats.',
        });
        return;
    }

    // Fetch group metadata
    const groupMetadata = await sock.groupMetadata(message.key.remoteJid);
    const { participants } = groupMetadata;

    // Build the tag message
    let teks = "Tagging all group members:\n";
    for (let mem of participants) {
        teks += ` @${mem.id.split("@")[0]}\n`;
    }

    // Send the tag message
    await sock.sendMessage(message.key.remoteJid, {
        text: teks.trim(),
        mentions: participants.map((a) => a.id),
    });
};

async function handleKickCommand(sock, message, match) {
  try {
    // Check if the message is from a group
    if (!message.key.remoteJid.endsWith("@g.us")) {
      return await sock.sendMessage(message.key.remoteJid, {
        text: "_This command is for groups only_",
      });
    }

    // Check if the user executing the command is an admin
    const isadmin = await isAdmin(
      message.key.remoteJid,
      message.key?.participant,
      sock
    );
    if (!isadmin) {
      return await sock.sendMessage(message.key.remoteJid, {
        text: "_You need to be an admin to use this command._",
      });
    }

    // Extract quoted JID (if the message is quoting someone)
    let quotedJid = null;
    if (
      message.message?.extendedTextMessage?.contextInfo &&
      message.message.extendedTextMessage.contextInfo.participant
    ) {
      quotedJid = message.message.extendedTextMessage.contextInfo.participant;
    }

    // Ensure JID format
const ensureJidFormat = (jid) =>
  jid.endsWith("@s.whatsapp.net") ? jid : jid + "@s.whatsapp.net";

let jid = null;

// Check for quoted JID
    if (quotedJid) {
  jid = [ensureJidFormat(quotedJid)];
} else if (match && typeof match === "string") {
  // If there's a match, extract the JID from the message
  jid = (match.match(/@\d+/g) || []).map((jid) => ensureJidFormat(jid.replace("@", "")));
}

// Handle case when there's no user to kick
if (!jid || jid.length === 0) {
  return await sock.sendMessage(message.key.remoteJid, {
    text: "_Mention a user to kick or quote the user._",
  });
}
	const replacer = decodeJid(sock.user.id)
    if (jid.includes(replacer)) {
      return await sock.sendMessage(message.key.remoteJid, {
        text: "_I cannot kick myself._",
      });
    }

    // Check if the target user is the group owner
    const groupMetadata = await sock.groupMetadata(message.key.remoteJid);
    const ownerJid = groupMetadata.owner || null;
    if (jid.includes(ownerJid)) {
      return await sock.sendMessage(message.key.remoteJid, {
        text: "_I cannot kick the group owner._",
      });
    }

    // Notify before kicking
    await sock.sendMessage(message.key.remoteJid, {
      text: "_Kicking..._",
    });

    // Add 3-second delay
    await delay(3000);

    // Kick the participant from the group
    try {
      await sock.groupParticipantsUpdate(message.key.remoteJid, jid, "remove");
      console.log(`Kicked JID: ${jid}`);
      return await sock.sendMessage(message.key.remoteJid, {
        text: `_@${jid[0].split("@")[0]} kicked_`,
        mentions: jid,
      });
    } catch (error) {
      console.error("Error in groupParticipantsUpdate:", error);
      return await sock.sendMessage(message.key.remoteJid, {
        text: "_Failed to kick the user. Make sure I have admin permissions._",
      });
    }
  } catch (error) {
    console.error("Error in kick command:", error);
    return await sock.sendMessage(message.key.remoteJid, {
      text: "_An error occurred while trying to kick the member._",
    });
  }
} 

const leaveGroup = async (sock, message) => {
    try {
	    const botId = decodeJid(sock.user.id);
	    const participantId = decodeJid(message.key.participant);
	    console.log("Decoded Bot's ID:", botId);
        console.log("Decoded Participant's ID:", participantId);
        

        // Restrict the command to the bot itself
        if (participantId !== botId) {
            await sock.sendMessage(message.key.remoteJid, {
                text: "⚠️ Only the bot can use this command.",
		    
            });
            return;
        }

        // Check if the message is in a group
        if (!isInGroup(message)) {
            await sock.sendMessage(message.key.remoteJid, {
                text: "⚠️ This command can only be used in group chats.",
            });
            return;
        }
await delay(3000)

        // Leave the group
        await sock.groupLeave(message.key.remoteJid);

        await sock.sendMessage(sock.user.id, {
            text: "_Left successfully_"},{quoted:message});
    } catch (error) {
        console.error("Error in leaveGroup command:", error);
        await sock.sendMessage(message.key.remoteJid, {
            text: "❌ An error occurred while trying to leave the group.",
        });
    }
};

const tag = async (sock, message, match) => {
  try {
    // Ensure the command is used in a group
    if (!message.key.remoteJid.endsWith("@g.us")) {
      await sock.sendMessage(message.key.remoteJid, {
        text: "⚠️ This command can only be used in group chats.",
      });
      return;
    }

    // Fetch group metadata
    const groupMetadata = await sock.groupMetadata(message.key.remoteJid);
    const { participants } = groupMetadata;

    // Handle quoted message case first
    if (isQuotedMessage(message)) {
      const quotedInfo = getQuotedInfo(message);

      // Extract text from the quoted message
      if (quotedInfo.type === "text" && quotedInfo.quotedMessage) {
        match = quotedInfo.quotedMessage.conversation;
      }
    }

    // Ensure match is properly extracted from input or quote
    match = match || "";

    // If match is an array, join it into a string
    if (Array.isArray(match)) {
      match = match.join(" ");
    }

    // Ensure match is a valid string
    if (!match || typeof match !== "string" || match.trim() === "") {
      await sock.sendMessage(message.key.remoteJid, {
        text: "_Please provide a message or reply to one to tag the group._",
      });
      return;
    }

    // Send the message with mentions
    await sock.sendMessage(message.key.remoteJid, {
      text: match,
      mentions: participants.map((participant) => participant.id),
    });
  } catch (error) {
    console.error("Error in tag command:", error);
    await sock.sendMessage(message.key.remoteJid, {
      text: "_An error occurred while executing the tag command._",
    });
  }
};



async function handleJoinCommand(sock, message, args) {
    let groupLink;

    // Extract link from quoted message or command argument
    if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation) {
        groupLink = message.message.extendedTextMessage.contextInfo.quotedMessage.conversation;
    } else if (args.length > 0) {
        groupLink = args[0];
    } else {
        await sock.sendMessage(message.key.remoteJid, {
            text: 'Please provide or quote a valid group link to join.',
        });
        return;
    }

    // Validate the group link format 
    const groupInviteRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,})/;
const match = groupLink.match(groupInviteRegex);

if (!match) {
    await sock.sendMessage(message.key.remoteJid, {
        text: 'Invalid group link! Please provide a valid WhatsApp group link.',
    });
    return;
}

const inviteCode = match[1];

try {
    // Attempt to join the group
    const groupMetadata = await sock.groupAcceptInvite(inviteCode);
    await sock.sendMessage(message.key.remoteJid, {
        text: `*Successfully joined the group*`,
    });
} catch (error) {
    console.error('Error joining group:', error);
    let errorMessage = '_ERROR JOINING GROUP _';

    if (error.message.includes('request to join')) {
        // Handle request-based group
        await sock.sendMessage(message.key.remoteJid, {
            text: 'The group requires admin approval to join. Request sent successfully!',
        });
    } else if (error.message.includes('invalid')) {
        errorMessage = 'The group link is invalid or expired.';
    } else if (error.message.includes('not-authorized')) {
        errorMessage = 'The bot is not authorized to join this group.';
    }

    await sock.sendMessage(message.key.remoteJid, { text: errorMessage });
}

}

const joinCommand = new Command(
    'join',
    'Joins a WhatsApp group using an invite link',
    handleJoinCommand,
    'public', // Restrict to owners for security
    'Utility',
    false
);


// Register the command
const tagAllCommand = new Command(
    'tagall',
    'Tag all members in the group',
    tagAll,
    'public',
    'Group',
    true
);

const tagCommand = new Command(
	'tag',
	'tag members of a group',
	tag,
	'public',
	'Group',
	true
);

const kickCommand = new Command(
    'kick',
    'kick  member in the group',
    handleKickCommand,
    'public',
    'Group',
    true
);

const leftCommand = new Command(
	'left',
	'to leave a group',
	leaveGroup,
	'private',
	'Group',
	true
);

module.exports = { tagAllCommand,joinCommand,kickCommand,tagCommand,leftCommand};
