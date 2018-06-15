'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const indexRouter = require('./routes.js');

// set the port
app.set('port', process.env.PORT || 5000);

// use morgan for http request logging
app.use(morgan('dev'));

// setup the static route to serve files from the "public" folder
app.use('/', express.static('public'));

// create a Mongoose connection to MongoDB database
mongoose.connect('mongodb://localhost:27017/course-rating');

const db = mongoose.connection;

db.on("error", err => {
  console.error("connection error:", err);
});

db.once("open", () => {
  console.log('database connection succesful');
  setTimeout( function() {
    db.close();
  }, 3000);

});

// router
app.use('/', indexRouter);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
