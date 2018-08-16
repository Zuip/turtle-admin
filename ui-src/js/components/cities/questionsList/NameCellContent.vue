<template>
  <span>

    <router-link v-if="showQuestionLink"
                 :to="questionLink">
      {{props.text}}
    </router-link>

    <span v-if="!showQuestionLink">
      {{props.text}}
    </span>

  </span>
</template>

<script>
  export default {
    computed: {
      questionLink() {

        if(typeof this.props.questionLink === 'undefined') {
          return null;
        }

        return this.props.questionLink.replace(
          ':questionId',
          this.props.id
        );
      },
      showQuestionLink() {
        return typeof this.props.questionLink !== 'undefined';
      }
    },
    props: ['props']
  }
</script>