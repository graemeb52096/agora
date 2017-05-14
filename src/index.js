var express = require('express');
var Post = require('./db/post');
var mongoose = require('mongoose');
var app = express();
var router = express.Router();

router.use(function(req, res, next){
    console.log('Request was made.');
    next();
});

router.route('/post')
  .get(function(req, res){
    Post.find(function(err, post){
      if (err){
        res.json(err);
      };
      res.json(post)
    });
  })
  .post(function(req, res){
    console.log('posting to post')
    var post = new Post(req.body);
    post.save(function(err){
      if (err){
        res.json(err);
      };
      res.json({ status: 'success', message: 'post was created' });
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
  .put(function(req, res){
    Post.findByid(req.params.post_id, function(err, post){
      if (err){
        res.json(err);
      };
      post = req.body;
      post.save(function(err){
        if (err){
          res.json(err);
        };
        res.json({ status: 'success', message: 'post was updated' });
      });
    });
  })
  .delete(function(req, res){
    Post.remove({ _id: req.params.post_id }, function(err, post){
      if (err){
        res.json(err);
      };
      res.json({ status: 'success', message: 'post was deleted' });
    });
  });


app.use('', router);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
