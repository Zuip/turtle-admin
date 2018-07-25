<template>
  <router-link :to="newArticleLink()">
    <button type="button" class="btn btn-primary">
      {{translations.newArticle}}
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
      newArticleLink() {
        return '/visits/' + this.$route.params.visitId + '/articles/new';
      }
    }
  };
</script>
