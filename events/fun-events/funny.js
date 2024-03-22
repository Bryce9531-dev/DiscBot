const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) {
      return;
    }
    
    function trapImage(){   //typing the word trap
      message.reply({
        files: [
          {
            attachment:
              "https://filmschoolrejects.com/wp-content/uploads/2019/08/itsatrap-2.jpg",
          },
        ],
      });
    };
    
    function imageReply(){    //sending an image
      message.channel.send(
        "@everyone It looks like someone is sending dick pics again!"
      );
    }

    if (message.content.includes('trap', 'trapped', 'trapping', 'traps')) {
      trapImage()
    }

    if (message.attachments.size && message.attachments.first().url) {
     imageReply()
    }
  },
}; 