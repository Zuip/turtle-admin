import Countries from './components/countries/Countries.vue';
import CreateTripRouteWrapper from './components/trips/routeWrappers/CreateTrip.vue';
import CreateVisitArticleRouteWrapper from './components/trips/routeWrappers/CreateVisitArticle.vue';
import CreateVisitRouteWrapper from './components/trips/routeWrappers/CreateVisit.vue';
import EditVisitArticleRouteWrapper from './components/trips/routeWrappers/EditVisitArticle.vue';
import Frontpage from './components/frontpage/Frontpage.vue';
import Trips from './components/trips/Trips.vue';
import Visit from './components/trips/visits/visit/Visit.vue';
import Visits from './components/trips/visits/Visits.vue';

let routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Frontpage',
      component: Frontpage
    },
    {
      path: '/countries',
      name: 'Countries',
      component: Countries
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
      path: '/trips/:tripId/visits/new',
      name: 'New visit',
      component: CreateVisitRouteWrapper
    },
    {
      path: '/trips',
      name: 'Trips',
      component: Trips
    },
    {
      path: '/visits/:visitId',
      name: 'Visit page',
      component: Visit
    },
    {
      path: '/trips/:tripId',
      name: 'Trip page',
      component: Visits
    }
  ]
};

export default routes;
