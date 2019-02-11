var fs = require('fs');

exports.edit = function(req, res) {
	fs.readFile(__app_root + '/static/contacts.html', function(err, content) {
		res.render('admin/contacts.pug', { content: content });
	});
};

exports.edit_form = function(req, res) {
	var post = req.body;

	fs.writeFile(__app_root + '/static/contacts.html', post.content, function(err) {
		res.redirect('back');
	});
};