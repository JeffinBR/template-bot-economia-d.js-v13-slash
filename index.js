const { Client, Collection } = require("discord.js");

const client = new Client({ intents: 32767, partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER'] })

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();

require("./handler")(client);

client.login("TOKEN DO BOT");