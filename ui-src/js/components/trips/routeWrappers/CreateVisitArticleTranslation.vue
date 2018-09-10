<template>
  <Visit :openLayover="openNewArticleLayover" />
</template>

<script>

  import NewArticleTranslation from '../../articles/NewArticleTranslation.vue';
  import Visit from '../visits/visit/Visit.vue';

  export default {
    components: {
      Visit
    },
    methods: {
      openNewArticleLayover: function(updateVisitPage) {
        this.$store.dispatch('openPopup', {
          component: NewArticleTranslation,
          props: {
            updateVisitPage
          }
        });
      }
    }
  };
</script>
