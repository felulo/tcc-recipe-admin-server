/**
 * Created by felipe.lopes on 10/07/2015.
 */
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var recipesRoutes = require('./Routes.js');

mongoose.connect('mongodb://felulo:felipelopes93@ds045054.mongolab.com:45054/heroku_kt8lvwn6', function (err) {

  if (err)
    console.log('connection error: ', err);
  else
    console.log('connection successful');

});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method == 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  next();
});

app.get('/ping', function (req, res, next) {
  console.log(req.body);
  res.send('pong');
});

app.use('/recipes', recipesRoutes);

app.listen(process.env.PORT || 5000, function () {
  console.log('Server listening port ' + process.env.PORT);
});
