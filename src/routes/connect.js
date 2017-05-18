var Connection = require('../db/connection');

module.exports = function(router, isAuthenticated){
	router.route('/connect')
	.post(isAuthenticated(), function(req, res){
		connection = new Connection({
			user: req.user.username,
			connection: req.body.connection
		});
		connection.save(function(err){
			if (err){
				//TODO use a logger to log error
				console.log(err);
				res.sendStatus(500);
				return;
			};
			res.sendStatus(200);
			return;
		});
	});

	router.route('/connection/:connection_id')
	//This route is when a connection request is verified
	.post(isAuthenticated(), function(req, res){
		var connection = Connection.findById(req.params.connection_id);
		var authorized = false;
		if(req.user.username == connection.connection) {
			authorized = true;
		};
		if (authorized){
			connection.meta.verified = true;
			connection.save(funcion(err){
				if (err){
					//TODO use a logger to log error
					console.log(err);
					res.sendStatus(500);
					return;
				};
				res.sendStatus(200);
				return;
			});
		} else {
			res.sendStatus(401);
			return;
		}
	})
	.delete(isAuthenticated(), function(req, res){
		var connection = Connection.findById(req.params.connection_id);
		var authorized = false;
		if (req.user.username == connection.user ){
			authorized = true;
		} else if(req.user.username == connection.connection ){
			authorized = true;
		};
		if (authorized){
			Connection.remove({ _id:req.params.connection_id }, function(err){
				if (err){
					//TODO use a logger to log error
					console.log(err);
					res.sendStatus(500);
					return;
				};
				res.sendStatus(200);
				return;
			});
		} else {
			res.sendStatus(401);
			return;
		};
	});
};
