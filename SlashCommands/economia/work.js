const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
name: "work",
description: "💰︰Trabalhe.",
type: 'CHAT_INPUT', 

options: [{
name: `go`,
description: `💰︰Trabalhe para ganhar moedas e XP.`,
type: `SUB_COMMAND`,
},
{
name: `info`,
description: `💰︰Veja as suas informações trabalhistas.`,
type: `SUB_COMMAND`,

options: [{
name: `usuário`,
description: `💰︰Escolha um usuário para ver as informações.`,
type: `USER`,
required: false
}],

},
{
name: `jobs`,
description: `💰︰Escolha um emprego.`,
type: `SUB_COMMAND`,

options: [{
name: `empregos`,
description: `💰︰Escolha um emprego da lista.`,
type: `STRING`,
required: true,
choices: [

{
name: `Gari`,
value: `1000|Gari|10m|10|1`, // Salário | Nome do emprego | Tempo pra trabalhar| Xp ganho | Nível necessário para desbloquear esta profissão.

},
{
name: `Bombeiro(a)`,
value: `1500|Bombeiro(a)|10m|15|4`,
},
{
name: `Enfermeiro(a)`,
value: `2000|Enfermeiro(a)|7m|20|6`,
},
{
name: `Médico(a)`,
value: `6000|Médico(a)|15m|25|8`,
},
{
name: `Youtuber`,
value: `6000|Youtuber|10m|30|10`,
},
{
name: `Empresário`,
value: `12000|Empresário|17m|45|12`,
},

]
}],

},
],

run: async (client, interaction, args) => {

let user = interaction.options.getUser("usuário") || interaction.user;
let sub = interaction.options.getSubcommand();
let moedas = await db.fetch(`money_${user.id}`) || 0;
let workDb = await db.fetch(`workInfo_${user.id}`) || `1000|Gari|10m|10|1`;
// Salário | Nome do emprego | Tempo pra trabalhar| Xp ganho | Nível necessário para desbloquear esta profissão.

let timeDb = await db.fetch(`work_${user.id}`) || 0;
let lvl = await db.fetch(`lvl_${user.id}`) || 1;
let time = timeDb-Date.now();
let work = workDb.split(`|`);
let choice = interaction.options.getString("empregos");

if(sub.includes("info")){

const embed = new Discord.MessageEmbed()
.setColor("#3899FF")
.setTitle(`**💼 » Informações de: ${user.username.slice(0,10)}**`)
.setDescription(`> **🗞️︰Emprego: \`${work[1]}\`**\n> **💰︰Salário: \`${parseInt(work[0]).toLocaleString()}\`**\n> **🎉︰Ganho de xp: \`${work[3]}\`**\n> **⏰︰Tempo de espera: \`${work[2]}\`**`)

if(user.displayAvatarURL()) embed.setThumbnail(user.displayAvatarURL())

return interaction.reply({embeds: [embed]});

};

if(sub.includes("jobs")){
choice = choice.split("|");
if(lvl < choice[4]) return interaction.reply({content: `**☹️︰Você precisa estar no nível \`${choice[4]}\` para poder escolher esse emprego.**`, ephemeral: true});

db.set(`workInfo_${user.id}`, interaction.options.getString("empregos"));
interaction.reply({content: `**🌟︰Você selecionou o emprego de __${choice[1].toLowerCase()}__! Agora seu salário é de \`${parseInt(choice[0]).toLocaleString()}\` moedas.**`});

};

if(sub.includes("go")){

if(time > 1000) return interaction.reply({content: `**⏰︰Espere: \`${ms(time)}\` para trabalhar.**`, ephemeral: true});
db.set(`work_${user.id}`, Date.now()+ms(work[2]));
db.add(`money_${user.id}`, work[0])
db.add(`xp_${user.id}`, work[3])

const embed = new Discord.MessageEmbed()
.setColor("#AC63FF")
.setTitle("**💼 » Emprego**")
.setDescription(`**🌟︰Você trabalhou como __${parseInt(work[1]).toLowerCase()}__ e ganhou os seguintes prêmios:**\n> **💰︰Moedas: \`+${work[0].toLocaleString()}\`**\n> **🎉︰Xp: \`+${work[3]}\`**\n\n> **🗞️︰Trabalhe novamente em \`${work[2]}\`**`)

if(user.displayAvatarURL()) embed.setThumbnail(user.displayAvatarURL())

return interaction.reply({embeds: [embed]});

};

}};