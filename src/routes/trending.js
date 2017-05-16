var trends = require('../lib/trending');

module.exports = fuction(router){
	router.route('/trend/:page')
	.get(function(req, res){
		trends.trending(req, res, function(posts){
			res.json(posts);
		});
	});
	router.route('/trend/:category/:page')
	.get(function(req, res){
		trends(req, res, function(posts){
			res.json(posts);
		});
	});
}
