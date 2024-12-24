// config.js
module.exports = {
    SUDO: process.env.SUDO ? process.env.SUDO.split(',') : ['2348073765008', '2347017895743'], // Fallback to default if not set
    OWNER: process.env.OWNER || 'kuju', // Updated owner name
    HANDLER: process.env.HANDLERS || '#',
    SESSION_ID: process.env.SESSION_ID || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MODE: process.env.MODE || 'private'
};
