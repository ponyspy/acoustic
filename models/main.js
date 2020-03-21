var mongoose = require('mongoose'),
		mongooseBcrypt = require('mongoose-bcrypt');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' +  __app_name, {
	useCreateIndex: true,
	useNewUrlParser: true
});


// ------------------------
// *** Schema Block ***
// ------------------------


var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: String,
	date: { type: Date, default: Date.now },
});

var eventSchema = new Schema({
	numb: { type: Number, index: true },
	title: { type: String, trim: true },
	intro: { type: String, trim: true },
	description: { type: String, trim: true },
	cover: String,
	embed: {
		provider: String,
		id: String
	},
	type: String,
	status: String,	// hidden
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now, index: true },
});

var newsSchema = new Schema({
	title: { type: String, trim: true },
	intro: { type: String, trim: true },
	description: { type: String, trim: true },
	cover: String,
	embed: {
		provider: String,
		id: String
	},
	status: String,	// hidden
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now, index: true },
});


// ------------------------
// *** Index Block ***
// ------------------------


eventSchema.index({'title': 'text', 'intro': 'text', 'description': 'text'}, {
	default_language: 'russian', weights: { title: 2, intro: 1, description: 1 }
});

newsSchema.index({'title': 'text', 'intro': 'text', 'description': 'text'}, {
	default_language: 'russian', weights: { title: 2, intro: 1, description: 1 }
});


// ------------------------
// *** Plugins Block ***
// ------------------------


userSchema.plugin(mongooseBcrypt, { fields: ['password'] });


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.News = mongoose.model('News', newsSchema);