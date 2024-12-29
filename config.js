module.exports = {                                                        
	SUDO: process.env.SUDO ? process.env.SUDO.split(',') : ['2348073765008','2347017895743'],
    OWNER: process.env.OWNER || 'ayanokoji',
    HANDLER: process.env.PREFnIX || 'null',
    SESSION_ID: process.env.SESSION_ID || 'SOPHIA_MD-AF1A7253B9B14D9EAD81E5A57C4B45CFOX0M1UUT7TH',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || 'private',
    PORT: process.env.PORT || 8005
};
