const { SlashCommandBuilder } = require("discord.js");
const { request } = require('undici');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription(
      "I tell you the weather, bitches, based on the zip you give me son!"
    )
    .addStringOption(option =>
			option
				.setName('zipcode')
				.setDescription('it\'s in the name dumbass!')),
  async execute(interaction) {
    const query = interaction.options.getString('zipcode') ?? '10010';
    request(
      `http://api.weatherapi.com/v1/current.json?key=3f832c00dacc4f8c98f190014240603&q=${query}`
    )
      .then((dictResult) => {
        dictResult.body.json();
      })
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => console.log("error", error));
    await interaction.reply("Pong!");
  },
};
