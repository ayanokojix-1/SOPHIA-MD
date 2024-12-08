const Command = require('../lib/Command');
const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const vcardParser = require('vcard-parser');
const iconv = require('iconv-lite'); // For decoding Quoted-Printable

// Function to decode quoted-printable strings
function decodeQuotedPrintable(str) {
  return iconv.decode(Buffer.from(str, 'binary'), 'utf-8').toString();
}

// Function to validate and clean phone numbers
function cleanPhoneNumber(number) {
  if (!number) return null;
  const cleanedNumber = number.replace(/\s|-/g, ''); // Remove spaces and dashes
  return cleanedNumber.startsWith('+') || /^\d+$/.test(cleanedNumber) ? cleanedNumber : null;
}

async function handleQuotedVCF(sock, message) {
  const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
  const participant = message.message?.extendedTextMessage?.contextInfo?.participant;

  if (quoted?.documentMessage && quoted.documentMessage.mimetype === 'text/x-vcard') {
    try {
      const mediaPath = path.join(__dirname, '../temp');
      if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath);

      // Download the VCF file
      const stream = await downloadMediaMessage(
        {
          key: { id: key, remoteJid: message.key.remoteJid, participant },
          message: quoted,
        },
        sock
      );

      const filePath = path.join(mediaPath, `contacts_${Date.now()}.vcf`);
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the stream to a file
      await new Promise((resolve, reject) => {
        stream.pipe(writeStream);
        stream.on('end', resolve);
        stream.on('error', reject);
      });

      // Read the VCF file
      const vcfData = fs.readFileSync(filePath, 'utf-8');
      const parsedContacts = vcardParser.parse(vcfData);

      // Extract all phone numbers
      const phoneNumbers = Object.values(parsedContacts).flatMap(contact => {
        const numbers = contact.tel?.map(tel => {
          const decodedNumber = decodeQuotedPrintable(tel.value);
          return cleanPhoneNumber(decodedNumber); // Clean and validate the number
        });
        return numbers?.filter(Boolean) || []; // Remove invalid numbers
      });

      // Log extracted phone numbers
      console.log('Extracted Phone Numbers:', phoneNumbers);

      // Send the phone numbers as a message
      if (phoneNumbers.length > 0) {
        await sock.sendMessage(message.key.remoteJid, {
          text: `Extracted Phone Numbers:\n${phoneNumbers.join('\n')}`,
        });
      } else {
        await sock.sendMessage(message.key.remoteJid, { text: 'No phone numbers found in the VCF file.' });
      }

      // Clean up the temporary file
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error handling VCF file:', error);
      await sock.sendMessage(message.key.remoteJid, { text: 'Failed to process the VCF file.' });
    }
  } else {
    await sock.sendMessage(message.key.remoteJid, { text: 'No VCF file found in the quoted message!' });
  }
}

const quotedVCFCommand = new Command('quotedvcf', 'Extract phone numbers from a VCF file', handleQuotedVCF);
module.exports = { quotedVCFCommand };
