const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("recon")
      .setTitle("Lista de comandos y guía para el bot")
      .setDescription("A continuación se muestran los comandos que puede hacer con Bot. En este momento, solo hay 6 comandos disponibles, pronto se agregarán más comandos.")
      .addField("🎉 · sorteos ","start [nombre del canal] [Tiempo] [ganadores] [Premio]\nreroll [nombre del premio]\nend [nombre del premio]")
      .addField("❓ · ejemplos ", "g!start #sorteo 5m 1 Testing\ng!end Testing\ng!reroll Testing")
      .addField("✨ · utilidad ", "ping, invite", true)
      .addField("🍃 · información ", "stats", true)
      .addField("🚧 · ¡LEER! ", "este bot ha sido desarrollado por [notsolitus](https://github.com/notsolitus) si quieres el código fuente del bot revisa el [repo](https://github.com/notsolitus/recon)")
      .setTimestamp()
      .setFooter(`comando pedido por ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("has recibido un mensaje directo con la ayuda. **revisa tus md's**");

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}