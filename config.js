const path = require('path');
const {existsSync} = require('fs');
const config = require('./config');
const configPath = path.join(__dirname, './config.env');
if (existsSync(configPath)) require('dotenv').config({ path: configPath,override:true,debug:true });
module.exports = {                                                        
	SUDO: process.env.SUDO ? process.env.SUDO.split(',') : ['2347017895743','2348073765008'],
    OWNER: process.env.OWNER || '',
    HANDLER: process.env.PREFIX || '.',
    SESSION_ID: process.env.SESSION_ID || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || '',
    STICKER_PACKNAME: process.env.STICKER_PACKNAME || '',
    PORT: process.env.PORT || 8005
};

