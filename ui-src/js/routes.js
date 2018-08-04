import Countries from './components/cities/Countries.vue';
import CountryCities from './components/cities/CountryCities.vue';
import CreateCity from './components/cities/routeWrappers/CreateCity.vue';
import CreateCountry from './components/cities/routeWrappers/CreateCountry.vue';
import CreateTrip from './components/trips/routeWrappers/CreateTrip.vue';
import CreateVisitArticle from './components/trips/routeWrappers/CreateVisitArticle.vue';
import CreateVisit from './components/trips/routeWrappers/CreateVisit.vue';
import EditVisitArticle from './components/trips/routeWrappers/EditVisitArticle.vue';
import Frontpage from './components/frontpage/Frontpage.vue';
import Trips from './components/trips/Trips.vue';
import Users from './components/users/Users.vue';
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
      path: '/countries/new',
      name: 'New country',
      component: CreateCountry
    },
    {
      path: '/countries/:countryId/cities',
      name: 'Country cities',
      component: CountryCities
    },
    {
      path: '/countries/:countryId/cities/new',
      name: 'New city',
      component: CreateCity
    },
    {
      path: '/visits/:visitId/articles/new',
      name: 'New article',
      component: CreateVisitArticle
    },
    {
      path: '/visits/:visitId/articles/:language',
      name: 'Edit article',
      component: EditVisitArticle
    },
    {
      path: '/trips/new',
      name: 'New trip',
      component: CreateTrip
    },
    {
      path: '/trips/:tripId/visits/new',
      name: 'New visit',
      component: CreateVisit
    },
    {
      path: '/trips',
      name: 'Trips',
      component: Trips
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
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
