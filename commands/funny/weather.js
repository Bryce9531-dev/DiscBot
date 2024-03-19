const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription(
      "I tell you the weather, bitches, based on the zip you give me son!"
    )
    .addStringOption(option =>
      option
        .setName('zipcode')
        .setDescription('it\'s in the name dumbass!')
        .setRequired(true)
    ),
  async execute(interaction) {
    let chance = Math.floor(Math.random() * (20 - 1 + 1) + 1);

    if (chance !== 1) {
      const query = interaction.options.getString('zipcode');
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`http://api.weatherapi.com/v1/current.json?key=3f832c00dacc4f8c98f190014240603&q=${query}`, requestOptions)
        .then(response => response.json())
        .then(result => interaction.reply(`The current temperator in ${result.location.name} is ${result.current.temp_f}⁰F`))
        .catch(error => console.log('error', error));
    } else {
      await interaction.reply("Pong!");
    }

  },
};
