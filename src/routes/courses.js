'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;
//const middleware = require('../middleware').authenticateUser;

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
  // return corresponding course for provided course ID
  Course.findById(req.params.courseId, (err, course) => {
    res.json(course);
    if(err) return next (err);
  });
});

// Create a course
router.post('/', (req, res, next) => {
  let course = new Course(req.body);

  course.save((err, course) => {
    // if validation errors exist pass to global handler
    if(err) {
      err.status = 400;
      return next(err);
    } else {
      // set the location header to ???
      res.location('/api/courses');
      res.sendStatus('201');
    }
  });
});

// Update a course
router.put('/:courseId', (req, res, next) => {
  // // find course by id
  // Course.findById(req.params.courseId, (err, course) => {
  //   // if error finding course pass to global handler
  //   if(err) return next(err);
  //   // update course
  //   course.update(req.body, error => {
  //     // if validation errors exist pass to global error handler
  //     if(error) {
  //       err.status = 400;
  //       return next(error);
  //     } else {
  //       res.sendStatus('204');
  //     }
  //   });
  // });
});

// Create a review
router.post('/:courseId/reviews', (req, res, next) => {
  let review = new Review(req.body);
  review.save((err, course) => {
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
