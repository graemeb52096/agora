var Post = require('../db/post');
var Upload = require('../lib/file-upload');

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
		if (!req.files){
			res.json({ 'message':'no file provided' });
		};
		var media = req.files.media[0];
		Upload(req, res, media, function(resourceUrl){
			var post = new Post(req.body);
			post.mediaUrl = resourceUrl;
			post.save(function(err){
				if (err){
					res.json(err);
				};
				res.json({ status:'success', message:'post was created' });
			});
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
