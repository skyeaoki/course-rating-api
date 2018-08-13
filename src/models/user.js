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
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ emailAddress: email })
      .exec(function (error, user) {
        if(error) {
          return callback(error);
        } else if(!user) {
          let err = new Error('User not found');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, (error, result) => {
          console.log(password, user.password, result);
          if(result === true) {
            console.log('passwords match');
            return callback(null, user);
          } else {
            console.log('passwords do not match');
            return callback();
          }
        });
      })
};

// Hash password before saving to database
UserSchema.pre('save', function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;
