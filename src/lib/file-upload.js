var Resource = require('../db/resource');

module.exports = function(req, res, media){
	if (!media){
		res.sendStatus(400);
		return;
	};
	var maxImageSize = 10000;
	var maxAudioSize = 10000;
	var maxVideoSize = 10000;
	var file = new Resource();
	file.size = media.size;
	if (media.type == 'image/jpg'){
		if (file.size > maxImageSize){
			res.sendStatus(413);
			return;
		};
		//handle image upload
		var filePath = '../uploads/images/';
		file.kind = 'img';
	} else if (media.type == 'audio/mp3'){
		if (file.size > maxAudioSize){
			res.sendStatus(413);
			return;
		};
		//handle audio upload
		var filePath = '../uploads/audio/';
		file.kind = 'aud';
	} else if (media.type == 'video/mp4'){
		if (file.size > maxVideoSize){
			res.sendStatus(413);
			return;
		};
		//handle video upload
		var filePath = '../uploads/video/';
		file.kind = 'vid';
	} else {
		res.sendStatus(415);
		return;
	};
	fs.readFile(media.file.path, function(err, data){
		if (err){
			res.sendStatus(400);
			return;
		} else {
			fs.writeFile(filePath, data, function(err){
				if (err){
					res.sendStatus(400);
					return;
				};
				file.save(function(err, resource){
					if (err){
						res.json(err);
					};
					filePath = filePath + (resource.id);
					return filePath;
				});
			});
		};
	});
};
