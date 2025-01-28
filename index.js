const {handlerPrefix} = require('./lib/listener')
const config = require('./config')
const express = require('express');
const connectionLogic = require('./lib/connect');

global.startTime = Date.now();
require('./lib/mediaHelper');
require('module-alias/register');

// Create and start the Express server
const app = express();

// Home page route
app.get('/', (req, res) => {
  res.send('<h1>WhatsApp Bot is Running!</h1>');
});

// Server status route
app.get('/status', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running smoothly!' });
});

// Start the server
const PORT = config.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log(`The prefix is ${handlerPrefix}`)
connectionLogic();
