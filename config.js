module.exports = {                                                        
	SUDO: process.env.SUDO ? process.env.SUDO.split(',') : [''],
    OWNER: process.env.OWNER || 'ayanokoji',
    HANDLER: process.env.PREFnIX || 'null',
    SESSION_ID: process.env.SESSION_ID || 'SOPHIA_MD-2F5FE7FFADCC4CCFB9259930A9D098D3C9RIIV42ZEL',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || 'private',
    STICKER_PACKNAME: process.env.STICKER_PACKNAME || 'K.AYANOKOJI,SOPHIA-MD',
    PORT: process.env.PORT || 8005
};
