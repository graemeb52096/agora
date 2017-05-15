var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var router = express.Router();

var User = require('./db/user');
var Post = require('./db/post');
var Writing = require('./db/writing');

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

router.use(function(req, res, next){
    console.log('Request was made.');
    next();
});

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
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
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

function isOwner() {
  return function(req, res, item, next){

  }
}

/** URL PARAM HANDLERS **/
app.param('post_id', function(req, res, next, post_id) {
    req.post_id = post_id;
    next();
});

/** ENDPOINTS **/
router.route('/login')
  .post(passport.authenticate('local'), function(req, res){
    res.sendStatus(200);
  });

router.route('/user')
  .get()
  .post(function(req, res){
    var user = new User(req.body);
    user.save(function(err){
      if (err){
        res.json(err);
      }
      res.json({ status:'success', message:'user was created' });
    })
  });

router.route('/post')
  .get(function(req, res){
    Post.find(function(err, post){
      if (err){
        res.json(err);
      };
      res.json(post);
    });
  })
  .post(isAuthenticated(), function(req, res){
    var media = req.files;
    if (media.type == 'image/jpg'){
      //hanlde image upload
    } else if (media.type == 'audio/mp3'){
      //handle audio upload
    } else if (media.type == 'video/mp4'){
      //handle video upload
    } else {
      res.sendStatus(400);
      return;
    }
    var post = new Post(req.body);
    post.save(function(err){
      if (err){
        res.json(err);
      };
      res.json({ status:'success', message:'post was created' });
    });
  });

router.route('/post/:post_id')
  .get(function(req, res){
    Post.findById(req.params.post_id, function(err, post){
      if (err){
        res.json(err);
      };
      res.json(post);
    });
  })
  .put(isAuthenticated(), function(req, res){
    Post.findByid(req.params.post_id, function(err, post){
      if (err){
        res.json(err);
      };
      post = req.body;
      post.save(function(err){
        if (err){
          res.json(err);
        };
        res.json({ status:'success', message:'post was updated' });
      });
    });
  })
  .delete(isAuthenticated(), function(req, res){
    Post.remove({ _id: req.params.post_id }, function(err, post){
      if (err){
        res.json(err);
      };
      res.json({ status:'success', message:'post was deleted' });
    });
  });

router.route('/writing')
  .get(function(req, res){
    Writing.find(function(err, writings){
      if (err){
        res.json(err);
      };
      res.json(writings);
    });
  })
  .post(isAuthenticated(), function(req, res){
    work = new Writing(req.body);
    work.save(function(err){
      if(err){
        res.json(err);
      };
      res.json({ status:'success', message:'work was added' });
    });
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);

app.listen(config.PORT, function () {
    console.log('Agora listening on port 3000!');
});
