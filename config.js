module.exports = {                                                        
	SUDO: process.env.SUDO ? process.env.SUDO.split(',') : ['2347017895743','2348073765008'],
    OWNER: process.env.OWNER || 'ayanokoji',
    HANDLER: process.env.PREFnIX || '.',
    SESSION_ID: process.env.SESSION_ID || 'SOPHIA_MD-8C86327153D646C8827172EDE36A2097YO9BC4Y1JCC',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || 'private',
    STICKER_PACKNAME: process.env.STICKER_PACKNAME || 'K.AYANOKOJI,SOPHIA-MD',
    PORT: process.env.PORT || 8005
};
