'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // must be in valid email format
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

// Create a pre save hook on the user schema that uses the bcrypt npm package to hash the user's password.

module.exports.User = User;
