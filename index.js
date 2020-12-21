const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.once('ready', () => {
	console.log('Ready!');
});


//commands

bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		bot.commands.get('ping').execute(message, args);
	}

  if (command === 'pog') {
    bot.commands.get('pog').execute(message, args);
  } else if (command === 'bot-info') {
		bot.commands.get('bot-info').execute(message, args);
	} else if (command === 'help') {
		bot.commands.get('help').execute(message, args);
	} else if (command === 'burn') {
		bot.commands.get('burn').execute(message, args);
	} else if (command === 'mimu-missile') {
		bot.commands.get('mimu-missile').execute(message, args);
	}
});

//bot.login

bot.login(token);
