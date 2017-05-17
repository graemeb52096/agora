var Trending = function(req, res, next){
	//TODO Create trending algo(for all posts)
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
