var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var writingSchema = new Schema({
	dateCreated: { type: Date, default: Date.now },
	user: String,
	title: String,
	description: String,
	body: String,
	meta: {
		index: true
	}
});

writingSchema.set('autoIndex', false);

module.exports = {
	writingSchema: writingSchema
}
