const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
name: "pay",
description: "💰︰Pague uma quantia de moedas para um usuário.",
type: 'CHAT_INPUT',

options: [
{
name: `usuário`,
description: `💰︰Escolha um usuário para pagar.`,
type: `USER`,
required: true,
},
{
name: `quantidade`,
description: `💰︰Quantidade de moedas que deseja pagar.`,
type: `NUMBER`,
required: true,
}],

run: async (client, interaction, args) => {

let ops = {
youUser: interaction.options.getUser("usuário"),
payMoney: interaction.options.getNumber("quantidade")};

let user = interaction.user;
let [ moneyMy, moneyYou ] = [ await db.fetch(`money_${user.id}`) || 0, await db.fetch(`money_${ops.youUser.id}`) || 0, ];

if(moneyMy < ops.payMoney) return interaction.reply({content: `**🗞️︰Você não tem moedas o suficiente para efetuar este pagamento. Você precisa de mais \`${parseInt(ops.payMoney-moneyMy).toLocaleString()}\`**`, ephemeral: true});

if(user.id == ops.youUser) return interaction.reply({content: `**🗞️︰Você não pode se pagar!**`, ephemeral: true});

if(ops.payMoney < 100) return interaction.reply({content: `**🗞️︰Tente pagar um valor acima de \`100\` moedas.**`, ephemeral: true});

let valorEnd = parseInt(ops.payMoney-parseInt(ops.payMoney*0.05));

db.subtract(`money_${user.id}`, ops.payMoney);
db.add(`money_${ops.youUser.id}`, valorEnd);

const embed = new Discord.MessageEmbed()
.setColor("#FFB300")
.setDescription(`**💸 » Pagamento**\n> **🗞️︰Você pagou \`${valorEnd.toLocaleString()}\` moedas para ${ops.youUser}! Eu peguei \`5%\` do valor pago como taxa.**`)

if(user.displayAvatarURL()) embed.setThumbnail(user.displayAvatarURL())


interaction.reply({embeds: [embed]});


}};