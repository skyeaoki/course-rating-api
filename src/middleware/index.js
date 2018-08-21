'use strict';
const express = require('express');
const auth = require('basic-auth');
const User = require('../models/user').User;

const authenticateUser = (req, res, next) => {
  // parse the authorization header into the user's credentials
  let credentials = auth(req);
  if(credentials) {
    // check the credentials against the database
    User.authenticate(credentials.name, credentials.pass, (err, user) => {
      // if error pass to global handler
      if(err) return next(err);
      // store user document on request body to be accessed by other routes
      req.body.user = user;
      return next();
    });
  // if credentials are not valid create a new error and pass to global handler
  } else {
   let error = new Error('Invalid username or password.');
   error.status = 401;
   return next(error);
  }
};

module.exports.authenticateUser = authenticateUser;
