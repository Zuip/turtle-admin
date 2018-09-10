<template>
  <router-link :to="newArticleTranslationLink()">
    <button type="button" class="btn btn-primary">
      {{translations.newArticleTranslation}}
    </button>
  </router-link>
</template>

<script>
  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations.articles;
      }
    },
    methods: {
      newArticleTranslationLink() {
        return '/visits/' + this.$route.params.visitId
             + '/article/translations/new';
      }
    }
  };
</script>
