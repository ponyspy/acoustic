var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var Event = Model.Event;

	var uploadImage = Params.upload.image;
	var youtubeId = Params.helpers.youtubeId;
	var vimeoId = Params.helpers.vimeoId;
	var soundcloudId = Params.helpers.soundcloudId;


	module.index = function(req, res, next) {
		var id = req.params.event_id;

		Event.findById(id).exec(function(err, event) {
			if (err) return next(err);

			res.render('admin/events/edit.pug', { event: event });
		});
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;
		var id = req.params.event_id;

		Event.findById(id).exec(function(err, event) {
			if (err) return next(err);

			event.status = post.status;
			event.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
			event.title = post.title;
			event.numb = post.numb;
			event.sym = post.sym ? post.sym : undefined;
			event.description = post.description;
			event.description_alt = post.description_alt;
			event.photo_desc = post.photo_desc;

			if (youtubeId(post.embed)) {
				event.embed = {
					provider: 'youtube',
					id: youtubeId(post.embed)
				}
			} else if (vimeoId(post.embed)) {
				event.embed = {
					provider: 'vimeo',
					id: vimeoId(post.embed)
				}
			} else if (soundcloudId(post.embed)) {
				event.embed = {
					provider: 'soundcloud',
					id: soundcloudId(post.embed)
				}
			} else {
				event.embed = undefined;
			}

			async.series([
				async.apply(uploadImage, event, 'events', 'cover', 800, files.cover && files.cover[0], post.cover_del),
				async.apply(uploadImage, event, 'events', 'photo', 800, files.photo && files.photo[0], post.photo_del),
			], function(err, results) {
				if (err) return next(err);

				event.save(function(err, event) {
					if (err) return next(err);

					res.redirect('back');
				});
			});
		});
	};


	return module;
};