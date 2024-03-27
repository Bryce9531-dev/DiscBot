const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dad")
    .setDescription(
      "I tell you a dad joke!"
    ),
   
  async execute(interaction) {

    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", process.env.FACT_TOKEN);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };        

      fetch("https://api.api-ninjas.com/v1/dadjokes", requestOptions)
        .then(response => response.json())
        .then(result => interaction.reply(`joke:\n${result[0].joke}`))
        .catch(error => console.log('error', error));
  },
};