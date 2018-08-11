'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user').User;
const Review = require('../models/review').Review;

const CourseSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  estimatedTime: {
    type: String,
    trim: true
  },
  materialsNeeded: {
    type: String,
    trim: true
  },
  steps: [{
    stepNumber: {
      type: Number
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  }],
  reviews: [{ type: Schema.ObjectId, ref: 'Review' }]
});

const Course = mongoose.model('Course', CourseSchema);

module.exports.Course = Course;
