module.exports = function(Model) {
	var module = {};


	var Event = Model.Event;

	module.index = function(req, res, next) {
		Event.find().where('status').ne('hidden').sort('-date').exec(function(err, events) {
			if (!events) return next(err);

			res.render('main/live.pug', { events: events });
		});
	};


	return module;
};