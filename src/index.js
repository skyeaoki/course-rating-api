'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const coursesRouter = require('./routes/courses.js');
const usersRouter = require('./routes/users.js');

// set the port
app.set('port', process.env.PORT || 5000);

// use morgan for http request logging
app.use(morgan('dev'));

// use body parser
app.use(bodyParser.json());

// setup the static route to serve files from the "public" folder
app.use('/', express.static('public'));

// create a Mongoose connection to MongoDB database
mongoose.connect('mongodb://localhost:27017/course-api');

const db = mongoose.connection;

db.on('error', err => {
  console.error('connection error:', err);
});

db.once('open', () => {
  console.log('database connection successful');
});

// routers
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);

// send a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
