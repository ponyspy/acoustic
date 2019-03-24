var rimraf = require('rimraf');
var async = require('async');

module.exports = function(Model) {
	var module = {};

	var News = Model.News;


	module.index = function(req, res, next) {
		var id = req.body.id;

		async.parallel([
			function(callback) {
				News.findByIdAndRemove(id).exec(callback);
			},
			function(callback) {
				rimraf(__glob_root + '/public/cdn/' + __app_name + '/images/news/' + id, { glob: false }, callback);
			},
		], function(err, results) {
			if (err) return next(err);

			res.send('ok');
		});
	};


	return module;
};