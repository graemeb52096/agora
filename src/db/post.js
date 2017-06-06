var date = require('date-and-time');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  user: String,
  mediaType: String,
  mediaUrl: String,
  title: String,
  description: String,
  comments: [{
    user: String,
    body: String,
    date: { type:Date, default:Date.now }
  }],
  tags: [ String ],
  meta: {
    shares: Number,
    likes: [
      {
        user: { type:String, required:true },
      	meta: {
      		dateCreated: { type:Date, default:Date.now },
      	}
      }
    ],
    forSale: { type:Boolean, default:false },
    dateCreated: { type:Date, default:Date.now }
  }
});

postSchema.methods.calculateTrendValue = function(){
  //plot x, y graph using date, likes
  var now = new Date();
};

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
