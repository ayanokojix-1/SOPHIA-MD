const axios = require('axios');
const fsPromises = require('fs').promises;
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

async function urlToBuffer(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        console.error(`Error fetching media from URL: ${error.message}`);
        throw new Error('Failed to fetch media from URL');
    }
}


// It won't work if you don't reencode thr Audio
async function reencodeAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat('mp3')
            .audioBitrate('128k')
            .audioCodec('libmp3lame')
            .on('end', () => {
                console.log(`Re-encoded audio saved at: ${outputPath}`);
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error(`Error re-encoding audio: ${err.message}`);
                reject(new Error('Failed to re-encode audio'));
            })
            .save(outputPath);
    });
}

async function sendYouTubeAudio(sock, message, search) {
    try {
        const audioPath = await ytsdlmp3(search);
        const ytUrl = await yts(search);
        const pic = await ytThumbnailmp3(ytUrl);
        await sock.sendMessage(message.key.remoteJid, {
            audio: { url: audioPath },
            mimetype: 'audio/mpeg',
            contextInfo: {
            externalAdReply: {
                title: await ytTitlemp3(ytUrl),
                showAdAttribution: true,  // Show attribution for the ad
                sourceUrl: ytUrl,
                thumbnail: pic,
                mediaType: 1,  // Type of media (1 for image, 2 for video)
                renderLargerThumbnail: true,  // Render a larger thumbnail
            },
        },
            
        });

        // Clean up re-encoded file
        await fsPromises.unlink(audioPath).catch(console.error);
        
        console.log('Audio sent successfully!');
    } catch (error) {
        console.error(`Error sending audio: ${error.message}`);
        // Send error message to user
        await sock.sendMessage(message.key.remoteJid, {
            text: `Failed to process audio: ${error.message}`
        });
    }
}

sendYouTubeAudio(sock, message, 'die with a smile')