const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ascii = require('ascii-art');
const chancejs = require('chance');
const chance = new chancejs();
const math = require('math-expression-evaluator')
const stripIndents = require('common-tags').stripIndents
const weather = require('weather-js');
const ytdl = require('ytdl-core');
const forEachTimeout = require('foreach-timeout');
const sm = require('string-similarity');
const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
	mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

const cevaplar123 = [
	"YAZI-TURA:**TURA**",
	"YAZI-TURA:**YAZI**"
];


const bot = new Discord.Client({disableEveryone: true});








           bot.on("ready", async () => {
  
    let prefix = botconfig.prefix
    console.log(`${bot.user.username} hazırım Reis! Sunucuda Aktif : ${bot.guilds.size}`);
    bot.user.setActivity(`${prefix}yardım  ${bot.guilds.size} sunucu ${bot.users.size} kullanıcı`);    
 
  });

  


bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  

    
           
    
  
  
  
    
    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  let args1 = message.content.slice(1);
    
   
  
  
  
  ////////////////////Disco////////////////////  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
////////////////////Disco/////////////////////
  
  
  ////////////////////Müzik/////////////////////
  
  // Müzik bot
  if(cmd === `${prefix}play`){

    if(!message.member.voiceChannel) return message.channel.send("```**Lütfen Bir Ses Kanalına Giriniz**```");
    
    if(message.guild.me.voiceChannel) return message.channel.send("```**Bot Zaten Bir Ses kanalında Var**```");
    
    if(!args[0]) return message.channel.send("```Bir Müzik/Video Url Girmeniz LAZIM!!!```");
    
    let validate = await ytdl.validateURL(args[0]);
    
    if(!validate) return message.channel.send("```Lütfen **Geçerli** Bir URL Giriniz```");
     
    let info = await ytdl.getInfo(args[0]);
    
    let connection = await  message.member.voiceChannel.join();
    
    let dispatcher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}));
    
  message.channel.send(`Şuan Çalan: ${info.title}`);
  
  };
  
  
  // ses ayrıl
   if (cmd === `${prefix}stop`) {
        
     
     if(!message.member.voiceChannel) return message.channel.send('Lütfen Bir Ses kanalına Giriniz')
     if(!message.guild.me.voiceChannel) return message.channel.send('Bot Şuan Ses Kanalında Yok')
     if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Ses Kanalına Bağlı Değilsiniz")
     
     message.guild.me.voiceChannel.leave();
     message.channel.send('Durduruluyor');
                              
      };
    
 
  
  
  
  


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  ////////////////////Müzik/////////////////////
  
  
  
  
  
  
// Duyuru
       if(cmd === `${prefix}duyuru`){

  
         if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send("Yetkin Yok Değişik!");
   if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0x2488E7)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Hey Sen Napıyorsun', 'Ben Sunucu Botuyum Lütfen Beni Sunucunda Dene.')
    return message.author.sendEmbed(ozelmesajuyari); }

  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Birşey Yazmalısınız');

  message.delete();

  console.log(`Duyuru: "${message.author.username}#${message.author.discriminator}" "${mesaj}"`);

      const mesajat = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('' + mesaj + '')

      bot.users.forEach(u => {
    u.sendEmbed(mesajat)
        })

message.channel.send(`:white_check_mark: Mesaj basariyla **` + bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + `** kullanıcıya gonderildi.`);

};
    

// Yardım
   if(cmd === `${prefix}yardım`){
     
     
     message.channel.send("```Özel Mesajlarını Kontrol Et```")
     let yicon = bot.user.displayAvatarURL;
        let helpembed = new Discord.RichEmbed()
        .setDescription("YARDIM")
        .setColor("#54ecf9")
        .setThumbnail(yicon)
        .addField("Webistemizden Ulaşabilirsin Komutlara : http://sonturkbot.rf.gd")
        return message.author.send(helpembed);
      
      
      
      
      };
  
    // Hesapla
  if(cmd === `${prefix}hesapla`){
  
  
  
  var soru = args.join(' ');
    
    if(!soru) return message.reply('Bir işlem belirtin. **Doğru Kullanım**: s!hesapla <işlem>')
    else { let cevap;
        try {
            cevap = math.eval(soru)
        } catch(err) {
            message.channel.send('Hatalı işlem: **' + err)
        }

        const embed = new Discord.RichEmbed()
        .addField('Soru', soru)
        .addField('Cevap', cevap)

        message.channel.send(embed)
    }
  
  
  
  
  };
  
  
      // ban
    if(cmd === `${prefix}ban`){

      if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send("Yetkin Yok Değişik!");
    if(args[0] == "help"){
      message.reply("Kullanımı: s!ban <Kişi> <Sebeb>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu Kişi Banlanamaz");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banlanan Kişi", `${bUser} ID Numarası: ${bUser.id}`)
    .addField("Banlayan Kişi", `<@${message.author.id}> ID Numarası ${message.author.id}`)
    .addField("Sebeb", bReason);

    message.guild.member(bUser).ban(bReason);
    message.channel.send(banEmbed);
};
      
      
    

// Sunuuc Bilgi    
     if(cmd === `${prefix}serverinfo`){
     
     
     let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Sunucu Hakkında")
        .setColor("#54ecf9")
        .setThumbnail(sicon)
        .addField("Sunucu Sahibi", message.guild.owner)
        .addField("Sunucu Sahibinin ID'Si", message.guild.ownerID)
        .addField("Sunucu Adı :", message.guild.name)
        .addField("Sunucudaki Rol Sayısı :", message.guild.roles.size)
        .addField("Sunucu'nun Olduğu Bölge : ", message.guild.region)
        .addField("Üzerinde Düzenlendi : ", message.guild.createdAt)
        .addField("Katıldığın Tarih :", message.member.joinedAt)
        .addField("Sunucudaki Kişi Sayısı", message.guild.memberCount)
       
        

        return message.channel.send(serverembed);

};
  
  

  
  // emojiyazı
  if(cmd === `${prefix}emojiyazı`){
     
     
     
     if (args.length < 1) return message.reply('Lütfen bir mesaj belirt. **Doğru Kullanım**: ?emojiyazı <mesaj>')
		
	message.channel.send(args.join(' ').split('').map(c => mapping[c] || c).join(' '));

     
     
     
     };
  
  
  
  
  
  
  
     // kick
  if(cmd === `${prefix}kick`){
     
     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Kullanıcı Bulunamadı!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Yetkin yok Değişik");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu Kişi Atılamaz!");
    
    
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Atılan Kişi", `${kUser} ID Numarası : ${kUser.id}`)
    .addField("Atan Kişi :", `<@${message.author.id}> ID Numarası : ${message.author.id}`)
    .addField("Atıldığı Tarih :", message.createdAt)
    .addField("Sebeb :", kReason);


    message.guild.member(kUser).kick(kReason);
    message.channel.send(kickEmbed);

    return;
     
     
     };
     
    // update 
    if(cmd === `${prefix}update`){
      
      message.channel.send("```Özel Mesajlarını Kontrol Et```")
        let yicon = bot.user.displayAvatarURL;
        let Upembed = new Discord.RichEmbed()
        .setDescription("Yeni Güncellemeler :D")
        .setColor("#54ecf9")
        .setThumbnail(yicon)
        .addField("1. s!botinfo", "Komutu geldi")
        .addField("2. s!serverinfo", "Komutu Geldi")
        .addField("3. s!kick ", "Komutu geldi")
        .addField("4. s!ban ", "Komutu geldi")
        .addField("5. s!clear {sayı} ", "Komutu geldi")
        .addField("6. s!ascii {yazı} ", "Komutu geldi")
        .addField("7. s!oylama {yazı} ", "Komutu geldi")
        .addField("8. Reklam Engelleyici", "Eklenmiştir")
        .addField("9. s!ticket", "Komutu Geldi")
        
        return message.author.send(Upembed);
       
       
       
       
       };
    
     

// Bot Bİlgi
    if(cmd === `${prefix}botinfo`){


        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Hakkında")
        .setColor("#54ecf9")
        .setThumbnail(bicon)
        .addField("Bot'un Adı :", bot.user.username)
        .addField("Bot'u Yapan Kişi :", "Bünyamin Öztürk Aka. 《Ⱡ₮》☪ Lanson ☪ ")
        .addField("Bot'un Kodlandığı Dil:", "Javascript")
        .addField("Yapıldığı Tarih :", bot.user.createdAt)
        .addField("Bot Kaç Sunucuda Var", bot.guilds.size)
        .addField("Toplam Kullanıcı Sayısı:", bot.users.size)
        .addField("Toplam Kanal Sayısı", bot.channels.size)
        return message.channel.send(botembed);


    };
    

  
  
  // ascii
    if(cmd === `${prefix}ascii`){

     
        ascii.font(args.join(' '), 'Doom', function(rendered){

            rendered = rendered.trimRight();

            if (rendered.length > 2000) return message.channel.send('Maalesef Mesajınız Çok Uzun');

            message.channel.send(rendered, {

                code: 'md'


            });


        });
     };


  
  
  // oylama
     if(cmd === `${prefix}oylama`){

        
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Oylama Başlatmak için Administratör Yetkiniz Olması Lazım');
        if(!args[0]) return message.channel.send('Kullanımı : s!oylama {Oylama Sorusu}');
        
        const oyembed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setFooter('Oy Kullanabilmek için Tepki Ver')
        .setDescription(args.join(' '))
        .setTitle(`Oylamayı Oluşturan: ${message.author.username}`);

        let msg = await message.channel.send(oyembed)
        .then(function (msg) {
            
              msg.react("👎");
              msg.react("👍");
            
            
            }).catch(function(error) {
            console.log(error);
        });



     };
  
  
  
  // sa sea 
     if (message.content.toLowerCase() === 'sa') {

        message.reply("Aleyküm Selam");
       
    };

    if (message.content.toLowerCase() === 'selamun aleyküm') {

        message.reply("Aleyküm Selam"); 
    
    };

    if (message.content.toLowerCase() === 'sea') {

        message.reply("Aleyküm Selam");
      
     

    };
  
  if(message.content.toLowerCase() === 'Sələmın ələykum'){
  
  
  message.reply("Aleyküm Selam");
  
  };
 
    
    

// img
    if (message.content.toLowerCase() === 's!img sonturkbot') {
  
      
      const imgembed = new Discord.RichEmbed()
      .setAuthor("SonTurkBot", "https://cdn.glitch.com/489e92d6-36c6-44be-abe1-1c15537d5407%2Flogo.png?1535593495859")
      .setColor(0x00AE86)
      .setTitle("Resimdeki Hayvan Bir Kar Tilkisi")
       .setImage("https://cdn.glitch.com/489e92d6-36c6-44be-abe1-1c15537d5407%2Flogo.png?1535593495859")
      .setURL("https://cdn.glitch.com/489e92d6-36c6-44be-abe1-1c15537d5407%2Flogo.png?1535593495859")


       
    return message.channel.send(imgembed);
    
    };


// YAz
    if(cmd === `${prefix}yaz`){

      
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Yaz Komutunu Kullanmak İçin YÖNETİCİ İzni lazım');
    const sayMessage = args.join(" ");
   
    message.delete().catch(O_o=>{}); 
  
    message.channel.send(sayMessage);

        
    };


  
  // ping
    if(cmd === `${prefix}ping`){

        const msg = await message.channel.send("Ping?");
         msg.edit(`Pong! Pinginiz ${msg.createdTimestamp - message.createdTimestamp}ms. Benim Pingim ${Math.round(bot.ping)}ms`);
};

    exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
    };

        





// Tİcket
if (cmd === `${prefix}ticket`){
  
   
      message.author.send("Ticket Oluşturuldu");
      message.channel.sendMessage("Ticketiniz İletilmiştir En Yakın Yetkili İletişime Geçecektir");
      
  
    let ticketChannel = message.guild.channels.find(`name`, "staff");
    if(!ticketChannel) return message.channel.send("staff adlı metin Kanalı Bulunamadı!!");
  
    ticketChannel.send("@everyone\nHey! Yetkili Yeni Ticketin Varr!\nTicket Sahibi: " + message.author.username + "\nTicket Sahibinin ID'si: " + ` ${message.author.id}`+ "" );
  

  };
  
// clear
    if(cmd === `${prefix}clear`){
    
    const deleteCount = parseInt(args[0], 10);
    
  
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("2 Ve 100 arası Bi Sayı söylemeniz Lazım");
    
   
    
       message.channel.send(` ${args[0]} Mesaj Silindi.`).then(msg => msg.delete(5000));
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      
      .catch(error => message.reply(`Silinemedi Çünkü : ${error}`));
  }
    
   
  
  // yazıTura
 if(cmd === `${prefix}yazıtura`){
    
    
	var cevap123 = cevaplar123[Math.floor(Math.random() * cevaplar123.length)];
	
	if (cevap123 === "YAZI-TURA:**YAZI**") {
		
		 const embedyazı = new Discord.RichEmbed()
		.setColor(0x00AE86)
		.setDescription(cevap123)
		.setThumbnail("https://cdn.glitch.com/489e92d6-36c6-44be-abe1-1c15537d5407%2FYaz%C4%B1.png?1535851272086")
		message.channel.send(embedyazı);
		
	} else if (cevap123 === "YAZI-TURA:**TURA**") {
		
		const embedtura = new Discord.RichEmbed()
		.setColor(0x00AE86)
		.setDescription(cevap123)
		.setThumbnail("https://cdn.glitch.com/489e92d6-36c6-44be-abe1-1c15537d5407%2FTura.png?1535851271418")
		message.channel.send(embedtura);
		
	}
    
    
    
    };




  // avatar  
if(cmd === `${prefix}avatar`){
  
  
  let aicon = message.author.displayAvatarURL;
  let avembed = new Discord.RichEmbed()
  
 
        .setDescription("AVATARINIZ")
        .setColor("#54ecf9")
        .setImage(aicon)
      
        
        return message.channel.send(avembed);
   
   };

//davet
if(cmd === `${prefix}davet`){
  
  
  
   message.channel.send("```Özel Mesajlarını Kontrol Et```")
        let yicon = bot.user.displayAvatarURL;
        let dembed = new Discord.RichEmbed()
        .setDescription("Davet Linki :D")
        .setColor("#54ecf9")
        .setThumbnail(yicon)
        .addField("https://ko.tc/LcJN", "Davet et Kanks :D");
        
        
  
  
  
  return message.author.send(dembed);
};

  
// 8ball
 if(cmd === `${prefix}8ball`){
 
  
  
  
  const cevaplar = [
    "**Evet**",
    "**Hayır**",
    "**Belki**",
    "**olabilir**",
    "**Daha sonra tekrar sor**",
    "**Imkansız**",
    "**Kesinlikle Hayır**",
    "**Mümkün**",
    "**Bu Soru Beni Çok Aşıyor**"
    
];

 
  
   
    var soru = args.join(' ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

   
   let baembed = new Discord.RichEmbed()
  .setTitle("~8Ball~")
  .setColor("#54ecf9")
  .addField(cevap, "~8Ball~")
   
   
   
    if(!soru) return message.reply('Bir soru belirtmeniz lazım. **Doğru Kullanım**: s!8ball <soru>')
   
    else message.channel.send(baembed)

};  
 
  
  // Öneri
  if(cmd === `${prefix}öneri`){
  
  var öneri = args.slice(0).join(' ');
	
	var channelID = "486482315959205899";
	
	if (!öneri){
		return message.reply("Bir mesaj belirtin! Doğru kullanım: **s!öneri <mesaj>**");
	} else {
		
		var geembed = new Discord.RichEmbed()
			.setTimestamp()
			.addField("Eylem:", "Öneri")
			.addField("Kullanıcı:", message.author.tag)
			.addField("ID", message.author.id)
			.addField("Öneri", öneri)
		
		bot.channels.get(channelID).send(geembed);
		message.channel.send("Öneriniz alınmıştır! Teşekkür ederiz.");
	};


};
  
  
  


  });

  
  
  
  
  







bot.on('guildCreate', guild => {

let rrrsembed = new Discord.RichEmbed()


.setColor("#54ecf9")
.setTitle(":inbox_tray: | Botumuzu Ekledi xD")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
  

        





   bot.channels.get('486104005974687744').send(rrrsembed);
  

   





}); 
       
       
       
       
       
       
bot.on('guildDelete', guild => {

let rrsembed = new Discord.RichEmbed()


.setColor("#54ecf9")
.setTitle(":outbox_tray: | Botumuzu Çıkardı :(")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
  

        





   bot.channels.get('486104005974687744').send(rrsembed);
  

   





}); 
       




bot.login(botconfig.token);