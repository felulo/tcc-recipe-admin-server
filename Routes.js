/**
 * Created by felipe.lopes on 10/07/2015.
 */
var express = require('express');
var _ = require('underscore');
var router = express.Router();

var Recipe = require('./Recipe.js');

router.get('/', function (req, res, next) {
  Recipe.find(function (err, recipes) {
    if (err) return next(err);

    res.json(recipes);
  });
});

router.get('/:id', function (req, res, next) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) return next(err);

    res.json(recipe);
  });
});

router.post('/', function(req, res, next) {
  Recipe.create(req.body, function (err, post) {
    if (err) return next(err);

    res.json(post);
  });
});

router.post('/syncronize', function (req, res, next) {
  var stream = Recipe.synchronize()
    , count = 0;

  stream.on('data', function(err, doc){
    count++;
  });
  stream.on('close', function(){
    res.json({message: 'indexed ' + count + ' documents!'});
  });
  stream.on('error', function(err){
    res.json(err);
  });
});

router.put('/:id', function (req, res, next) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) return next(err);
    if (!recipe) return res.send(404);

    _.extend(recipe, req.body);
    recipe.save(function (err) {
      if (err) return next(err);

      res.json(recipe);
    });
  });
});

router.delete('/:id', function (req, res, next) {
  Recipe.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);

    res.json(post);
  });
});

module.exports = router;
