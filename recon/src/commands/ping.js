const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if(message.author.bot) return;

  let prefix = config.prefix;

  if(!message.content.startsWith(prefix)) return;

  const m = await message.channel.send("cargando ...")

  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor('RANDOM')
  .setTimestamp()
  .addField("Latencia", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("Latencia del API", `${Math.round(client.ws.ping)}ms`, true)
  .setFooter(`comando pedido por ${message.author.tag}`, message.author.displayAvatarURL());

  m.edit(pong)
}

module.exports.help = {
  name: "ping"
}