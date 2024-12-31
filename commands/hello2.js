const FS = require('fs');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const Command = require('../lib/Command')

const testingXCommand = new Command(
    "names",
    "to send media for testing",
    handleDownloadCommand,
    'public',
    'Test',
    false
);
async function handleDownloadCommand(sock, message){
const key = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
    
const mess = {
    key: {
        id: key,
        remoteJid: message.key.remoteJid,
        participant: message.key.participant,
    },
    message: message.message.extendedTextMessage?.contextInfo?.quotedMessage.viewOnceMessageV2?.message
};

if(!mess.message || !mess.message.imageMessage){
    console.wa('there is no message for you to test');
    return;
}

    try{
const mediaBuffer = await downloadMediaMessage(
mess,
'buffer',
{}
);
await FS.promises.writeFile('./my-download.jpg', mediaBuffer);
const testing = FS.readFileSync('./my-download.jpg');
//Helper function 
console.waMedia.sendImage(testing, 'this is an image  and this is the caption')

}catch(error){
    console.log(`successfully sent error: ${error}`)
}
}



module.exports= { testingXCommand}
