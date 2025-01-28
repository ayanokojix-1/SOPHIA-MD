const path = require('path');
const {existsSync} = require('fs');
const configPath = path.join(__dirname, './config.env');
if (existsSync(configPath)) require('dotenv').config({ path: configPath,override:true,debug:false });
module.exports = {                                                        
	SUDO: process.env.SUDO ? process.env.SUDO.split(',') :[''],
    OWNER: process.env.OWNER || '',
    HANDLER: process.env.PREFIX || 'null',
    SESSION_ID: process.env.SESSION_ID || 'SOPHIA_MD-49BD5EE53F9644D4BD204A0F08F50678ZCVI4VUPJDB',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || 'private',
    STICKER_PACKNAME: process.env.STICKER_PACKNAME || '',
    PORT: process.env.PORT || 8005
};

