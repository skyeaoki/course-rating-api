'use strict';
const express = require('express');
const auth = require('basic-auth');
const User = require('../models/user').User;

const authenticateUser = (req, res, next) => {
  let validCredentials = auth(req);
  if(validCredentials) {
    User.authenticate(validCredentials.name, validCredentials.pass, (error, user) => {
      // store user document on request body to be accessed by other routes
      req.user = user;
      if(error) return next(error);
      return next();
    });
  // if credentials are not valid create a new error and pass to global handler
  } else {
   let err = new Error('Invalid username or password.');
   err.status = 401;
   if(err) return next(err);
  }
};

module.exports.authenticateUser = authenticateUser;
