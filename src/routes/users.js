'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;

// GET users route
router.get('/', (req, res, next) => {
  // return the currently authenticated user
});

// Create a user
router.post('/', (req, res, next) => {
  let user = new User(req.body);
  user.save((err, user) => {
    // if validation error exists send to user
    if(err) {
      err.status = 400;
      // pass Mongoose validation errors to global error handler
      return next(err);
    } else {
      // set the location header to '/'
      res.location('/');
      // send status created (return no content)
      res.sendStatus(201);
    }
  });
});

module.exports = router;
