module.exports = function(Model) {
	var module = {};

	var Event = Model.Event;
	var News = Model.News;

	module.search = function(req, res, next) {
		Event.find({ $text: { $search: req.body.text } }).where('status').ne('hidden').exec(function(err, events) {
			News.find({ $text: { $search: req.body.text } }).where('status').ne('hidden').exec(function(err, news) {
				var opts = {
					events: events,
					news: news,
					compileDebug: false, debug: false, cache: false, pretty: false
				};

				res.send(pug.renderFile(__app_root + '/views/main/_search.pug', opts));
			});
		});
	};

	return module;
};