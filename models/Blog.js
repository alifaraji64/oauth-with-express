const mongoose = require('mongoose');
const schema = mongoose.Schema;
const BlogSchema = new schema({
	title: {
		required: true,
		type: String,
	},
	condition: {
		required: true,
		type: String,
	},
	blog: {
		required: true,
		type: String,
	},
	googleId: {
		required: true,
		type: String,
	},
	thumbnail: {
		required: true,
		type: String,
	},
});

module.exports = mongoose.model('blogs', BlogSchema);
