import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import * as db from "quick.db";
import { IBotCommand } from "./api";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

client.on('guildMemberAdd', member => {
  //const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  //if (!channel) return;
  //channel.send(`Welcome to the server, ${member}`);
  if (isNull(db.get(member.id))) {

    db.set(member.id, { money: 50, items: [] })
  }
});

client.on("ready", () => {
  console.log(`${client.user.tag} is ready Guilds: ${client.guilds.size} ID: <@497179269688983553>`);
  client.user.setActivity(`🅱️${client.guilds.size} servers`, { type: 'WATCHING' })
  let allUsers = client.users.array();
  for (let i = 0; i < allUsers.length; i++) {
  if (isNull(db.get(allUsers[i].id))) {

      db.set(allUsers[i].id/*, { money: 50, items: []}*/)
      }
      }
  client.user.setStatus('online')
});

async function handleCommand(msg: Discord.Message) {
  let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, '');

  let args = msg.content.split(' ').slice(1)

  for (const commandClass of commands) {

    try {

      if (!commandClass.isThisCommand(command)) {

        continue;
      }

      await commandClass.runCommand(args, msg, client);
    }
    catch (expection) {
      console.log(expection)
    }
  }
}

function loadCommands(commandsPath: string) {
  if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

  for (const commandName of ConfigFile.config.commands as string[]) {

    const commandsClass = require(`${commandsPath}/${commandName}`).default;

    const command = new commandsClass() as IBotCommand;

    commands.push(command);
  }
};

client.login(ConfigFile.config.token);