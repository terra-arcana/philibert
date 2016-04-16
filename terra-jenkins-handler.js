const sprintf = require('sprintf-js').sprintf;

const credentials = require('./conf/credentials.json'),
	messages = require('./conf/messages.json');

/**
 * The TerraJenkinsHandler handles every notification sent by the Jenkins server.
 * @param {Express} server The Express server instance
 * @param {DiscordIO} bot A reference to the active DiscordIO bot
 * @class
 */
var TerraJenkinsHandler = function TerraJenkinsHandler(server, bot) {
	this.bot = bot;

	// Method binding

	this.onJobSuccess = this.onJobSuccess.bind(this);
	this.onJobFailure = this.onJobFailure.bind(this);

	// Initialization

	server.use('/jobSuccess', this.onJobSuccess);
	server.use('/jobFailure', this.onJobFailure);
};

/**
 * Handle job success requests
 * @param {Object} req Request data
 * @param {Object} res Response data
 */
TerraJenkinsHandler.prototype.onJobSuccess = function(req, res) {
	var build = {
		id: 420,
		slave: 'Terra Incognita',
		author: 'mevka'
	};

	// TODO: Fetch actual job data

	this.bot.sendMessage({
		to: credentials['target-channel-id'],
		message: sprintf(messages['job-success'],
			build.id,
			build.slave,
			build.author
		)
	});
};

/**
 * Handle job failure requests
 * @param {Object} req Request data
 * @param {Object} res Response data
 */
TerraJenkinsHandler.prototype.onJobFailure = function(req, res) {
	var build = {
		id: 420,
		slave: 'Terra Incognita',
		author: 'mevka'
	};

	// TODO: Fetch actual job data

	this.bot.sendMessage({
		to: credentials['target-channel-id'],
		message: sprintf(messages['job-failure'],
			build.id,
			build.slave,
			build.author
		)
	});
};

module.exports = TerraJenkinsHandler;
