var feed = require('../lib/feed');

module.exports = function(router){
	router.route('/feed/:page')
	.get(function(req, res){
		feed(req, res, function(posts){
			res.json(posts);
		});
	});
};
