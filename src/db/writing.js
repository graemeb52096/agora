var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var writingSchema = new Schema({
	user: String,
	title: String,
	description: String,
	body: String,
	meta: {
		dateCreated: { type: Date, default: Date.now }
	}
});

var Writing = mongoose.model('WritingWork', writingSchema);

module.exports = Writing;
