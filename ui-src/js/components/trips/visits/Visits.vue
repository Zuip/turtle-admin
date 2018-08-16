<template>
  <div>
    <h4>{{translations.visits.visits}}</h4>
    <VisitsList :visits="visits" v-if="visits.length" />
    <div v-if="!visits.length" class="no-visits-exists">
      {{translations.visits.noVisitsExists}}
    </div>
    <NewVisitButton />
  </div>
</template>

<script>

  import NewVisitButton from './NewVisitButton.vue';
  import VisitsList from './visitsList/VisitsList.vue';

  export default {
    components: {
      NewVisitButton,
      VisitsList
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.trips;
      }
    },
    props: ['visits']
  };
</script>

<style>
  .no-visits-exists {
    margin-bottom: 10px;
  }
</style>