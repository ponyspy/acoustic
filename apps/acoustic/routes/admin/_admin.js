var express = require('express');
var multer = require('multer');

var upload = multer({ dest: __glob_root + '/uploads/' });

var admin = {
	main: require('./main.js'),
	events: require('./events/_events.js'),
	news: require('./news/_news.js'),
	about: require('./about.js'),
	contacts: require('./contacts.js'),
	users: require('./users/_users.js'),
	options: require('./options.js')
};

var checkAuth = function(req, res, next) {
	req.session.user_id
		? next()
		: res.redirect('/auth');
};

module.exports = (function() {
	var router = express.Router();

	router.route('/').get(checkAuth, admin.main.index);

	router.route('/about')
		.get(checkAuth, admin.about.edit)
		.post(checkAuth, admin.about.edit_form);

	router.route('/contacts')
		.get(checkAuth, admin.contacts.edit)
		.post(checkAuth, admin.contacts.edit_form);

	router.use('/events', checkAuth, upload.fields([ { name: 'cover' } ]), admin.events);
	router.use('/news', checkAuth, upload.fields([ { name: 'cover' } ]), admin.news);
	router.use('/users', checkAuth, admin.users);

	router.post('/preview', checkAuth, upload.single('image'), admin.options.preview);

	return router;
})();