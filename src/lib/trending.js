var Trending = function(req, res, next){};
var TrendingImages = function(req, res, next){};
var TrendingVideos = function(req, res, next){};
var TrendingAudio = function(req, res, next){};
var TrendingSubs = function(req, res, next){};

module.exports = function(req, res, next){
	if (req.params.category == 'img'){
		trends.trendingImages(req, res, function(posts){
			next(posts);
		});
	} else if(req.params.category == 'aud'){
		trends.trendingAudio(req, res, function(posts){
			next(posts);
		});
	} else if(req.params.category == 'vid'){
		trends.trendingVideos(req, res, function(posts){
			next(posts);
		});
	} else {
		trends.trendingSubs(req, res, function(posts){
			next(posts);
		});
	};
}
