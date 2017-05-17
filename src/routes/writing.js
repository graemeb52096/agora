var Writing = require('../db/writing');

module.exports = function(router, isAuthenticated){
	router.route('/writing')
	.get(function(req, res){
		Writing.find(function(err, writings){
			if (err){
				res.json(err);
			};
			res.json(writings);
		});
	})
	.post(isAuthenticated(), function(req, res){
		work = new Writing(req.body);
		work.save(function(err){
			if(err){
				res.json(err);
			};
			res.json({ status:'success', message:'work was added' });
		});
	});

	router.route('/writing/:writing_id')
	.get(function(req, res){
		Writing.findById(req.params.writing_id, function(err, writing){
			if (err){
				res.json(err);
			};
			res.json(writing);
		});
	})
	.put(isAuthenticated(), function(req, res){
		Writing.findById(req.params.writing_id, function(err, writing){
			writing = req.body;
			writing.save(function(err){
				if (err){
					res.json(err);
				};
				res.json({ message:'Writing was updated' });
			});
		});
	})
	.delete(isAuthenticated(), function(req, res){
		Writing.remove({ _id:req.params.writing_id }, function(err, writing){
			if (err){
				res.json(err);
			};
			res.json({ message:'Writing was deleted' });
		});
	});
};
