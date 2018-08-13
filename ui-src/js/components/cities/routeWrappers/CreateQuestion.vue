<template>
  <Questions :openLayover="openNewQuestionLayover" />
</template>

<script>

  import NewQuestion from '../NewQuestion.vue';
  import Questions from '../Questions.vue';

  export default {
    components: {
      Questions
    },
    methods: {
      openNewQuestionLayover: function(updateQuestionList) {
        this.$store.dispatch('openPopup', {
          component: NewQuestion,
          props: {
            updateQuestionList
          }
        });
      }
    }
  };
</script>
