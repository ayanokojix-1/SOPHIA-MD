const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

async function handleQuotedDocument(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted?.documentMessage) {
    try {
      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      // Extract MIME type of the quoted document
      const mimeType = quoted.documentMessage.mimetype;
      let extension;

      // Determine file extension based on MIME type
      if (mimeType.startsWith('image/')) {
        extension = '.jpg'; // For images
      } else if (mimeType === 'application/pdf') {
        extension = '.pdf'; // For PDFs
      } else if (mimeType === 'application/javascript') {
        extension = '.js'; // For JavaScript files
      } else if (mimeType === 'text/plain') {
        extension = '.txt'; // For plain text files
      } else if (mimeType === 'text/html') {
        extension = '.html'; // For HTML files
      } else if (mimeType === 'text/css') {
        extension = '.css'; // For CSS files
      } else if (mimeType === 'text/vcard') {
        extension = '.vcf'; // For vCard (VCF) files
      } else if (mimeType === 'application/zip') {
        extension = '.zip'; // For ZIP files
      } else {
        extension = '.bin'; // Default for unknown types (binary files)
      }

      // Download the document and handle it as a stream
      const stream = await downloadMediaMessage(
        {
          key: { id: key, remoteJid: message.key.remoteJid, participant },
          message: quoted,
        },
        sock
      );

      // Create a file path to save the document with dynamic extension
      const filePath = path.join(mediaPath, `document_${Date.now()}${extension}`);
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the stream to a file
      await new Promise((resolve, reject) => {
        stream.pipe(writeStream);
        stream.on('end', resolve);
        stream.on('error', reject);
      });

      // Send the downloaded document back to the user
      await sock.sendMessage(message.key.remoteJid, {
        document: { url: filePath },
        fileName: quoted.documentMessage.fileName || `document_${Date.now()}`,  // Use the original file name if available
        caption: 'Here is your quoted document!',
      });

      // Clean up the temporary file
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error handling quoted document:', error);
      await sock.sendMessage(message.key.remoteJid, { text: 'Failed to process the quoted document.' });
    }
  } else {
    await sock.sendMessage(message.key.remoteJid, { text: 'No document found in the quoted message!' });
  }
}

const quotedDocumentCommand = new Command('quoteddocument', 'Send quoted document back to the user', handleQuotedDocument);
module.exports = { quotedDocumentCommand };

