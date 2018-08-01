<template>
  <div>
    <h3>{{translations.trips}}</h3>
    <TripsList :trips="trips" />
    <NewTripButton />
  </div>
</template>

<script>

  import getTrips from '../../apiCalls/trips/getTrips';
  import NewTripButton from './NewTripButton.vue';
  import TripsList from './tripsList/TripsList.vue';

  export default {
    components: {
      NewTripButton,
      TripsList
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.trips;
      }
    },
    created() {
      
      this.updateTripList();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateTripList);
      }
    },
    data() {
      return {
        trips: []
      };
    },
    methods: {
      updateTripList() {

        this.$store.dispatch('startContentLoading', 'loadTrips');

        getTrips('fi').then(trips => {
          this.trips = trips;
          this.$store.dispatch('endContentLoading', 'loadTrips');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['openLayover']
  };
</script>