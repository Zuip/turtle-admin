<template>
  <h3>
    <router-link :to="'/trips'">
      {{translations.trips.trips}}
    </router-link>
    &gt;
    <router-link :to="'/trips/' + trip.id">
      {{trip.name}}
    </router-link>
    &gt;
    {{question.text}}
  </h3>
</template>

<script>

  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    props: ['question', 'trip']
  }

</script>