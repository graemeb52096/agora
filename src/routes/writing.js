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
	.post(isAuthenticated, function(req, res){
		work = new Writing(req.body);
		work.save(function(err){
			if(err){
				res.json(err);
			};
			res.json({ status:'success', message:'work was added' });
		});
	});
};
