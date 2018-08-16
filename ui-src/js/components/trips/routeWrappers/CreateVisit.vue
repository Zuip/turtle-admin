<template>
  <Trip :openLayover="openNewVisitLayover" />
</template>

<script>

  import NewVisit from '../visits/NewVisit.vue';
  import Trip from '../Trip.vue';

  export default {
    components: {
      Trip
    },
    methods: {
      openNewVisitLayover: function(updateVisitList) {
        this.$store.dispatch('openPopup', {
          component: NewVisit,
          props: {
            updateVisitList
          }
        });
      }
    }
  };
</script>
