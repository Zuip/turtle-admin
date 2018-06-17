let deleteCategoryController = require('../controllers/categories/deleteCategory');
let getCategoryController = require('../controllers/categories/getCategory');
let getCategoriesController = require('../controllers/categories/getCategories');
let postCategoryController = require('../controllers/categories/postCategory');
let putCategoryController = require('../controllers/categories/putCategory');

module.exports = function(app) {
  app.delete('/api/categories/:categoryId', deleteCategoryController);
  app.get('/api/categories/:categoryId', getCategoryController);
  app.get('/api/categories/:categoryId/categories', getCategoriesController);
  app.post('/api/categories', postCategoryController);
  app.put('/api/categories/:categoryId', putCategoryController);
}
