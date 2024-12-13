const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const Command = require('../lib/Command')
const path = require('path');

// Command registration
const pdfCommand = new Command(
    'pdf', // Command name
    'Generates a PDF from the quoted message with a custom title.', // Description
    async (sock, message) => {
        // Check if the message contains a quoted message and a title
        const quotedMessage = message.message.extendedTextMessage ? message.message.extendedTextMessage.contextInfo.quotedMessage : null;
        const messageText = message.conversation || message.message?.extendedTextMessage?.text || '';

// Extract the title from the text
const title = messageText.split(' ').slice(1).join(' ');

        if (!quotedMessage || !title) {
            await sock.sendMessage(message.key.remoteJid, {
                text: 'Please quote a message and provide a valid title after #pdf.',
            });
            return;
        }

        try {
            // Extract the quoted message text
            const quotedText = quotedMessage ? quotedMessage.conversation : '';

            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();

            // Set content in the PDF
            page.drawText(quotedText, { x: 50, y: height - 150, size: 12, color: rgb(0, 0, 0) });

            // Save the PDF to a buffer
            const pdfBytes = await pdfDoc.save();

            // Sanitize the title to create a valid file name
            const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

            // Generate file path with sanitized title
            const pdfPath = path.join(__dirname, `${sanitizedTitle}.pdf`);

            // Save the PDF to disk
            fs.writeFileSync(pdfPath, pdfBytes);

            // Send the PDF to the user
            await sock.sendMessage(message.key.remoteJid, {
                document: fs.createReadStream(pdfPath),
                mimetype: 'application/pdf',
                caption: `Here is your generated PDF titled "${title}"!`,
            });

            // Clean up the generated file
            fs.unlinkSync(pdfPath);

        } catch (error) {
            console.error('Error generating PDF:', error);
            await sock.sendMessage(message.key.remoteJid, { text: 'Failed to generate PDF!' });
        }
    },
    'public', // Access level
    'Utility', // Category
    false // Group-only restriction
);
module.exports = {pdfCommand}
