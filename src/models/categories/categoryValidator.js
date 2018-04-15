let failedFields = [];

let categoryData = {
  name: null,
  urlName: null,
  published: null
};

let categoryValidator = {
  initialize: function() {
    failedFields = [];
    categoryData = {
      name: null,
      urlName: null,
      published: null
    };
  },
  setName: function(name) {
    if(name !== "") {
      categoryData.name = name;
    }
  },
  setUrlName: function(urlName) {
    if(urlName !== "") {
      categoryData.urlName = urlName;
    }
  },
  setPublished: function(published) {
    if(published === "yes") {
      categoryData.published = true;
    } else if(published === "no") {
      categoryData.published = false;
    }
  },
  getPublishedAsBoolean: function() {
    return categoryData.published;
  },
  addFailedField: function(failedField) {
    failedFields.push(failedField);
  },
  initializeFailedFields: function() {

    if(categoryData.name === null) {
      failedFields.push("name");
    }

    if(categoryData.urlName === null) {
      failedFields.push("urlName");
    }

    if(categoryData.published === null) {
      failedFields.push("published");
    }
  },
  getFailedFields: function() {
    return failedFields;
  }
};

module.exports = categoryValidator;
