let assert = require('chai').assert;

let addTextInText = require('../../..ui-src/services/addTextInText');

describe('addTextInText', function() {

  it('should add text in defined position', function() {
    let result = addTextInText('FirstThird', 'Second', 4, 5);
    assert.strictEqual(result, 'FirstSecondThird');
  });

  it('should add text in the end if no position defined', function() {
    let result = addTextInText('FirstThird', 'Second', null, null);
    assert.strictEqual(result, 'FirstThirdSecond');
  });

  it('should replace text in the defined range', function() {
    let result = addTextInText('FirstReplaceThird', 'Second', 4, 11);
    assert.strictEqual(result, 'FirstThirdSecond');
  });
});
