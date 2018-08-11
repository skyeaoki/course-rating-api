'use strict';
const express = require('express');
const auth = require('basic-auth');
const User = require('../models/user').User;

const authenticateUser = (req, res, next) => {
  let userCredentials = auth(req);
  if(userCredentials) {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      console.log('error and user VALUE:', error, user);
      if(error) return next(error);
    });
  }
  return next();
};

module.exports.authenticateUser = authenticateUser;
