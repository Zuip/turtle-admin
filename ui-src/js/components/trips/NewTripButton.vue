<template>
  <router-link :to="newTripLink" class="btn btn-primary">
    {{translations.newTrip}}
  </router-link>
</template>

<script>
  export default {
    computed: {
      newTripLink() {
        return '/trips/new';
      },
      translations() {
        return this.$store.getters.getTranslations.trips;
      }
    }
  };
</script>
