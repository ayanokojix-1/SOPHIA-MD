module.exports = {                                                        
	SUDO: process.env.SUDO ? process.env.SUDO.split(',') : ['2347017895743','2348073765008'],
    OWNER: process.env.OWNER || 'ayanokoji',
    HANDLER: (() => {
        // Check if the prefix includes the Termux path
        const prefix = process.env.PREFIX || 'null';
        if (prefix.includes('/data/data/com.termux/files/usr')) {
            return '!'; // Override with the desired prefix
        }
        return prefix.trim(); // Use the .env prefix if valid
    })(),
    SESSION_ID: process.env.SESSION_ID || 'SOPHIA_MD-1E1FB9F59563454A9BF9A67FAF041579R8TYY5MKCU',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || 'private',
    STICKER_PACKNAME: process.env.STICKER_PACKNAME || 'K.AYANOKOJI,SOPHIA-MD',
    PORT: process.env.PORT || 8005
};

