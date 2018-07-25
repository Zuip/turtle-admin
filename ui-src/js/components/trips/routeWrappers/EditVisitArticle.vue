<template>

  <Visit :openLayover="openEditArticleLayover"
         v-if="article !== null" />

</template>

<script>

  import EditArticle from '../../articles/EditArticle.vue';
  import getArticle from '../../../apiCalls/articles/getArticle';
  import Visit from '../visits/visit/Visit.vue';

  export default {
    components: {
      Visit
    },
    created() {

      let contentLoadingName = 'loadArticleData';
      this.$store.dispatch('startContentLoading', contentLoadingName);

      getArticle(
        this.$route.params.visitId,
        this.$route.params.language
      ).then(data => {
        this.article = data;
        this.$store.dispatch('endContentLoading', contentLoadingName);
      }).catch(error => {
        console.log(error);
      });
    },
    data() {
      return {
        article: null
      }
    },
    methods: {
      openEditArticleLayover: function(updateVisitPage) {
        this.$store.dispatch('openPopup', {
          component: EditArticle,
          props: {
            article: this.article,
            updateVisitPage
          }
        });
      }
    }
  };
</script>
