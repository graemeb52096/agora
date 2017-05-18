var getFriends = require('./get-friends');

module.exports = function(req, res, page, next){
	//TODO get user specific feed
	getFriends(req, res, function(friends){
		//TODO get 10 most recent posts from each friend for page 0
		// get next 10 most recent posts for page 1 etc...
		console.log(friends);
	});
};
