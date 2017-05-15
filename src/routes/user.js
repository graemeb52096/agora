var User = require('../db/user');

module.exports = function(router, isAuthenticated){
	router.route('/user')
	.get(function(req, res){
		User.find(function(err, users){
			if (err){
				res.json(err);
			};
			res.json(users);
		});
	})
	.post(function(req, res){
		var user = new User(req.body);
		user.save(function(err){
			if (err){
				res.json(err);
			};
			res.json({ status:'success', message:'user was created' });
		});
	});

	router.route('/user/:uid')
	.get(function(req, res){
		User.findOne({'_id': req.uid}, function(err, usr){
			if(err){
				res.json(err);
			} else if(!usr){
				res.sendStatus(404);
			} else {
				res.json(usr);
			};
		});
	})
	.put(isAuthenticated(), function(req, res){
		User.findByIdAndUpdate(req.uid, req.body, function(err, usr){
			if(err){
				res.json(err);
			} else if(!usr){
				res.sendStatus(404);
			} else{
				res.json(usr);
			};
		});
	})
	.delete(isAuthenticated(), function(req, res){
		User.findByIdAndRemove(req.uid, function(err, usr){
			if(err){
				res.json(err);
			} else if(!usr){
				res.sendStatus(404);
			} else{
				res.sendStatus(200);
			};
		});
	});
};
