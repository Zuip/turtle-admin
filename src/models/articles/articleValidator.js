let failedFields = [];
let articleData = { };

module.exports = {
  initialize: function() {
    failedFields = [];
    categoryData = {
      topic: null,
      urlName: null,
      text: null,
      published: null
    };
  },
  setTopic: function(topic) {
    if(topic !== "") {
      articleData.topic = topic;
    }
  },
  setUrlName: function(urlName) {
    if(urlName !== "") {
      articleData.urlName = urlName;
    }
  },
  setText: function(text) {
    if(text !== "") {
      articleData.text = text;
    }
  },
  setPublished: function(published) {
    if(published === "yes") {
      articleData.published = true;
    } else if(published === "no") {
      articleData.published = false;
    }
  },
  getPublishedAsBoolean: function() {
    return articleData.published;
  },
  addFailedField: function(failedField) {
    failedFields.push(failedField);
  },
  initializeFailedFields: function() {

    if(articleData.name === null) {
      failedFields.push("name");
    }

    if(articleData.urlName === null) {
      failedFields.push("urlName");
    }

    if(articleData.published === null) {
      failedFields.push("published");
    }
  },
  getFailedFields: function() {
    return failedFields;
  }
};
