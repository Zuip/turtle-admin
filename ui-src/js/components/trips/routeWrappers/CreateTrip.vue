<template>
  <Index :openLayover="openNewTripLayover" />
</template>

<script>

  import NewTrip from '../NewTrip.vue';
  import Index from '../../Index.vue';

  export default {
    components: {
      Index
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
