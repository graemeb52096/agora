var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSchema = new Schema({
	kind: { type:String, required:true }
	meta: {
		dateCreated: { type:Date, default:Date.now },
		size: { type:Number, required:true },
	}
});

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
