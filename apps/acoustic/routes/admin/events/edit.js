var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var Event = Model.Event;

	var uploadImagesContentPreview = Params.upload.image_content_preview;
	var uploadImagesContent = Params.upload.image_content;
	var uploadImage = Params.upload.image;


	module.index = function(req, res, next) {
		var id = req.params.event_id;

		Event.findById(id).exec(function(err, event) {
			if (err) return next(err);

			uploadImagesContentPreview(event, function(err, event) {
				if (err) return next(err);

				res.render('admin/events/edit.pug', { event: event });
			});
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

			async.series([
				async.apply(uploadImage, event, 'events', 'cover', 800, files.cover && files.cover[0], post.cover_del),
				async.apply(uploadImagesContent, event, post, 'events'),
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