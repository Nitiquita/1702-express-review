var express = require('express');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var path = require('path');

// our router
var puppiesRouter = require('./puppiesRouter');

// instantiate an instance of an express server
var app = express();

// Logging and body parsing middleware does not have a path argument
// but just a callback function. If the first argument to an app.use call
// is a callback, it always matches that middleware on every request.

// logging middleware - written by Fullstack's own Gabriel Lebec!
app.use(volleyball);
// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve static files like images, css, html, etc
// any get request that matches a particular file in the /public folder
// can be found and sent back
// for example - GET request to
// localhost:3000/large.jpg' will send back a puppy image
app.use(express.static(path.join(__dirname, 'public')));

// router to serve up puppies from the server
app.use('/puppies', puppiesRouter);

// all routes will eventually hit this by default if response is not sent
// or if it doesn't hit a route
app.use('*', function(req, res, next) {
  res.send('this is my default route');
});

// We aren't doing any specific error handling, just letting express do it itself with it's default
// See https://expressjs.com/en/guide/error-handling.html 'The Default Error Handler'

// actually start the server
var server = app.listen(3000, function() {
  // this is an async callback, so the server.address().port is available
  // and set synchronously by the time we get into this callback function - fancy!
  console.log('listening on port', server.address().port);
});
