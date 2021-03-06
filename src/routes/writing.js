var Writing = require('../db/writing');

module.exports = function(router, isAuthenticated){
	router.route('/writing')
	.get(function(req, res){
		Writing.find(function(err, writings){
			if (err){
				logger.error(err);
				res.sendStatus(500);
				return;
			};
			res.json(writings);
		});
	})
	.post(isAuthenticated(), function(req, res){
		work = new Writing(req.body);
		work.save(function(err){
			if(err){
				logger.error(err);
				res.sendStatus(500);
				return;
			};
			res.sendStatus(200);
			return;
		});
	});

	router.route('/writing/:writing_id')
	.get(function(req, res){
		Writing.findById(req.params.writing_id, function(err, writing){
			if (err){
				logger.error(err);
				res.sendStatus(500);
				return;
			};
			res.json(writing);
		});
	})
	.put(isAuthenticated(), function(req, res){
		Writing.findById(req.params.writing_id, function(err, writing){
			writing = req.body;
			writing.save(function(err){
				if (err){
					logger.error(err);
					res.sendStatus(500);
					return;
				};
				if (!writing){
					res.sendStatus(404);
				}
				res.sendStatus(200);
				return;
			});
		});
	})
	.delete(isAuthenticated(), function(req, res){
		Writing.remove({ _id:req.params.writing_id }, function(err, writing){
			if (err){
				logger.error(err);
				res.sendStatus(500);
				return;
			};
			res.sendStatus(200);
			return;
		});
	});
};
