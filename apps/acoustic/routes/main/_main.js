var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var main = {
	index: require('./index.js'),
	news: require('./news.js')(Model),
	live: require('./live.js')(Model),
	content: require('./content.js'),
	options: require('./options.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(main.index.index);

	router.route('/live')
		.get(main.live.index);

	router.route('/news')
		.get(main.news.index);

	router.route('/contacts')
		.get(main.content.contacts);

	router.route('/about')
		.get(main.content.about);

	return router;
})();