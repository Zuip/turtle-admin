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
      props: { action: 'new' }
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
      props: { action: 'new' }
    }
  ]
};

export default routes;
