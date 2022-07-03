const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
name: "lucky",
description: "💰︰Aposte um valor.",
type: 'CHAT_INPUT',

options: [
{
name: `quantidade`,
description: `💰︰Quantidade de moedas que deseja apostar.`,
type: `NUMBER`,
required: true,
}],

run: async (client, interaction, args) => {

let din = interaction.options.getNumber("quantidade");
let user = interaction.user;

let moneyMy = await db.fetch(`money_${user.id}`) || 0

if(din < 1000) return interaction.reply({content: `**🗞️︰Tente apostar um valor acima de \`1,000\` moedas.**`, ephemeral: true});


if(moneyMy < din) return interaction.reply({content: `**🗞️︰Você não tem moedas o suficiente para efetuar esta aposta. Você precisa de mais \`${parseInt(din-moneyMy).toLocaleString()}\`**`, ephemeral: true});

let lucky = Math.floor(Math.random() * 10);

if(lucky < 4) {

db.add(`money_${user.id}`,din);

return interaction.reply(`**🏆︰Você ganhou \`${din.toLocaleString()}\` moedas!**`);

} else {

db.subtract(`money_${user.id}`,din);

return interaction.reply(`**☹️︰Você perdeu \`${din.toLocaleString()}\` moedas!**`);
}

}};