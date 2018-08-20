'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;
const mid = require('../middleware');

// GET all courses
router.get('/', (req, res, next) => {
  // find all courses
  Course.find({}, (err, courses) => {
    // return only the id and title attributes of each course
    let allCourses = courses.map( course => {
      return { _id: course._id, title: course.title };
    });
    // if error then pass to global error handler
    if(err) return next(err);
    // send the course names and ids to the user
    res.json(allCourses);
  });
});

// Create a course
router.post('/', mid.authenticateUser, (req, res, next) => {
  let course = new Course(req.body);

  course.save((err, course) => {
    // if validation errors exist pass to global handler
    if(err) {
      err.status = 400;
      return next(err);
    } else {
      // set the location header to created course
      res.location('/api/courses/' + course.id);
      res.sendStatus('201');
    }
  });
});

// GET a specific course
router.get('/:courseId', (req, res, next) => {
  Course.findById(req.params.courseId).
  // populate the course doc with its review docs and the name of its user.
  populate('user', 'fullName').
  populate('reviews').
  exec((err, course) => {
    // if err pass to global handler
    if(err) return next(err);
    // send populated course document to user
    res.json(course);
  });
});

// Update a course
router.put('/:courseId', mid.authenticateUser, (req, res, next) => {
  // find course by id
  Course.findById(req.params.courseId, (err, course) => {
    // if error finding course pass to global handler
    if(err) return next(err);
    // update course
    course.update(req.body, error => {
      // if validation errors exist pass to global error handler
      if(error) {
        error.status = 400;
        return next(error);
      } else {
        res.sendStatus('204');
      }
    });
  });
});

// Create a review
router.post('/:courseId/reviews', mid.authenticateUser, (req, res, next) => {
  let review = new Review(req.body);
  review.save((err, review) => {
    // if validation errors exist pass to global handler
    if(err) {
      err.status = 400;
      return next(err);
    } else {
      // set the location header to the related course
      res.location('/api/courses/' + req.params.courseId);
      res.sendStatus('201');
    }
  });
});

module.exports = router;
