const djs = require("Discord.js")
const db = require("quick.db")
const config = require("./config.json")
const bot = new djs.Client();

bot.on('ready', () => {
  console.log(`Connected`)
  bot.user.setActivity('Last Online: almost 6 months ago', { type: 'STREAMING', url: "https://www.twitch.tv/s1rcheese" })
});

bot.on('message', (msg) => {

})


bot.on('guildMemberAdd', member => {
  (db.get(member.id))
    if (member.id = null) {
        db.set(member.id, { money: 50, charactersCaught: [] });
      }
});

bot.login(config.token)
