const DiscordIO = require('discord.io');

const credentials = require('./conf/credentials.json'),
	messages = require('./conf/messages.json');

/**
 * A TerraDiscordBot is a wrapper for DiscordIO, able to send messages to the
 * `dev` channel on Terra Arcana's Discord server.
 * @class
 */
var TerraDiscordBot = function TerraDiscordBot() {
	/**
	 * The DiscordIO instance used to communicate with the API
	 * @type {DiscordIO}
	 */
	this.bot = new DiscordIO({
		token: credentials.token,
		autorun: true
	});

	// Method binding

	this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
	this.sendMessage = this.sendMessage.bind(this);

	// Initialization

	this.bot.on('ready', this.login);
};

/**
 * Logs Philibert in to the Discord server.
 * @private
 */
TerraDiscordBot.prototype.login = function() {
	this.bot.connect();
	this.bot.sendMessage({
		to: credentials['target-channel-id'],
		message: messages['logged-in']
	});

	console.log(this.bot.username + '(' + this.bot.id + ') logged in successfully');
};

/**
 * Logs Philibert out of the Discord server.
 * @private
 */
TerraDiscordBot.prototype.logout = function() {
	this.bot.sendMessage({
		to: credentials['target-channel-id'],
		message: messages['logged-out']
	});
	this.bot.disconnect();

	console.log(this.bot.username + '(' + this.bot.id + ') logged out successfully');
};

/**
 * Sends a message to Discord.
 * @param {Object} params
 */
TerraDiscordBot.prototype.sendMessage = function(params) {
	this.bot.sendMessage(params);
};

module.exports = TerraDiscordBot;
