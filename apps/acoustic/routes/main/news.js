var pug = require('pug');
var moment = require('moment');


module.exports = function(Model) {
	var module = {};


	var News = Model.News;

	module.index = function(req, res, next) {
		News.find().where('status').ne('hidden').sort('-date').exec(function(err, news) {
			if (!news) return next(err);

			res.render('main/news.pug', { news: news });
		});
	};

	module.get_news = function(req, res, next) {
		News.findOne({ '_short_id': req.body.id }).where('status').ne('hidden').sort('-date').exec(function(err, news) {
			if (!news) return next(err);

			var opts = {
				news: news,
				moment: moment,
				compileDebug: false, debug: false, cache: true, pretty: false
			};

			res.send(pug.renderFile(__app_root + '/views/main/_news.pug', opts));
		});
	};

	return module;
};