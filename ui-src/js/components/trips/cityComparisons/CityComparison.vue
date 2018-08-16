<template>
  <div>
    <CityComparisonPath :question="question" :trip="trip" />
    <ComparisonBoxes v-model="cities" />
  </div>
</template>

<script>

  import CityComparisonPath from './CityComparisonPath.vue';
  import ComparisonBoxes from './ComparisonBoxes.vue';
  import getComparison from '../../../apiCalls/cities/getComparison';
  import getQuestion from '../../../apiCalls/cities/getQuestion';
  import getTrip from '../../../apiCalls/trips/getTrip';
  import getTripCityVisits from '../../../apiCalls/trips/getTripCityVisits';
  import putComparison from '../../../apiCalls/cities/putComparison';

  export default {
    components: {
      CityComparisonPath,
      ComparisonBoxes
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    created() {
      this.updateComparison();
      this.updateQuestion();
      this.updateTrip();
    },
    data() {
      return {
        saveCitiesOnNextChange: true,
        cities: {
          available: [],
          ranked: []
        },
        trip: {
          id: null,
          name: null
        },
        question: {
          text: null
        }
      };
    },
    methods: {
      save() {

        this.$store.dispatch('startContentLoading', 'saveComparison');

        putComparison(
          this.$route.params.tripId,
          this.cities.ranked.map(city => city.id)
        ).then(comparison => {
          this.$store.dispatch('endContentLoading', 'saveComparison');
        }).catch(error => {
          console.log(error);
        });
      },
      updateComparison() {

        this.$store.dispatch('startContentLoading', 'loadComparison');

        Promise.all([
          getComparison(this.$route.params.tripId).then(
            ranks => ranks.map(rank => rank.city.id)
          ),
          getTripCityVisits(this.$route.params.tripId, 'fi').then(
            visits => visits.map(visit => visit.city)
          )
        ]).then(data => {

          let rankedCityIds = data[0];
          let cities = data[1];

          this.saveCitiesOnNextChange = false;

          this.cities = {
            available: cities.filter(
              city => !rankedCityIds.includes(city.id)
            ),
            ranked: cities.filter(
              city => rankedCityIds.includes(city.id)
            ).sort(
              (a, b) => rankedCityIds.indexOf(a.id) > rankedCityIds.indexOf(b.id)
            )
          };

          this.$store.dispatch('endContentLoading', 'loadComparison');

        }).catch(error => {
          console.log(error);
        });
      },
      updateQuestion() {

        this.$store.dispatch('startContentLoading', 'loadQuestion');

        getQuestion(this.$route.params.questionId, 'fi').then(question => {
          this.question = question;
          this.$store.dispatch('endContentLoading', 'loadQuestion');
        }).catch(error => {
          console.log(error);
        });
      },
      updateTrip() {

        this.$store.dispatch('startContentLoading', 'loadTrip');

        getTrip(this.$route.params.tripId, 'fi').then(trip => {
          this.trip = trip;
          this.$store.dispatch('endContentLoading', 'loadTrip');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    watch: {
      cities: {
        handler(newValue, oldValue) {
          
          if(this.saveCitiesOnNextChange) {
            return this.save();
          }

          this.saveCitiesOnNextChange = true;
        },
        deep: true
      }
    }
  }

</script>