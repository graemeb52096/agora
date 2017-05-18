var Connection = require('../db/connection');

module.exports = function(req, res, next){
	var friends = [];
	Connection.find({ user:req.user.username }, function(err, conections){
		if (err){
		 //TODO use logger to log error
		 console.log(err);
		 res.sendStatus(500);
		 return;
		};
		for (var i=0; i < connections.length; i++){
			var friend = connections[i].connection;
			friends.push(friend);
		};
	});
	Connection.find({ connection:req.user.username }, function(err, conections){
		if (err){
			//TODO use logger to log error
			console.log(err);
			res.sendStatus(500);
			return;
		}
		for (var i=0; i < connections.length; i++){
			var friend = connections[i].user;
			friends.push(friend);
		};
	});
	next(friends);
}
