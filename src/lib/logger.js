var fs = require('fs');
var path = require('path');
var date = require('date-and-time');

function Logger(dir, debug=false) {
	//1: weak
	//2: normal
	//3: strong
	this.debug = debug;
	this.dir = dir;
};

Logger.prototype.entry = function(message, file, level=2){
	var now = new Date();
	this.date = date.format(now, 'YYYY/MM/DD HH:mm:ss');
	var entry = this.date + ':' + file + ': ' + message + '\n';
	fs.appendFile(path.join(this.dir, file+'.log'), entry, function(err){
		if (err){
			console.log(err);
			next(false);
		};
		if (this.debug){
			console.log(entry);
		};
		return;
	});
};
Logger.prototype.log = function(message, level=2){
	this.entry(message, 'Log', level);
};
Logger.prototype.debug = function(message, level=2){
	this.entry(message, 'Debug', level);
};
Logger.prototype.error = function(message, level=2){
	this.entry(message, 'Error', level=2);
};
Logger.prototype.critical = function(message, level=3){
	this.entry(message, 'Critical', level=2);
};

module.exports = Logger;
