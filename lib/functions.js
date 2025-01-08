const axios = require('axios');

const { jidDecode } = require('@whiskeysockets/baileys');
// Decode JID function
const decodeJid = (jid) => {
  if (!jid) return jid;
  if (/:\d+@/gi.test(jid)) {
    const decode = jidDecode(jid) || {};
    return decode.user && decode.server
      ? `${decode.user}@${decode.server}`
      : jid;
  } else {
    return jid;
  }
};

const isInGroup = (message) => {
  return message.key.remoteJid.endsWith("@g.us");
};

const parseJid = (text = "") => {
  if (typeof text !== 'string') return []; // Check if text is a string
  const matches = text.match(/@([0-9]{5,16}|0)/g); // Use match instead of matchAll
  return matches ? matches.map((v) => v.replace('@', '') + "@s.whatsapp.net") : [];
};

const parsedJid = (text = "") => {
  if (typeof text !== 'string') return []; // Check if text is a string
  const matches = text.match(/([0-9]{5,16}|0)/g); // Use match instead of matchAll
  return matches ? matches.map((v) => v + "@s.whatsapp.net") : [];
};


// Check if the user is an admin
const isAdmin = async (jid, user, sock) => {
  try {
    const decodedUser = decodeJid(user);
    console.log("Decoded User JID:", decodedUser);

    const groupMetadata = await sock.groupMetadata(jid);
    const groupAdmins = groupMetadata.participants
      .filter((participant) => participant.admin !== null)
      .map((participant) => participant.id);

    return groupAdmins.includes(decodedUser);
  } catch (error) {
    console.error("Error in isAdmin function:", error);
    return false;
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function isValidTikTokURL(url) {
     const regex = /^(https?:\/\/)?(vm\.tiktok\.com|www\.tiktok\.com)\/.+$/;
    return regex.test(url);
}

module.exports = { decodeJid, isAdmin, parseJid, parsedJid, isInGroup, delay,isValidTikTokURL }; 
