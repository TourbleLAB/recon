const ms = require('ms');

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Debes tener los permisos de administración de mensajes para volver a generar sorteos.');
    }
    if(!args[0]){
        return message.channel.send(':x: ¡Tienes que especificar un ID de mensaje válido!');
    }
    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    if(!giveaway){
        return message.channel.send('No se puede encontrar un regalo para `'+ args.join(' ') + '`.');
    }
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('El sorteo terminará en menos de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' segundos...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} ya esta terminado.`)){
            message.channel.send('¡Este sorteo ya ha terminado!');
        } else {
            console.error(e);
            message.channel.send('Ocurrió un error...');
        }
    });

};