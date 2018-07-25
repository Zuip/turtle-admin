<template>
  <router-link :to="newVisitLink" class="btn btn-primary">
    {{translations.newVisit}}
  </router-link>
</template>

<script>
  export default {
    computed: {
      newVisitLink() {
        return '/trips/' + this.$route.params.tripId + '/visits/new';
      },
      translations() {
        return this.$store.getters.getTranslations.trips.visits;
      }
    }
  };
</script>
