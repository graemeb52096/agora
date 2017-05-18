var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionSchema = new Schema({
	userA: String,
	userB: String
});

var Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
