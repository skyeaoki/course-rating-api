'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// authenticate input
UserSchema.statics.authenticate = (email, password, callback) => {
  // find the user associated with the given email
  User.findOne({ emailAddress: email })
      .exec( (error, user) => {
        // if error pass to global handler
        if(error) {
          return callback(error);
        } else if(!user) {
        // if no user found pass this error to global handler
          let err = new Error('User not found');
          err.status = 401;
          return callback(err);
        }
        // check if password matches database's password directly (for seeded unencrypted passwords)
        if(password === user.password) {
          // return the user document
          return callback(null, user);
        } else {
          // use bcrypt to compare the given password to the stored hashed password
          bcrypt.compare(password, user.password, (error, result) => {
            // if passwords match, return the user document
            if(result === true) {
              return callback(null, user);
            } else {
              return callback();
            }
          });
        }
      })
};

// Hash password before saving to database
UserSchema.pre('save', next => {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports.User = User;
