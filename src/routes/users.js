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
  console.log(req.body);
  let user = new User(req.body);
  user.save((err, user) => {
    // if validation errors exist send to user
    if(err) {
      err.status = 400;
      // handles error for non-unique email
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new Error('Email must be unique'));
      } else {
        // pass errors to global handler
        return next(err);
      }
    } else {
      // set the location header to '/'
      res.location('/');
      res.sendStatus('201');
    }
  });
});

module.exports = router;
