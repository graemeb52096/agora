var Resource = require('../db/resource');
var fs = require('fs');
var path = require('path');

var MAXIMAGESIZE = 6000000;
var MAXAUDIOSIZE = 12000000;
var MAXVIDEOSIZE = 24000000;

module.exports = function(req, res, media, next){
	if (!media){
		res.sendStatus(400);
		return;
	};
	var file = new Resource();
	file.size = media.size;
	var contentType = media.headers['content-type'];
	if (contentType == 'image/jpeg'){
		if (file.size > MAXIMAGESIZE){
			res.sendStatus(413);
			return;
		};
		var filePath = '../uploads/images/';
		file.kind = 'img';
	} else if (contentType == 'audio/mp3'){
		if (file.size > MAXAUDIOSIZE){
			res.sendStatus(413);
			return;
		};
		var filePath = '../uploads/audio/';
		file.kind = 'aud';
	} else if (contentType == 'video/mp4'){
		if (file.size > MAXVIDEOSIZE){
			res.sendStatus(413);
			return;
		};
		var filePath = '../uploads/video/';
		file.kind = 'vid';
	} else {
		res.sendStatus(415);
		return;
	};
	fs.readFile(media.path, function(err, data){
		if (err){
			//TODO use a logger to log error
			console.log(err);
			res.sendStatus(500);
			return;
		} else {
			file.save(function(err, resource){
				if (err){
					//TODO use a logger to log error
					console.log(err);
					res.sendStatus(500);
					return;
				};
				filePath = filePath + (resource.id);
				fs.writeFile(path.join(__dirname, filePath+file.kind), data, function(err){
					if (err){
						//TODO use a logger to log error
						console.log(err);
						res.sendStatus(500);
						return;
					};
				});
				var resourceUrl = '/resource/' + file.kind + '/' + resource.id;
				next(resourceUrl);
			});
		};
	});
};
