var Resource = require('../db/resource');
var path = require('path');

module.exports = function(router){
	router.route('/resource/:kind/:id')
	.get(function(req, res){
		Resource.findById(req.params.id, function(err, resource){
			if (err){
				res.json(err);
			} else {
				if (req.params.kind == 'img'){
					var filePath = '../uploads/images/';
					filePath += req.params.id;
					filePath += '.jpg';
				} else if(req.params.kind == 'aud'){
					var filePath = '../uploads/audio/';
					filePath += req.params.id;
					filePath += '.mp3';
				} else if(req.params.kind == 'vid'){
					var filePath = '../uploads/video/';
					filePath += req.params.id;
					filePath += '.mp4';
				} else {
					res.sendStatus(400);
					return;
				};
				res.sendFile(path.join(__dirname, filePath), function(err){
					if(err){
						res.json(err);
					};
				});
			};
		});
	});
};
