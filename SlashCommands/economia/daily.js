const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
name: "daily",
description: "💰︰Pegue seus prêmios diários.",
type: 'CHAT_INPUT',

run: async (client, interaction, args) => {

let user = interaction.user;

let timeDb = await db.fetch(`daily_${user.id}`) || 0;
let timeCount = parseInt(timeDb-Date.now());

if(timeCount > 1000) return interaction.reply({content: `**⏰︰Espere: \`${ms(timeCount)}\` para pegar seu prêmio diário novamente.**`, ephemeral: true});

let [ rand1, rand2 ] = [ Math.floor(Math.random() * 4000) +100, Math.floor(Math.random() * 40) +10 ];
db.set(`daily_${user.id}`, Date.now()+ms("1d"));
db.add(`money_${user.id}`, rand1)
db.add(`xp_${user.id}`, rand2)

const embed = new Discord.MessageEmbed()
.setColor("#FFB300")
.setTitle("**🏆 » Prêmio diário**")
.setDescription(`**🗞️︰Você pegou seu prêmio diário e ganhou os seguintes prêmios:**\n> **💸︰Moedas: \`+${rand1.toLocaleString()}\`**\n> **🌟︰Xp: \`+${rand2}\`**`)


if(user.displayAvatarURL()) embed.setThumbnail(user.displayAvatarURL())


interaction.reply({embeds: [embed]});


}};