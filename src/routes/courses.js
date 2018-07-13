'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;

// test model validation
router.get('/test', (req, res, next) => {
  const jeff = new Course({
    title: "Example Title",
    description: "example description",
    estimatedTime: "example time estimate",
    materialsNeeded: "example materials",
    steps: [{
      stepNumber: 1,
      title: "example step title",
      description: "example step description"
    }]
  });
  jeff.save( err => {
    if(err) {
      console.log(err);
    } else {
      console.log("course saved succesfully");
    }
  });
});

// GET all courses
router.get('/', (req, res, next) => {
  // return the Course '_id' and 'title' properties
});

// GET specific course(s)
router.get('/:courseId', (req, res, next) => {
  // return all Course properties and related documents for the provided course ID
  // when returning a single course, use Mongoose population to load the related user and reviews documents
});

// Create a course
router.post('/', (req, res, next) => {
  // create a course
  // set the header location
  // return no content
  // use the next function to pass Mongoose validation errors to global error handler
  // send Mongoose validation error with 400 status code to user
});

// Update a course
router.put('/:courseId', (req, res, next) => {
  // update a course and return no content
  // use the next function to pass Mongoose validation errors to global error handler
  // send Mongoose validation error with 400 status code to user
});

// Create a review
router.post('/:courseId/reviews', (req, res, next) => {
  // create a review for the specified course ID
  // set the location header to the related course
  // return no content
  // use the next function to pass Mongoose validation errors to global error handler
  // send Mongoose validation error with 400 status code to user
});

module.exports = router;
