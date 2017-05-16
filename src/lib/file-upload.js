var Resource = require('../db/resource');
var fs = require('fs');
var path = require('path');

module.exports = function(req, res, media, next){
	if (!media){
		res.sendStatus(400);
		return;
	};
	var maxImageSize = 6000000;
	var maxAudioSize = 6000000;
	var maxVideoSize = 6000000;
	var file = new Resource();
	file.size = media.size;
	contentType = media.headers['content-type'];
	if (contentType == 'image/jpeg'){
		if (file.size > maxImageSize){
			res.sendStatus(413);
			return;
		};
		var filePath = '../uploads/images/';
		file.kind = 'img';
	} else if (contentType == 'audio/mp3'){
		if (file.size > maxAudioSize){
			res.sendStatus(413);
			return;
		};
		var filePath = '../uploads/audio/';
		file.kind = 'aud';
	} else if (contentType == 'video/mp4'){
		if (file.size > maxVideoSize){
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
			res.json(err);
			return;
		} else {
			file.save(function(err, resource){
				if (err){
					res.json(err);
				};
				filePath = filePath + (resource.id);
				fs.writeFile(path.join(__dirname, filePath+file.kind), data, function(err){
					if (err){
						res.json(err);
					};
				});
				console.log('returning file path');
				next(filePath);
			});
		};
	});
};
