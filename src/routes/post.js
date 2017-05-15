var Post = require('../db/post');

module.exports = function(router, isAuthenticated){
	router.route('/post')
	.get(function(req, res){
		Post.find(function(err, post){
			if (err){
				res.json(err);
			};
			res.json(post);
		});
	})
	.post(isAuthenticated(), function(req, res){
		var media = req.files;
		if (media.type == 'image/jpg'){
			//hanlde image upload
		} else if (media.type == 'audio/mp3'){
			//handle audio upload
		} else if (media.type == 'video/mp4'){
			//handle video upload
		} else {
			res.sendStatus(400);
			return;
		};
		var post = new Post(req.body);
		post.save(function(err){
			if (err){
				res.json(err);
			};
			res.json({ status:'success', message:'post was created' });
		});
	});

	router.route('/post/:post_id')
	.get(function(req, res){
		Post.findById(req.params.post_id, function(err, post){
			if (err){
				res.json(err);
			};
			res.json(post);
		});
	})
	.put(isAuthenticated(), function(req, res){
		Post.findByid(req.params.post_id, function(err, post){
			if (err){
				res.json(err);
			};
			post = req.body;
			post.save(function(err){
				if (err){
					res.json(err);
				};
				res.json({ status:'success', message:'post was updated' });
			});
		});
	})
	.delete(isAuthenticated(), function(req, res){
		Post.remove({ _id: req.params.post_id }, function(err, post){
			if (err){
				res.json(err);
			};
			res.json({ status:'success', message:'post was deleted' });
		});
	});
};
