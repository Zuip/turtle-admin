<template>
  <div>
    <h3>
      <router-link :to="'/trips'">
        {{translations.trips.trips}}
      </router-link>
      &gt;
      {{trip.name}}
    </h3>
    <div class="content-box">
      <Visits :visits="visits" />
    </div>
    <div class="content-box" v-if="visits.length > 1">
      <CityComparisons :trip="trip" />
    </div>
  </div>
</template>

<script>

  import CityComparisons from './cityComparisons/CityComparisons.vue';
  import getTrip from '../../apiCalls/trips/getTrip';
  import getTripCityVisits from '../../apiCalls/trips/getTripCityVisits';
  import Visits from './visits/Visits.vue';

  export default {
    components: {
      CityComparisons,
      Visits
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
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
      updateTrip() {

        this.$store.dispatch('startContentLoading', 'loadTrip');

        getTrip(this.$route.params.tripId, 'fi').then(trip => {
          this.trip = trip;
          this.$store.dispatch('endContentLoading', 'loadTrip');
        }).catch(error => {
          console.log(error);
        });
      },
      updateVisitList() {

        this.$store.dispatch('startContentLoading', 'loadVisits');

        getTripCityVisits(this.$route.params.tripId, 'fi').then(visits => {
          this.visits = visits;
          this.$store.dispatch('endContentLoading', 'loadVisits');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['openLayover']
  }

</script>

<style>
  .content-box {
    margin: 25px 0 40px;
  }
</style>