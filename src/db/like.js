var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema({
	user: { type:String, required:true },
	post: { type:Number, required:true },
	meta: {
		dateCreated: { type:Date, default:Date.now },
	}
});

var Like = mongoose.model('Like', likeSchema);

module.exports = Like;
