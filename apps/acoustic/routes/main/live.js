var pug = require('pug');
var moment = require('moment');


module.exports = function(Model) {
	var module = {};


	var Event = Model.Event;

	module.index = function(req, res, next) {
		Event.find().where('status').ne('hidden').sort('-date').exec(function(err, events) {
			if (!events) return next(err);

			res.render('main/live.pug', { events: events });
		});
	};

	module.event = function(req, res, next) {
		Event.find().where('status').ne('hidden').sort('-date').exec(function(err, events) {
			Event.findOne({ '_short_id': req.params.id }).where('status').ne('hidden').sort('-date').exec(function(err, event) {
				if (!event || !events) return next(err);

				res.render('main/live.pug', { events: events, content: event, moment: moment });
			});
		});
	}

	module.get_event = function(req, res, next) {
		Event.findOne({ '_short_id': req.body.id }).where('status').ne('hidden').sort('-date').exec(function(err, event) {
			if (!event) return next(err);

			var opts = {
				content: event,
				moment: moment,
				compileDebug: false, debug: false, cache: true, pretty: false
			};

			res.send(pug.renderFile(__app_root + '/views/main/_content.pug', opts));
		});
	};

	return module;
};