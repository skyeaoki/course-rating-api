'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;
const mid = require('../middleware');

// Return the currently authenticated user
router.get('/', mid.authenticateUser, (req, res, next) => {
    res.send(req.body.user);
});

// Create a user
router.post('/', (req, res, next) => {
  let user = new User(req.body);
  user.save((err, user) => {
    // if validation errors exist send to user
    if(err) {
      err.status = 400;
      // handles error for non-unique email
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new Error('Email must be unique'));
      } else {
        // for other errors pass to global error handler
        return next(err);
      }
    } else {
      // set the location header to the root route
      res.location('/');
      res.sendStatus('201');
    }
  });
});

module.exports = router;
