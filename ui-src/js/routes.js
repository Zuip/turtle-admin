import ArticleCreateCategoryRouteWrapper from './components/categories/routeWrappers/ArticleCreate.vue';
import ArticleEditCategoryRouteWrapper from './components/categories/routeWrappers/ArticleEdit.vue';
import CategoryCreateCategoryRouteWrapper from './components/categories/routeWrappers/CategoryCreate.vue';
import CategoryEditCategoryRouteWrapper from './components/categories/routeWrappers/CategoryEdit.vue';
import DefaultCategoryRouteWrapper from './components/categories/routeWrappers/Default.vue';

let routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Categories',
      component: DefaultCategoryRouteWrapper
    },
    {
      path: '/categories/new',
      name: 'New category',
      component: CategoryCreateCategoryRouteWrapper
    },
    {
      path: '/categories/:categoryId',
      name: 'Subcategories',
      component: DefaultCategoryRouteWrapper
    },
    {
      path: '/categories/:categoryId/edit',
      name: 'Edit category',
      component: CategoryEditCategoryRouteWrapper,
    },
    {
      path: '/categories/:categoryId/new',
      name: 'New subcategory',
      component: CategoryCreateCategoryRouteWrapper
    },
    {
      path: '/categories/:categoryId/articles/new',
      name: 'New article',
      component: ArticleCreateCategoryRouteWrapper
    },
    {
      path: '/articles/:articleId/edit',
      name: 'Edit article',
      component: ArticleEditCategoryRouteWrapper
    }
  ]
};

export default routes;
