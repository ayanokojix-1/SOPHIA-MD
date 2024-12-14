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


async function fetchTikTokVideo(url) {
    const API_URL = 'https://tiktok-video-downloader-api1.p.rapidapi.com/api/tiktok/links';
    const API_KEY = 'be0698908amsh8c35595ef8f33c3p133246jsnbd8df3e6204b';

    try {
        const response = await axios.post(
            API_URL,
            { url },
            {
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'tiktok-video-downloader-api1.p.rapidapi.com',
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.data || !response.data.download_url) {
            throw new Error("Unable to retrieve the video.");
        }

        return response.data.download_url;
    } catch (error) {
        console.error("Error fetching TikTok video:", error.message);
        throw new Error("Failed to fetch the TikTok video.");
    }
}

function isValidTikTokURL(url) {
    const regex = /^(https?:\/\/)?(vm\.)?tiktok\.com\/.+/i;
    return regex.test(url);
}

module.exports = { decodeJid, isAdmin, parseJid, parsedJid, isInGroup, delay,fetchTikTokVideo,isValidTikTokURL }; 
