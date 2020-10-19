const Discord = require('discord.js')
const client = new Discord.Client()
const genshin = require("genshin-impact-api")
const availablemaps = ['enemies', 'oculus', 'ore', 'plants', 'shrines']
const availablechars = ['amber', 'barbara', 'beidou', 'bennet', 'chongyun', 'diluc', 'fischl', 'jean', 'kaeya', 'keqing', 'lisa', 'mona', 'ningguang', 'noelle', 'qiqi', 'razor', 'sucrose', 'traveler', 'venti', 'xiangling', 'xingqiu']
const command = require('./command')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)

  command(client, ['char', 'character'], (message) => {
    const resultMsg = message.content.split(' ').splice(1).toString()
    if (!resultMsg) { // Проверяем есть ли есть аргументы
      message.channel.send(new Discord.MessageEmbed()
      .setColor('#FFE4AA')
      .setDescription('You didn\'t provide a character! List of all available characters:\n`Amber`, `Barbara`, `Beidou`, `Bennet`, `Chongyun`, `Diluc`, `Fischl`, `Jean`, `Kaeya`, `Keqing`, `Lisa`, `Mona`, `Ningguang`, `Noelle`, `Qiqi`, `Razor`, `Sucrose`, `Traveler`, `Venti`, `Xiangling`, `Xingqiu`'))
       // Отправляем сообщение об ошибке
      return
    }

    if (availablechars.includes(resultMsg)) {
      var result = genshin.characters(message.content.split(' ').splice(1).toString()) // Получаем результат 
        // Меняем color и vision в зависимости от персонажа
        var color = '#FFE4AA'
        if (result.vision.includes('Pyro')) {
          color = '#F58C48'
          result.vision = '[<:Element_Pyro:767667088264396820> (Pyro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Cryo')) {
          color = '#A2F5F8'
          result.vision = '[<:Element_Cryo:767667087874588683> (Cryo)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Dendro')) {
          color = '#9CD516'
          result.vision = '[<:Element_Dendro:767667088189816832> (Dendro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Anemo')) {
          color = '#77E3B6'
          result.vision = '[<:Element_Anemo:767667088327835678> (Anemo)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Hydro')) {
          color = '#05D2F8'
          result.vision = '[<:Element_Hydro:767667087836446721> (Hydro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Geo')) {
          color = '#F0C443'
          result.vision = '[<:Element_Geo:767667087949955153> (Geo)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Electro')) {
          color = '#D49CFE'
          result.vision = '[<:Element_Electro:767667088314859560> (Electro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        // Меняем гендер на смайлик для красоты
        if (result.gender === 'Male') {
          result.gender = '♂️'
        } else {
          result.gender = '♀️'
        }
        // Меняем оружие на ссылку для удобства)
        if (result.weapon === 'Bow') {
          result.weapon = '[Bow](https://genshin-impact.fandom.com/wiki/Bows)'
        }
        if (result.weapon === 'Sword') {
          result.weapon = '[Sword](https://genshin-impact.fandom.com/wiki/Swords)'
        }
        if (result.weapon === 'Polearm') {
          result.weapon = '[Polearm](https://genshin-impact.fandom.com/wiki/Polearms)'
        }
        if (result.weapon === 'Claymore') {
          result.weapon = '[Claymore](https://genshin-impact.fandom.com/wiki/Claymores)'
        }
        if (result.weapon === 'Catalyst') {
          result.weapon = '[Catalyst](https://genshin-impact.fandom.com/wiki/Catalysts)'
        }
        // Меняем цифры на звездочки
        if (result.rarity === '4') {
          result.rarity = '⭐⭐⭐⭐'
        } else {
          result.rarity = '⭐⭐⭐⭐⭐'
        }

      message.channel.send(new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${result.name} (Clickable)`)
        .setDescription(`**Vision**: ${result.vision}\n**Weapon**: ${result.weapon}\n**Gender**: ${result.gender}\n**Nation**: ${result.nation}\n**Rarity**: ${result.rarity}\n\n${result.description}`)
        .setURL(result.url)
        .setThumbnail(result.image))
        return
    } else {
      message.channel.send(new Discord.MessageEmbed()
      .setColor('#FFE4AA')
      .setDescription('You\'ve provided wrong character! List of all available characters:\n`Amber`, `Barbara`, `Beidou`, `Bennet`, `Chongyun`, `Diluc`, `Fischl`, `Jean`, `Kaeya`, `Keqing`, `Lisa`, `Mona`, `Ningguang`, `Noelle`, `Qiqi`, `Razor`, `Sucrose`, `Traveler`, `Venti`, `Xiangling`, `Xingqiu`'))
      return
    }
    
   

  })

  command(client, ['map'], (message) => {

    const resultMsg = message.content.split(' ').splice(1).toString()
    if (!resultMsg) {
      message.channel.send(new Discord.MessageEmbed()
      .setColor('#FFE4AA')
      .setDescription('You didn\'t provide a map! List of all available maps:\n`Enemies`, `Oculus`, `Ore`, `Plants`, `Shrines`'))
      return
    }
    
    if (availablemaps.includes(resultMsg)) {
      var result = genshin.map(message.content.split(' ').splice(1).toString())
      message.channel.send(new Discord.MessageEmbed()
      .setColor('#FFE4AA')
      .setTitle(`${result.name} (Clickable)`)
      .setURL(result.Interactive_Map)
      .setImage(result.map_url))
    } else {
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#FFE4AA')
    .setDescription('You\'ve provided wrong map! List of all available maps:\n`Enemies`, `Oculus`, `Ore`, `Plants`, `Shrines`'))
    return
  }
  })

  command(client, ['help'], (message) => {
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#FFE4AA')
    .setDescription('p!**char** <character> - show info about specified character (links lead to wiki pages)\np!**map** <map> - show specified map (links lead to web interactive maps)\n\n[Invite](https://discord.com/api/oauth2/authorize?client_id=767659730390482944&permissions=280576&scope=bot) [Vote](https://top.gg/bot/767659730390482944)'))
    return
  })
})

client.login('your token here')
