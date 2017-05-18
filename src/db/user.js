var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type:String, required:true, index:{ unique:true } },
	password: { type:String, required:true },
	email: { type:String, required:true, index:{ unique:true } },
	meta: {
		firstName: String,
		lastName: String,
		dob: Date,
		country: String,
		state: String,
		city: String,
		dateCreated: { type: Date, default: Date.now }
	}
});

userSchema.methods.validPassword = function(pass){
	if (this.password = pass){
		return true;
	} else {
		return false;
	};
}

User = mongoose.model('User', userSchema);

module.exports = User;
