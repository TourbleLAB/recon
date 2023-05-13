const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    let prefix = config.prefix;
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let invite = new Discord.MessageEmbed()
    .setTitle("¡Enlace de invitación y apoyo!")
    .addField("Enlace de invitación", "[¡AÑÁDEME!](https://discord.com/api/oauth2/authorize?client_id=1104666440860184658&permissions=8&redirect_uri=https%3A%2F%2Fgithub.com%2Fnotsolitus&response_type=code&scope=bot)")
    .addField("Servidor de soporte", "[¡ÚNETE!](https://discord.gg/ZWPbwyZfCg)")
    .setTimestamp()
    .setFooter(`comando pedido por ${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(invite);
}

module.exports.help = {
    name: "invite"
}
