const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription(
      "I tell you a fun fact!"
    ),
   
  async execute(interaction) {

    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "T3BPoEgdxBiR8ilhOAQdQw==P8rZ4T4mIyZpJy5Z");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };        

      fetch("https://api.api-ninjas.com/v1/facts", requestOptions)
        .then(response => response.json())
        .then(result => interaction.reply(`Please uncuck your dumb-shit, lib-cuck-fucking SJW brain and recognize this empirically correct fact that I am about to spit:\n${result[0].fact}`))
        .catch(error => console.log('error', error));
  },
};
