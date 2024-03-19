const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	console.log(interaction);
});

// require("dotenv").config();
// const { request } = require('undici');

// const {
//   Client,
//   IntentsBitField,
//   GatewayIntentBits,
//   Events,
// } = require("discord.js");

// let client = new Client({
//   intents: [
//     IntentsBitField.Flags.Guilds,
//     IntentsBitField.Flags.GuildMembers,
//     IntentsBitField.Flags.GuildMessages,
//     IntentsBitField.Flags.MessageContent,
//     IntentsBitField.Flags.GuildMessageReactions,
//     GatewayIntentBits.Guilds,
//   ],
// });

// client.on("ready", (c) => {
//   console.log(`༼ つ ◕_◕ ༽つ ${c.user.username} is ready and online`);
// });

// client.on("interactionCreate", async (interaction) => {
//   if (interaction.commandName === "hey") {
//     interaction.reply("Hello friend");
//   } else if (interaction.commandName === "weather") {
//     const term = interaction.options.getString("term");
//     const query = new URLSearchParams({ term });
//     console.log(query);
//     request(
//       `http://api.weatherapi.com/v1/current.json?key=3f832c00dacc4f8c98f190014240603&q=${query}`
//     ).then((dictResult) => {
//       dictResult.body.json();
//     }).then((result) => {
//       console.log('result', result);
//     }).catch(error => console.log('error', error ));
//   } else{}
// });

// client.on("messageCreate", (message) => {
//   if (message.author.bot) {
//     return;
//   }

//   if (message.content.includes("trap", "trapped", "trapping", "traps")) {
//     message.reply({
//       files: [
//         {
//           attachment:
//             "https://filmschoolrejects.com/wp-content/uploads/2019/08/itsatrap-2.jpg",
//         },
//       ],
//     });
//   }

//   if (message.attachments.size && message.attachments.first().url) {
//     message.channel.send(
//       "@everyone It looks like someone is sending dick pics again!"
//     );
//   } else {
//   }
// });

// client.login(process.env.TOKEN);
