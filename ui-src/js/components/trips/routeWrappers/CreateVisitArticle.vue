<template>
  <Visit :openLayover="openNewArticleLayover" />
</template>

<script>

  import NewArticle from '../../articles/NewArticle.vue';
  import Visit from '../visits/visit/Visit.vue';

  export default {
    components: {
      Visit
    },
    methods: {
      openNewArticleLayover: function(updateVisitPage) {
        this.$store.dispatch('openPopup', {
          component: NewArticle,
          props: {
            updateVisitPage
          }
        });
      }
    }
  };
</script>
