const http = require('http'),
	express = require('express'),
	DiscordClient = require('discord.io');

const config = require('./config.json');

/** EXPRESS SERVER */

var app = express();

app.get('/', (req, res) => {
	res.render('home.ejs');
});

app.use((req, res, next) => {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page not found');
});

/** DISCORD CLIENT */

var bot = new DiscordClient({
	token: config.token,
	autorun: true
});

bot.on('ready', () => {
	bot.connect();
	bot.sendMessage({
		to: config['dev-channel-id'],
		message: 'OYEZ, OYEZ! (Philibert s\'est connecté à Discord)'
	});
	console.log(bot.username + '(' + bot.id + ') logged in successfully');
});

/** HTTP SERVER */

var httpServer = app.listen(8080, () => {
	console.log('Philibert now running at 127.0.0.1:8080');
});

httpServer.on('close', () => {
	console.log('Sending message');
	bot.sendMessage({
		to: config['dev-channel-id'],
		message: 'À la revoyure! (Philibert s\'est déconnecté de Discord)'
	});
	console.log('Disconnecting...');
	bot.disconnect();
	console.log(bot.username + '(' + bot.id + ') logged out successfully');
});

process.on('SIGINT', () => {
	console.log('Closing server');
	httpServer.close();
});
