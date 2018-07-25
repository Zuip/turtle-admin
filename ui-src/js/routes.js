import CreateTripRouteWrapper from './components/trips/routeWrappers/CreateTrip.vue';
import CreateVisitArticleRouteWrapper from './components/trips/routeWrappers/CreateVisitArticle.vue';
import CreateVisitRouteWrapper from './components/trips/routeWrappers/CreateVisit.vue';
import EditVisitArticleRouteWrapper from './components/trips/routeWrappers/EditVisitArticle.vue';
import Index from './components/Index.vue';
import Visit from './components/trips/visits/visit/Visit.vue';
import Visits from './components/trips/visits/Visits.vue';

let routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/visits/:visitId/articles/new',
      name: 'New article',
      component: CreateVisitArticleRouteWrapper
    },
    {
      path: '/visits/:visitId/articles/:language',
      name: 'Edit article',
      component: EditVisitArticleRouteWrapper
    },
    {
      path: '/trips/new',
      name: 'New trip',
      component: CreateTripRouteWrapper
    },
    {
      path: '/trips/:tripId',
      name: 'Trip page',
      component: Visits
    },
    {
      path: '/trips/:tripId/visits/new',
      name: 'New visit',
      component: CreateVisitRouteWrapper
    },
    {
      path: '/visits/:visitId',
      name: 'Visit page',
      component: Visit
    }
  ]
};

export default routes;
