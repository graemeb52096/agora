var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  user: String,
  mediaType: String,
  mediaId: Number,
  title: String,
  description: String,
  comments: [{
    user: String,
    body: String,
    date: { type: Date, default: Date.now }
  }],
  tags: [ String ],
  meta: {
    shares: number,
    upVotes: number
  }
});
