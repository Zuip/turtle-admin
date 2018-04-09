var assert = require('chai').assert;

let userPasswordHandler = require('../../../../../src/models/users/password');

let correctPassword = 'testPassword';
let incorrectPassword = 'somethingElse';

describe('password', function() {
  describe('#validate()', function() {
    it('should detect that the password is correct', function(done) {
      userPasswordHandler.generateHash(correctPassword, function(hash) {
        userPasswordHandler.validate(
          correctPassword,
          hash,
          function isValidCallback() {
            done();
          },
          function isNotValidCallback() {
            assert.fail();
            done();
          }
        );
      });
    });
    
    it('should detect that the password is incorrect', function(done) {
      userPasswordHandler.generateHash(correctPassword, function(hash) {
        userPasswordHandler.validate(
          incorrectPassword,
          hash,
          function isValidCallback() {
            assert.fail();
            done();
          },
          function isNotValidCallback() {
            done();
          }
        );
      });
    });
  });
});
