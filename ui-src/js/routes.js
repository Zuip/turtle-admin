import CityComparison from './components/trips/cityComparisons/CityComparison.vue';
import CityQuestions from './components/cities/Questions.vue';
import Countries from './components/cities/Countries.vue';
import CountryCities from './components/cities/CountryCities.vue';
import CreateCity from './components/cities/routeWrappers/CreateCity.vue';
import CreateCityQuestion from './components/cities/routeWrappers/CreateQuestion.vue';
import CreateCountry from './components/cities/routeWrappers/CreateCountry.vue';
import CreateTrip from './components/trips/routeWrappers/CreateTrip.vue';
import CreateVisitArticle from './components/trips/routeWrappers/CreateVisitArticle.vue';
import CreateVisitArticleTranslation from './components/trips/routeWrappers/CreateVisitArticleTranslation.vue';
import CreateVisit from './components/trips/routeWrappers/CreateVisit.vue';
import EditVisitArticle from './components/trips/routeWrappers/EditVisitArticle.vue';
import Frontpage from './components/frontpage/Frontpage.vue';
import Trip from './components/trips/Trip.vue';
import Trips from './components/trips/Trips.vue';
import Users from './components/users/Users.vue';
import Visit from './components/trips/visits/visit/Visit.vue';

let routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Frontpage',
      component: Frontpage
    },
    {
      path: '/cities/questions',
      name: 'City questions',
      component: CityQuestions
    },
    {
      path: '/cities/questions/new',
      name: 'New city question',
      component: CreateCityQuestion
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
      path: '/visits/:visitId',
      name: 'Visit page',
      component: Visit
    },
    {
      path: '/visits/:visitId/article/new',
      name: 'New article',
      component: CreateVisitArticle
    },
    {
      path: '/visits/:visitId/article/translations/new',
      name: 'New article translation',
      component: CreateVisitArticleTranslation
    },
    {
      path: '/visits/:visitId/article/translations/:language',
      name: 'Edit article',
      component: EditVisitArticle
    },
    {
      path: '/trips',
      name: 'Trips',
      component: Trips
    },
    {
      path: '/trips/new',
      name: 'New trip',
      component: CreateTrip
    },
    {
      path: '/trips/:tripId',
      name: 'Trip page',
      component: Trip
    },
    {
      path: '/trips/:tripId/comparisons/:questionId',
      name: 'Comparison page',
      component: CityComparison
    },
    {
      path: '/trips/:tripId/visits/new',
      name: 'New visit',
      component: CreateVisit
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
};

export default routes;
