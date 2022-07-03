const { glob } = require("glob");
const { promisify } = require("util");
const { Client} = require("discord.js");
const globPromise = promisify(glob);

module.exports = async (client) => {

    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const ArrayCommands = [];

    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);
        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        ArrayCommands.push(file);
    });

    client.on("ready",
        async () => {
            // Coloque o id do seu servidor de testes para que os comandos em slash apareçam lá primeiro. Slash commands demoram cerca de 1 hora para serem atualizados nos servidores, para evitar ficar esperando 1 hora para criar comandos novos, a função abaixo atualizará os comandos primeiro em seu servidor de testes.
            
            await client.guilds.cache
            .get("ID DO SEU SERVIDOR DE TESTES ( O BOT PRECISA ESTAR NESSE SERVIDOR )")
            
            .commands.set(ArrayCommands);

            // A função abaixo colocará os seus comandos slashs em todos os servidores que o bot está. ( Demora cerca de 1 hora ).
            await client.application.commands.set(ArrayCommands);
        });

};
