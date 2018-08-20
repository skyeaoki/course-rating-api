const expect = require('chai').expect;
const User = require('../models/user').User;

// sanity check
describe('Mocha', function() {
  it('should run our tests using npm', function() {
    expect(true).to.be.ok;
  });
});

describe('returnUserDocumentIfValidCredentials', function() {
  let User = require('../models/user').User;
  it('should return the user if the credentials are valid', function() {
  });

  it('should not return a user if the credentials are invalid', function() {
  });
});
