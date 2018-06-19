'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user').User;

const ReviewSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: "now"
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports.Review = Review;
