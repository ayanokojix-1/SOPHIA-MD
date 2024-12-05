const express = require('express');
const connectionLogic = require('./lib/connect');
const config = require('./config');

global.startTime = Date.now();

// Start connection logic
connectionLogic();

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
const PORT = config.PORT || 7860;
app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});