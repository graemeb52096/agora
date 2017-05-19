var feed = require('../lib/feed');

module.exports = function(router, isAuthenticated, logger){
	router.route('/feed/:page')
	.get(function(req, res){
		feed(req, res, req.params.page, logger, function(posts){
			res.json(posts);
		});
	});
};
