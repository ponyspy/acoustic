module.exports = function(Model) {
	var module = {};


	var News = Model.News;

	module.index = function(req, res, next) {
		News.find().where('status').ne('hidden').sort('-date').exec(function(err, news) {
			if (!news) return next(err);

			res.render('main/news.pug', { news: news });
		});
	};


	return module;
};