var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var News = Model.News;

	var uploadImagesContentPreview = Params.upload.image_content_preview;
	var uploadImagesContent = Params.upload.image_content;
	var uploadImage = Params.upload.image;
	var youtubeId = Params.helpers.youtubeId;
	var vimeoId = Params.helpers.vimeoId;
	var soundcloudId = Params.helpers.soundcloudId;


	module.index = function(req, res, next) {
		var id = req.params.news_id;

		News.findById(id).exec(function(err, news) {
			if (err) return next(err);

			uploadImagesContentPreview(news, function(err, news) {
				if (err) return next(err);

				res.render('admin/news/edit.pug', { news: news });
			});
		});
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;
		var id = req.params.news_id;

		News.findById(id).exec(function(err, news) {
			if (err) return next(err);

			news.status = post.status;
			news.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
			news.title = post.title;
			news.sym = post.sym ? post.sym : undefined;
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
				async.apply(uploadImage, news, 'news', 'cover', 800, files.cover && files.cover[0], post.cover_del),
				async.apply(uploadImagesContent, news, post, 'news'),
			], function(err, results) {
				if (err) return next(err);

				news.save(function(err, news) {
					if (err) return next(err);

					res.redirect('back');
				});
			});
		});
	};


	return module;
};