<template>
  <div>
    <h3>{{translations.visits}}</h3>
    <VisitsList :visits="visits" />
    <NewVisitButton />
  </div>
</template>

<script>

  import getTripCityVisits from '../../../apiCalls/trips/getTripCityVisits';
  import NewVisitButton from './NewVisitButton.vue';
  import VisitsList from './visitsList/VisitsList.vue';

  export default {
    components: {
      NewVisitButton,
      VisitsList
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.trips.visits;
      }
    },
    created() {

      this.updateVisitList();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateVisitList);
      }
    },
    data() {
      return {
        visits: []
      };
    },
    methods: {
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
  };
</script>