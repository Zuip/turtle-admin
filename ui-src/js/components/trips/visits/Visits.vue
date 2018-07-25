<template>
  <div>
    <h3>{{trip.name}} &gt; {{translations.visits}}</h3>
    <VisitsList :visits="visits" />
    <NewVisitButton />
  </div>
</template>

<script>

  import getTrip from '../../../apiCalls/trips/getTrip';
  import getTripCityVisits from '../../../apiCalls/trips/getTripCityVisits';
  import NewVisitButton from './NewVisitButton.vue';
  import VisitsList from './visitsList/VisitsList.vue';

  export default {
    components: {
      NewVisitButton,
      VisitsList
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.trips.visits;
      }
    },
    created() {

      this.updateTrip();
      this.updateVisitList();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateVisitList);
      }
    },
    data() {
      return {
        trip: {
          name: null
        },
        visits: []
      };
    },
    methods: {
      updateVisitList() {

        this.$store.dispatch('startContentLoading', 'loadVisits');

        getTripCityVisits(this.$route.params.tripId, 'fi').then(visits => {
          this.visits = visits;
          this.$store.dispatch('endContentLoading', 'loadVisits');
        }).catch(error => {
          console.log(error);
        });
      },
      updateTrip() {

        this.$store.dispatch('startContentLoading', 'loadTrip');

        getTrip(this.$route.params.tripId, 'fi').then(trip => {
          this.trip = trip;
          this.$store.dispatch('endContentLoading', 'loadTrip');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['openLayover']
  };
</script>