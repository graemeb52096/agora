var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var router = express.Router();

/** Mongoose configs/initializer **/
mongoose.connect(config.MONGODB);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + config.MONGODB);
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose connection error: ' + error);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected.');
});

/** This function will capture all requests
and could be useful for analytics **/
router.use(function(req, res, next){
    console.log('Request was made.');
    next();
});

/** Set up local strategy **/
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      };
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      };
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      };
      return done(null, user);
    });
  };
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //TODO: Perform actual lookup of user
  done(null, user);
});

/** MIDDLEWARE **/
function isAuthenticated() {
  return function(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.json({ message:'not logged in' });
    };
  };
};
//Checks if user is owner of resource
function isOwner() {
  return function(req, res, item, next){
    //pass
  };
};

/** Add resources to app **/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

/** ENDPOINTS **/
require('./routes/user')(router, isAuthenticated);
require('./routes/post')(router, isAuthenticated);
require('./routes/writing')(router, isAuthenticated);

/** Add routes from router to app **/
app.use('/api', router);
/** Spin app **/
app.listen(config.PORT, function () {
    console.log('Agora listening on port 3000!');
});
