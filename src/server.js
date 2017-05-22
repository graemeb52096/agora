var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var router = express.Router();

var Logger = require('./lib/logger');
var logger = new Logger('./logs/', debug=true);

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
router.use(function(req, res, next) {
  logger.info(req.method + ' request was made at: ' + req.originalUrl);
  next();
});

/** Set up local strategy **/
passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        logger.error(err);
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
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //TODO: Perform actual lookup of user
  done(null, user);
});

/** MIDDLEWARE **/
function isAuthenticated(req, res, next){
  return function(req, res, next) {
    if (req.user) {
      next();
    } else {
      next();
      //res.sendStatus(401);
    };
  };
};
//Checks if user is owner of resource
function isOwner(item, username){
  if (item.user == username){
    return true
  };
  return false;
  next();
};

var multiparty = require('multiparty');
function parseForm(req, res, next){
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files){
    req.body = (fields);
    req.files = (files);
    next();
  });
};

/** Add resources to app **/
app.use(parseForm);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

/** ENDPOINTS **/
router.route('/login').post(isAuthenticated(), function(req, res){
  console.log('login corrrect')
  res.sendStatus(200);
});
router.route('/logout').get(function(req, res){
  req.logout;
  res.sendStatus(200);
});

require('./routes/user')(router, isAuthenticated, logger);
require('./routes/post')(router, isAuthenticated, logger);
require('./routes/writing')(router, isAuthenticated, logger);
require('./routes/resource')(router, logger);
require('./routes/comment')(router, isAuthenticated, logger);
require('./routes/feed')(router, isAuthenticated, logger);

/** Add routes from router to app **/
app.use('/api', router);
/** Spin app **/
app.listen(config.PORT, function () {
    console.log('Agora listening on port 3000!');
});
