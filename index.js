const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({ 
  intents: [ 
    GatewayIntentBits.Guilds,
   /*  GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers, */
  ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
};

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};

// Log in to Discord with your client's token
client.login(process.env.TOKEN);


/* //Funny Event Listeners
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
 }); */