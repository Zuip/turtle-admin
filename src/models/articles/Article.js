module.exports = function() {
  this.id = null;
  this.languageId = null;
  this.categoryId = null;
  this.cityId = null;
  this.topic = '';
  this.urlName = '';
  this.summary = '';
  this.text = '';
  this.publish = {
    date: '',
    time: ''
  };
  this.published = false;
  this.writers = [];
};
