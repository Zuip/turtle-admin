<template>
  <Trips :openLayover="openNewTripLayover" />
</template>

<script>

  import NewTrip from '../NewTrip.vue';
  import Trips from '../Trips.vue';

  export default {
    components: {
      Trips
    },
    methods: {
      openNewTripLayover: function(updateTripList) {
        this.$store.dispatch('openPopup', {
          component: NewTrip,
          props: {
            updateTripList
          }
        });
      }
    }
  };
</script>
