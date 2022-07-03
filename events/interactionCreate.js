const client = require("../index");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require("quick.db");

client.on("interactionCreate", async (interaction) => {

if (interaction.isCommand()) {

const cmd = client.slashCommands.get(interaction.commandName);
const args = [];

let i = interaction;
let user = i.user;

interaction.member = interaction.guild.members.cache.get(interaction.user.id);

for (let option of interaction.options.data) {
if (option.type === "SUB_COMMAND") {
if (option.name) args.push(option.name);
option.options?.forEach((x) => {
if (x.value) args.push(x.value);
});
} else if (option.value) args.push(option.value) };

if(!db.fetch(`lvl_${user.id}`)) db.set(`lvl_${user.id}`, 1);

let xp = db.fetch(`xp_${user.id}`) || 0;
let hard = db.fetch(`hard_${user.id}`) || 250;

if(xp >= hard) {
await db.set(`hard_${user.id}`, parseInt(hard*2));
await db.set(`xp_${user.id}`, 0);
await db.add(`lvl_${user.id}`, 1);
};

cmd.run(client, interaction, args);

};

});