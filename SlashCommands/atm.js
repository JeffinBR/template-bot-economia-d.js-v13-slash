const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
name: "atm",
description: "💰︰Veja as suas moedas.",
type: 'CHAT_INPUT', 

options: [{
name: `usuário`,
description: `💰︰Escolha um usuário para ver as moedas.`,
type: `USER`,
required: false
}],

run: async (client, interaction, args) => {

let user = interaction.options.getUser("usuário") || interaction.user;

let moedas = await db.fetch(`money_${user.id}`) || 0;

const embed = new Discord.MessageEmbed()
.setColor("#FFB300")
.setDescription(`**🗞️ » Moedas de: ${user.username.slice(0,10)}**\n💰︰Moedas \`${moedas.toLocaleString()}\``)


if(user.displayAvatarURL()) embed.setThumbnail(user.displayAvatarURL())


interaction.reply({embeds: [embed]});


}};
