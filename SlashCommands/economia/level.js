const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
name: "level",
description: "💰︰Veja o seu nível.",
type: 'CHAT_INPUT',

options: [{
name: `usuário`,
description: `💰︰Escolha um usuário para ver o nível.`,
type: `USER`,
required: false
}],

run: async (client, interaction, args) => {

let user = interaction.options.getUser("usuário") || interaction.user;

let lvl = await db.fetch(`lvl_${user.id}`) || 1;
let h = await db.fetch(`hard_${user.id}`) || 250;
let x = await db.fetch(`xp_${user.id}`) || 0;

const embed = new Discord.MessageEmbed()
.setColor("#FF3F41")
.setDescription(`**📎 » Informações de: ${user.username.slice(0,10)}**\n🌟︰Nível \`${lvl.toLocaleString()}\`\n🎉︰Xp: \`${x}/${h}\``)

if(user.displayAvatarURL()) embed.setThumbnail(user.displayAvatarURL())

interaction.reply({embeds: [embed]});


}};