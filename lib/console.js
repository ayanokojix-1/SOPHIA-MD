global.console.wa = async (message) => {
  if (global.currentChat) {
    try {
      // Send the message and capture the response to get the message object with a key
      const response = await sock.sendMessage(global.currentChat, { text: message });
      
      // Log the sent message and the response key
      console.log(`Message sent to ${global.currentChat}: ${message}`);
      
      // Return the response so you can access the key
      return response; 
    } catch (error) {
      console.error('Failed to send message via console.wa:', error.message);
    }
  } else {
    console.error('No active chat to send message.');
  }
};

global.console.waMedia = {
  sendImage: async (imagePath, caption = '') => {
    if (global.currentChat) {
      try {
        await sock.sendMessage(global.currentChat, { image: imagePath , caption:caption });
        console.log(`Image sent to ${global.currentChat}`);
      } catch (error) {
        console.error('Failed to send image:', error.message);
      }
    } else {
      console.error('No active chat to send image.');
    }
  },

  sendVideo: async (videoPath, caption = '') => {
    if (global.currentChat) {
      try {
        await sock.sendMessage(global.currentChat, { video: { url: videoPath }, caption });
        console.log(`Video sent to ${global.currentChat}`);
      } catch (error) {
        console.error('Failed to send video:', error.message);
      }
    } else {
      console.error('No active chat to send video.');
    }
  },

  sendDocument: async (documentPath, caption = '') => {
    if (global.currentChat) {
      try {
        await sock.sendMessage(global.currentChat, { document: { url: documentPath }, caption });
        console.log(`Document sent to ${global.currentChat}`);
      } catch (error) {
        console.error('Failed to send document:', error.message);
      }
    } else {
      console.error('No active chat to send document.');
    }
  }
};
global.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
global.console.waReact = async (reaction, customKey) => {
  const key = customKey || message.key;
  if (global.currentChat && key) {
    try {
      await sock.sendMessage(global.currentChat, {
        react: { text: reaction, key: key },
      });
    } catch (error) {
      console.error('Failed to send reaction via console.waReact:', error.message);
    }
  } else {
    console.error('No active chat or key to react to');
  }
};

global.m = {
  quoted: null, // Default value for quoted
  stanzaId:null,
};
