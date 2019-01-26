module.exports = function(Model) {
	var module = {};

	var Event = Model.Event;
	var News = Model.News;

	module.index = function(req, res, next) {
		Event.find().where('status').ne('hidden').sort('-date').exec(function(err, events) {
			if (!events) return next(err);

			News.find().where('status').ne('hidden').sort('-date').exec(function(err, news) {
				if (!events) return next(err);

				res.render('main/index.pug', { events: events, news: news });
			});
		});
	};

	return module;
};