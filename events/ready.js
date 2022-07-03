const client = require("../index.js");

client.on('ready', () => {

    console.log("[LOGS] ・ 🌎 - Usuário: "+client.user.tag)

    console.log("[LOGS] ・ 🌎 - Ping: "+client.ws.ping)

    console.log("[LOGS] ・ 🌎 - Servers: "+client.guilds.cache.size)

    let logs = [

        `🎊︰${client.guilds.cache.size} Servers`,

        "🤔︰Slash commands, template by: JeffinBR#7203",

    ];

    

    i = 0;

    setInterval(() => client.user.setActivity(`${logs[i++ % logs.length]}`, {

        type: "WATCHING"

    }

    ), 15000)

    process.on('unhandledRejection', (reason, p) => {

        console.log('SCRIPT REJEITADO');

        console.log(reason, p)

    });

    process.on('uncaughtExceptionMonitor', (err, origin) => {

        console.log('BLOQUEADO');

        console.log(err, origin)

    });

    process.on('multipleResolves', (type, promise, reason) => {

        console.log('VÁRIOS ERROS');

        console.log(type, promise, reason)

    });

    process.on("uncaughtException", (err, origin) => {

        console.log('CATCH ERROR');

        console.log(err, origin)

    });

})
