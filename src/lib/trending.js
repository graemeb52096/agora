var Date = require('date-and-time');

var Trending = function(req, res, next){
	//TODO Create trending algo(for all posts)
	//for every post
		//Likes/Hour l(h) = Likes as a function of time
		//Populartiry p(h) = l'(h) = polularity as a function of time
		//Trend t(h) = p'(h) = l"(h) = trend as a function of time
};
var TrendingImages = function(req, res, next){
	//TODO Create trending algo for images
};
var TrendingVideos = function(req, res, next){
	//TODO Create trending algo for videos
};
var TrendingAudio = function(req, res, next){
	//TODO Create trending algo for audio
};
var TrendingSubs = function(req, res, next){
	//TODO Create trending algo for a given 'tag'(stored in req.params.category)
};

module.exports = function(req, res, next){
	if (!req.params.category){
		Trending(req, res, function(posts){
			next(posts);
		})
	} else if(req.params.category == 'img'){
		TrendingAudio(req, res, function(posts){
			next(posts);
		});
	} else if(req.params.category == 'vid'){
		TrendingVideos(req, res, function(posts){
			next(posts);
		});
	} else {
		TrendingSubs(req, res, function(posts){
			next(posts);
		});
	};
}
