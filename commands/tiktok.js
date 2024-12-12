const Command = require('../lib/Command');
const{ fetchTikTokVideo,isValidTikTokURL} = require('../lib/functions');

async function tiktokUrlDownload(sock, message, args) {
    const tiktokUrl = args.join(" ").trim();

    if (!isValidTikTokURL(tiktokUrl)) {
        await sock.sendMessage(message.key.remoteJid, { text: "Invalid TikTok URL! Please provide a valid link." });
        return;
    }

    try {
        const videoUrl = await fetchTikTokVideo(tiktokUrl);
        await sock.sendMessage(message.key.remoteJid, {
            video: { url: videoUrl },
            caption: "Here is your TikTok video!",
        });
    } catch (error) {
        await sock.sendMessage(message.key.remoteJid, { text: `Error: ${error.message}` });
    }
}

const tiktokCommand = new Command(
	'tiktok',
	'to download tiktok videos',
	tiktokUrlDownload,
	'private',
	'downloader',
	false
);

module.exports = {tiktokCommand}
