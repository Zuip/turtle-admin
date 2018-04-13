import Categories from './components/categories/Categories.vue';
import NewCategory from './components/categories/NewCategory.vue';

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
      component: NewCategory
    }
  ]
};

export default routes;
