var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var writingSchema = new Schema({
	dateCreated: { type: Date, default: Date.now },
	user: String,
	title: String,
	description: String,
	body: String,
});

var Writing = mongoose.model('WritingWork', writingSchema);

module.exports = Writing;
