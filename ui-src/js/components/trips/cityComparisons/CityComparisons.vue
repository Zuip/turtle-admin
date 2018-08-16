<template>
  <div>
    <h4>{{translations.comparisons}}</h4>
    <QuestionsList :questions="questions"
                   :questionLink="comparisonLink" />
  </div>
</template>

<script>

  import getQuestions from '../../../apiCalls/cities/getQuestions';
  import Button from '../../layout/buttons/PrimaryLinkButton.vue';
  import QuestionsList from '../../cities/questionsList/QuestionsList.vue';

  export default {
    components: {
      Button,
      QuestionsList
    },
    computed: {
      comparisonLink() {
        return '/trips/' + this.trip.id + '/comparisons/:questionId';
      },
      translations() {
        return this.$store.getters.getTranslations.cities.questions;
      }
    },
    created() {
      this.updateCountryList();
    },
    data() {
      return {
        questions: []
      };
    },
    methods: {
      updateCountryList() {

        this.$store.dispatch('startContentLoading', 'loadQuestions');

        getQuestions('fi').then(questions => {
          this.questions = questions;
          this.$store.dispatch('endContentLoading', 'loadQuestions');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['trip']
  };
</script>