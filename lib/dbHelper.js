
const clientId = 'e65ey6z0zolw86l';
const clientSecret = 'qq72ha9lk12joiy';
const refreshToken = '-4s2xffXW-4AAAAAAAAAAaxMpw7cxJPzVCpK9luw6dNqBs655Oj-PSpfWGyJ9S1r'; // Save this securely
const axios = require('axios')
async function refreshAccessToken() {
    try {
        const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
            },
        });

        const newAccessToken = response.data.access_token;
        return newAccessToken; // Return the new access token
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);
        throw error;
    }
}

async function downloadFile(sessionID) {
  const rev = sessionID.split('~')[1];
    try {
        const url = 'https://content.dropboxapi.com/2/files/download';
        const accessToken = await refreshAccessToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Dropbox-API-Arg': JSON.stringify({
                    path: `rev:${rev}`, // Path in Dropbox (e.g., '/folder/file.txt')
                }),
            },
        });

        if (!response.ok) {
            console.error('Error downloading file:', await response.text());
            return null;  
        }
        const content = Buffer.from(await response.arrayBuffer());
        return content; // Return the Buffer
    } catch (error) {
        console.error('Error downloading file:', error);
        return null;
    }
}

module.exports = { downloadFile }