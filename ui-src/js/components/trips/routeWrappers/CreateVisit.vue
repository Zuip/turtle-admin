<template>
  <Visits :openLayover="openNewVisitLayover" />
</template>

<script>

  import NewVisit from '../visits/NewVisit.vue';
  import Visits from '../visits/Visits.vue';

  export default {
    components: {
      Visits
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
