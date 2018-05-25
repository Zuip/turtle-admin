import Categories from './components/categories/Categories.vue';

let routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/categories/new',
      name: 'New category',
      component: Categories,
      props: { action: 'newCategory' }
    },
    {
      path: '/categories/:categoryId',
      name: 'Subcategories',
      component: Categories
    },
    {
      path: '/categories/:categoryId/new',
      name: 'New subcategory',
      component: Categories,
      props: { action: 'newCategory' }
    },
    {
      path: '/categories/:categoryId/articles/new',
      name: 'New article',
      component: Categories,
      props: { action: 'newArticle' }
    },
    {
      path: '/categories/:categoryId/articles/:articleId',
      name: 'Edit article',
      component: Categories,
      props: { action: 'editArticle' }
    }
  ]
};

export default routes;
