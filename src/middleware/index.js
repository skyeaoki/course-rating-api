'use strict';
const express = require('express');
const auth = require('basic-auth');
const User = require('../models/user').User;

const authenticateUser = (req, res, next) => {
  let userCredentials = auth(req);
  if(userCredentials) {
    User.authenticate(userCredentials.name, userCredentials.pass, (error, user) => {
      req.user = user;
      console.log(req.user, user);
      if(error) return next(error);
    });
  }
  return next();
};

module.exports.authenticateUser = authenticateUser;
