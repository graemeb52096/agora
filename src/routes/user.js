var User = require('../db/user');

module.exports = function(router, isAuthenticated, logger){
	router.route('/user')
	.get(function(req, res){
		User.find(function(err, users){
			if (err){
				logger.error(err);
				res.sendStatus(500);
				return;
			};
			res.json(users);
		});
	})
	.post(function(req, res){
		var user = new User(req.body);
		user.save(function(err){
			if (err){
				logger.error(err);
				res.sendStatus(500);
				return;
			};
			res.sendStatus(200);
			return;
		});
	});

	router.route('/user/:uid')
	.get(function(req, res){
		User.findOne({'_id': req.uid}, function(err, usr){
			if(err){
				logger.error(err);
				res.sendStatus(500);
				return;
			} else if(!usr){
				res.sendStatus(404);
				return;
			} else {
				res.json(usr);
			};
		});
	})
	.put(isAuthenticated(), function(req, res){
		User.findByIdAndUpdate(req.uid, req.body, function(err, usr){
			if(err){
				logger.error(err);
				res.sendStatus(500);
				return;
			} else if(!usr){
				res.sendStatus(404);
				return;
			} else{
				res.json(usr);
			};
		});
	})
	.delete(isAuthenticated(), function(req, res){
		User.findByIdAndRemove(req.uid, function(err, usr){
			if(err){
				logger.error(err);
				res.sendStatus(500);
				return;
			} else if(!usr){
				res.sendStatus(404);
				return;
			} else{
				res.sendStatus(200);
				return;
			};
		});
	});
};
