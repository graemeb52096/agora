var Like = require('../db/like');
var Post = require('../db/post');

module.exports = function(router, isAuthenticated, isOwner){
	router.route('/like')
	.get(function(req, res){

	})
	.post(isAuthenticated(), function(req, res){
		Post.findById(req.body.post_id, function(err, post){
			if (err){
				//TODO log error with logger
				console.log(err);
				res.sendStatus(500);
				return;
			};
			var like = new Like({
				user:req.user.username,
				post:req.body.post_id
			});
			post.meta.likes.push(like);
			post.save(function(err){
				if (err){
					//TODO use a logger to log error
					console.log(err);
					res.sendStatus(500);
					return;
				};
				like.save(function(err){
					if (err){
						//TODO use a logger to log error
						console.log(err);
						res.sendStatus(500);
						return;
					};
					res.sendStatus(200);
					return;
				});
			});
		});
	});

	router.route('/like/category/:category')
	.get(function(req, res){
		//TODO get likes by "tag"
		//This will be useful when
		//analyzing what 'things'
		//are popular on the site
	});

	router.route('/like/:like_id')
	.get(function(req, res){
		//TODO get like by id
	})

	//TODO add is owner middleware when complete
	.delete(isAuthenticated(), isOwner(), function(req, res){
		//TODO delete like
	});
};
