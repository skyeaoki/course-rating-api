'use strict';
const express = require('express');
const router = express.Router();

// GET users route
router.get('/api/users', (req, res, next) => {
  // return the currently authenticated user
});

router.post('/api/users', (req, res, next) => {
  // create a user
  // set the location header to '/'
  // return no content
  // use the next function to pass Mongoose validation errors to global error handler
  // send Mongoose validation error with 400 status code to user
});

router.get('/api/courses', (req, res, next) => {
  // return the Course '_id' and 'title' properties
});

router.get('/api/courses/:courseId', (req, res, next) => {
  // return all Course properties and related documents for the provided course ID
  // when returning a single course, use Mongoose population to load the related user and reviews documents
});

router.post('/api/courses/', (req, res, next) => {
  // create a course
  // set the header location
  // return no content
  // use the next function to pass Mongoose validation errors to global error handler
  // send Mongoose validation error with 400 status code to user
});

router.put('/api/courses/:courseId', (req, res, next) => {
  // update a course and return no content
  // use the next function to pass Mongoose validation errors to global error handler
  // send Mongoose validation error with 400 status code to user
});

router.post('/api/courses/:courseId/reviews', (req, res, next) => {
  // create a review for the specified course ID
  // set the location header to the related course
  // return no content
  // use the next function to pass Mongoose validation errors to global error handler
  // send Mongoose validation error with 400 status code to user
});

module.exports = router;
