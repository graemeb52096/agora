var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSchema = new Schema({
	kind: { type:String, required:true },
	size: { type:Number, required:true }
});

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
