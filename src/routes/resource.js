var Resource = require('../db/resource');

module.exports = function(router){
	router.route('/resource/:kind/:id')
	.get(function(req, res){
		Resource.findById(req.params.id, function(err, resource){
			if (err){
				res.json(err);
			} else {
				if (req.kind == 'img'){
					var filePath = '../uploads/iamges/' + req.params.id;
				} else if(req.kind == 'aud'){
					var filePath = '../uploads/audio/' + req.params.id;
				} else if(req.kind == 'vid'){
					var filePath = '../uploads/video/' + req.params.id;
				} else {
					res.sendStatus(400);
					return;
				};
				res.sendFile(path.join(__dirname, filePath));
				return;
			};
		});
	});
};
