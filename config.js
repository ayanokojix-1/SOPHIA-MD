module.exports = {                                                        
	SUDO: process.env.SUDO ? process.env.SUDO.split(',') : ['2347017895743','2348073765008'],
    OWNER: process.env.OWNER || 'ayanokoji',
    HANDLER: process.env.PREFnIX || 'null',
    SESSION_ID: process.env.SESSION_ID || 'SOPHIA_MD-AA150095DDD3446F8DE479A786DF6DC1WY8LP5',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || 'private',
    STICKER_PACKNAME: process.env.STICKER_PACKNAME || 'K.AYANOKOJI,SOPHIA-MD',
    PORT: process.env.PORT || 8005
};
