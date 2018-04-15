var assert = require('chai').assert;

let categoryValidator = require('../../../../src/models/categories/categoryValidator');

describe('categoryValidator', function() {
  describe('#getFailedFields()', function() {

    it('should accept valid values', function() {
      categoryValidator.initialize();
      categoryValidator.setName("Name x");
      categoryValidator.setUrlName("url-name");
      categoryValidator.setPublished("no");
      categoryValidator.initializeFailedFields();
      assert.strictEqual(categoryValidator.getFailedFields().length, 0);
    });

    it('should return the fields with invalid values', function() {
      categoryValidator.initialize();
      categoryValidator.setName("");
      categoryValidator.setUrlName("");
      categoryValidator.setPublished("whaat");
      categoryValidator.initializeFailedFields();
      assert.deepEqual(categoryValidator.getFailedFields(), ["name", "urlName", "published"]);
    });

    it('should return the fields that were not initialized', function() {
      categoryValidator.initialize();
      categoryValidator.initializeFailedFields();
      assert.deepEqual(categoryValidator.getFailedFields(), ["name", "urlName", "published"]);
    });

    it('should return failed fields added with the addFailedField method', function() {
      categoryValidator.initialize();
      categoryValidator.setName("Name x");
      categoryValidator.setUrlName("url-name");
      categoryValidator.setPublished("yes");
      categoryValidator.initializeFailedFields();
      categoryValidator.addFailedField("failedField1");
      categoryValidator.addFailedField("failedField2");
      assert.deepEqual(categoryValidator.getFailedFields(), ["failedField1", "failedField2"]);
    });
  });

  describe('#getFailedFields()', function() {
    it('should return correct boolean values', function() {

      categoryValidator.initialize();
      categoryValidator.setPublished("yes");
      assert.equal(categoryValidator.getPublishedAsBoolean(), true);

      categoryValidator.initialize();
      categoryValidator.setPublished("no");
      assert.equal(categoryValidator.getPublishedAsBoolean(), false);

      categoryValidator.initialize();
      categoryValidator.setPublished("test");
      assert.equal(categoryValidator.getPublishedAsBoolean(), null);
    });
  });
});
