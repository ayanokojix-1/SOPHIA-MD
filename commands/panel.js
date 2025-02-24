const sophia = require('sophia');
//const { createServer, createUser,panelModeCheck,panelModeSet } = require('../lib/panel')
const {isPanelModeOn, setMode } = require('../lib/libtest4')
const panelPrompt = "Panel mode not activated cannot use command type .panel-mode on to use"
sophia({
    name: 'panel-mode',
    description: 'To switch on and off panel mode',
    execute: async function (sock, message, args) {
        const toggle = args[0];
        if (!toggle) return console.wa("Usage: .panel-mode <on|off>", message);
        if (!["on", "off"].includes(toggle)) return console.wa("Invalid input! Use: .panel-mode <on|off>", message);

        const currentMode = isPanelModeOn() ? "on" : "off"; 

        if (currentMode === toggle) {
            return console.wa(`Panel mode is already ${toggle}`, message);
        }

        if (setMode(toggle)) {
            console.wa(`Panel mode has been turned ${toggle}`, message);
        } else {
            console.wa("Failed to change panel mode. Try again!", message);
        }
    },
  accessLevel:'private',
  category:'Panel',
  isGroupOnly: false
});

/*sophia({
  name: '1gb',
  description:' For creating 1gb panel',
  execute: async function (sock,message,args){
  const currentMode = await panelModeCheck();
  if(currentMode=="off") return console.wa(panelPrompt,message)
  if()
  }
})*/