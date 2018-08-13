<template>
  <div>
    <h3>{{translations.questions}}</h3>
    <QuestionsList :questions="questions" />
    <Button :link="'/cities/questions/new'" :text="translations.newQuestion"/>
  </div>
</template>

<script>

  import getQuestions from '../../apiCalls/cities/getQuestions';
  import Button from '../layout/buttons/PrimaryLinkButton.vue';
  import QuestionsList from './questionsList/QuestionsList.vue';

  export default {
    components: {
      Button,
      QuestionsList
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.cities.questions;
      }
    },
    created() {
      
      this.updateCountryList();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateQuestionList);
      }
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
    props: ['openLayover']
  };
</script>