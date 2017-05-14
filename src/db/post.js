var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/agora');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  user: String,
  mediaType: String,
  mediaUrl: String,
  title: String,
  description: String,
  comments: [{
    user: String,
    body: String,
    date: { type: Date, default: Date.now }
  }],
  tags: [ String ],
  meta: {
    shares: Number,
    upVotes: Number
  }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
