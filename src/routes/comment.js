var Post = require('../db/post');

module.exports = function(router, isAuthenticated){
	router.route('/comment')
	.post(isAuthenticated(), function(req, res){
		var post_id = req.body.post_id;
		Post.findById(post_id, function(err, post){
			if (err){
				res.json(err);
			};
			post.comments.push({ user:req.body.commentor,
				body:req.body.comment_body });
			post.save(function(err){
				if (err){
					res.json(err);
				};
				res.json({ message:"Comment has been added" });
			});
		});
	});

	router.route('/comment/:comment_id')
	.put(isAuthenticated(), function(req, res){
		var comment = Post.comment.id(req.params.comment_id);
		//TODO add is owner MIDDLEWARE
		comment.body = req.body.comment_body;
		comment.save(function(err){
			if (err){
				res.json(err);
			};
			res.json({ message:"Comment was updated" });
		});
	})
	.delete(isAuthenticated(), function(req, res){
		var comment = Post.comment.id(req.params.comment_id);
		//TODO add is owner MIDDLEWARE
		Post.comment.remove({ _id:req.params.comment_id }, function(err){
			if (err){
				res.json(err);
			};
			res.json({ message:"comment deleted" });
		});
	});
};
