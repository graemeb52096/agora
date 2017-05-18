var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionSchema = new Schema({
	user: String,
	connection: String,
	meta: {
		verified: { type:Boolean, default:false },
		date: { type:Date, default:Date.now }
	}
});

var Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
