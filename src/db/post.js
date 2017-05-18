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
    upVotes: Number,
    forSale: { type:Boolean, default:false },
    dateCreated: { type:Date, default:Date.now }
  }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
