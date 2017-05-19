var getFriends = require('./get-friends');
var Post = require('../db/post');

module.exports = function(req, res, page, next){
	//TODO get user specific feed
	getFriends(req, res, function(friends){
		//TODO get 10 most recent posts from each friend for page 0
		// get next 10 most recent posts for page 1 etc...
		console.log(friends);
		var posts = []
		var skipped = req.param.page * 10;
		for (var i=0; i < friends.length; i++){
			Post.find({ user:friends[i] }, null, { sort:{ 'meta.dateCreated':'desc' }, skip:skipped, limit:10 }, function(err, posts){
				if (err){
					//TODO use logger to log error
					console.log(err);
					res.sendStatus(500);
					return;
				};
				for (var j=0; j < posts.length; j++){
					posts.push(posts[j]);
				};
			});
		};
		console.log(posts);
		next(posts);
	});
};
