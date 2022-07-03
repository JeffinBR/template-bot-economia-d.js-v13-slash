const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
name: "bet",
description: "💰︰Aposte com alguém.",
type: 'CHAT_INPUT', 

options: [
{
name: `usuário`,
description: `💰︰Escolha um usuário para apostar.`,
type: `USER`,
required: true,
},
{
name: `quantia`,
description: `💰︰Escolha uma quantia para apostar.`,
type: `NUMBER`,
required: true,
},
],

run: async (client, interaction, args) => {

let ops = {
youUser: interaction.options.getUser("usuário"),
payMoney: interaction.options.getNumber("quantia")};

let user = interaction.user;
let [ moneyMy, moneyYou ] = [ await db.fetch(`money_${user.id}`) || 0, await db.fetch(`money_${ops.youUser.id}`) || 0, ];

if(moneyMy < ops.payMoney) return interaction.reply({content: `**🗞️︰Você não tem moedas o suficiente para efetuar esta aposta. Você precisa de mais \`${parseInt(ops.payMoney-moneyMy).toLocaleString()}\`**`, ephemeral: true});

if(moneyYou < ops.payMoney) return interaction.reply({content: `**☹️︰${ops.youUser} Não tem \`${ops.payMoney.toLocaleString()}\` moedas!**`, ephemeral: true});


if(user.id == ops.youUser) return interaction.reply({content: `**🗞️︰Você não pode apostar com si mesmo(a).**`, ephemeral: true});


if(ops.payMoney < 100) return interaction.reply({content: `**🗞️︰Tente apostar um valor acima de \`100\` moedas.**`, ephemeral: true});

let valorEnd = parseInt(ops.payMoney-parseInt(ops.payMoney*0.05));



const btn = new Discord.MessageActionRow().addComponents(

new Discord.MessageButton()
.setStyle("SUCCESS")
.setEmoji("✔️")
.setLabel('Confirmar')
.setCustomId("sim")

);


const embed = new Discord.MessageEmbed()
.setColor("#FFB300")
.setDescription(`**💸 » Aposta**\n> **🗞️︰Valor da aposta \`${valorEnd.toLocaleString()} ( 5% De taxa )\`**\n> **🌟︰${ops.youUser} Basta você confirmar a aposta.**`)

if(user.displayAvatarURL()) embed.setThumbnail(ops.youUser.displayAvatarURL())

interaction.reply({embeds: [embed], content: `${user} ${ops.youUser}`, components: [btn], fetchReply: true}).then( async m => {


const collector =
m.createMessageComponentCollector({
type: 'BUTTON',
time: 60000*3,
});

collector.on("collect", async (x) => {
if(x.user.id !== ops.youUser.id) return x.reply({content: `**☹️︰Somente ${ops.youUser} pode confirmar a aposta.**`, ephemeral: true});

 moneyMy = await db.fetch(`money_${user.id}`) || 0;
 moneyYou = await db.fetch(`money_${ops.youUser.id}`) || 0;

if(moneyMy < ops.payMoney) return interaction.reply({content: `**🗞️︰Você não tem moedas o suficiente para efetuar esta aposta. Você precisa de mais \`${parseInt(ops.payMoney-moneyMy).toLocaleString()}\`**`, ephemeral: true});

if(moneyYou < ops.payMoney) return interaction.reply({content: `**☹️︰${ops.youUser} Não tem \`${ops.payMoney.toLocaleString()}\` moedas!**`, ephemeral: true});


if(x.customId === "sim"){

let array = ["eu", "ele"];
let rand = array[Math.floor(Math.random() * array.length)];

if(rand == "eu") {

db.subtract(`money_${ops.youUser.id}`, ops.payMoney);
db.add(`money_${user.id}`, valorEnd);

return x.reply({content: `**🎉︰${user} Saiu vitorioso na aposta e ganhou \`${valorEnd.toLocaleString()}\` moedas.\n☹️︰${ops.youUser} Não foi dessa vez...**`});

} else {

db.subtract(`money_${user.id}`, ops.payMoney);
db.add(`money_${ops.youUser.id}`, valorEnd);

return x.reply({content: `**🎉︰${ops.youUser} Saiu vitorioso na aposta e ganhou \`${valorEnd.toLocaleString()}\` moedas.\n☹️︰${user} Não foi dessa vez...**`});
};

};


});

});



}};