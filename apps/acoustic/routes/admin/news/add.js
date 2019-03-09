var shortid = require('shortid');
var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var News = Model.News;

	var uploadImagesContent = Params.upload.image_content;
	var uploadImage = Params.upload.image;
	var youtubeId = Params.helpers.youtubeId;
	var vimeoId = Params.helpers.vimeoId;
	var soundcloudId = Params.helpers.soundcloudId;

	module.index = function(req, res, next) {
			res.render('admin/news/add.pug');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;

		var news = new News();

		news._short_id = shortid.generate();
		news.status = post.status;
		news.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		news.title = post.title;
		news.intro = post.intro;
		news.description = post.description;

		if (youtubeId(post.embed)) {
			news.embed = {
				provider: 'youtube',
				id: youtubeId(post.embed)
			}
		} else if (vimeoId(post.embed)) {
			news.embed = {
				provider: 'vimeo',
				id: vimeoId(post.embed)
			}
		} else if (soundcloudId(post.embed)) {
			news.embed = {
				provider: 'soundcloud',
				id: soundcloudId(post.embed)
			}
		} else {
			news.embed = undefined;
		}

		async.series([
			async.apply(uploadImage, news, 'news', 'cover', 800, files.cover && files.cover[0], null),
			async.apply(uploadImagesContent, news, post, 'news'),
		], function(err, results) {
			if (err) return next(err);

			news.save(function(err, news) {
				if (err) return next(err);

				res.redirect('/admin/news');
			});
		});
	};


	return module;
};