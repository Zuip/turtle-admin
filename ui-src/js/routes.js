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
      path: '/categories/:categoryId',
      name: 'New category',
      component: Categories
    }
  ]
};

export default routes;
