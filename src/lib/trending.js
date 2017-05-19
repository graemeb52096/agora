var Date = require('date-and-time');

var Trending = function(req, res, next){
	//TODO Create trending algo(for all posts)
	//get posts from current month
	var now = new Date();
	var month = now.month;
	var year = now.year;
	var startRange = ;
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
