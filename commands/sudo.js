const sophia = require('sophia');
const { addSudo, removeSudo } = require('../lib/sudo');
const { getSudoList} = require('../lib/commandHandler');
const { isInGroup } = require('../lib/functions')
sophia({
  name:'setsudo',
  description: 'give a person access to the bot',
  execute: async function (sock,message){
    const quotedParticipant = message.message.extendedTextMessage?.contextInfo?.participant
     const  mentionedPeople = message.message?.extendedTextMessage?.contextInfo?.mentionedJid[0]
    const sudoNumber = isInGroup(message) ? quotedParticipant || mentionedPeople || false : message.key.remoteJid
   if(!sudoNumber){
     await console.wa("_Please mention,reply or type .setsudo in pm_",message)
     return;
   }
    const formattedSudo = sudoNumber.split("@")[0];
    addSudo(formattedSudo);
    await console.wa(`_${formattedSudo} added to sudo_`, message)
  }
})