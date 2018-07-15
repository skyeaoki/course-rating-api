'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;

// GET all courses
router.get('/', (req, res, next) => {
  // find all courses
  Course.find({}, (err, courses) => {
    let allCourses = courses.map( course => {
      // if only one course exists, load its related user and reviews documents
      if(courses.length === 1) {
        return {_id: course._id, title: course.title, user:course.user, reviews: course.reviews};
      } else {
        // otherwise return just the course '_id' and 'title' properties
        return { _id: course._id, title: course.title };
      }
    });
    // send the courses to the user
    res.json(allCourses);
    // if error then pass to global error handler
    if(err) return next(err);
  });
});

// GET specific course(s)
router.get('/:courseId', (req, res, next) => {
  // return all Course properties and related documents for the provided course ID
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
