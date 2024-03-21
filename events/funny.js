const { Client, GatewayIntentBits } = require("discord.js");
require("./index.js");

const client = new Client({ 
  intents: [ 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

//Funny Event Listeners
client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  //typing the word trap
  if (message.content.includes("trap", "trapped", "trapping", "traps")) {
    message.reply({
      files: [
        {
          attachment:
            "https://filmschoolrejects.com/wp-content/uploads/2019/08/itsatrap-2.jpg",
        },
      ],
    });
  }

  //Sending an Image
  if (message.attachments.size && message.attachments.first().url) {
    message.channel.send(
       "@everyone It looks like someone is sending dick pics again!"
     );
   } else {}
 });