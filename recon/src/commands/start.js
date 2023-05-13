const ms = require('ms');

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Debe tener los permisos de administración de mensajes para volver a generar obsequios.');
    }
    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(':x: ¡Tienes que mencionar un canal válido!');
    }
    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: ¡Tienes que especificar una duración válida!');
    }
    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: ¡Tienes que especificar un número válido de ganadores!');
    }
    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send(':x: ¡Tienes que especificar un premio válido!');
    }
    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: client.config.hostedBy ? message.author : null,
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"**Sorteo**",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **SORTEO FINALIZADO** 🎉🎉",
            timeRemaining: "Tiempo restante: **{duration}**!",
            inviteToParticipate: "reacciona 🎉 para participar",
            winMessage: "¡Felicidades, {winners}! ¡Has ganado **{prize}**!",
            embedFooter: "sorteos",
            noWinner: "Sorteo cancelado, no hay participaciones válidas.",
            hostedBy: "Organizado por: {user}",
            winners: "ganador/es",
            endedAt: "terminó en",
            units: {
                seconds: "segundos",
                minutes: "minutos",
                hours: "horas",
                days: "días",
                pluralS: false 
            }
        }
    });

    message.channel.send(`El sorteo comenzó en ${giveawayChannel}!`);

};