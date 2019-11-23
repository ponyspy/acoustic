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

	router.route('/broadcast')
		.get(main.live.index)
		.post(main.live.get_event);

	router.route('/broadcast/:id')
		.get(main.live.event)

	router.route('/news')
		.get(main.news.index)
		.post(main.news.get_news);

	router.route('/news/:id')
		.get(main.news.news)

	router.route('/contacts')
		.get(main.content.contacts);

	router.route('/about')
		.get(main.content.about);

	router.route('/search')
		.post(main.options.search);

	return router;
})();