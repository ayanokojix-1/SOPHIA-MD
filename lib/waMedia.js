global.console.waMedia = {
  sendImage: async (imagePath, caption = '') => {
    if (global.currentChat) {
      try {
        await sock.sendMessage(global.currentChat, { image: { url: imagePath }, caption });
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
