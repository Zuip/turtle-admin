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

        if(this.categoryId === 'root') {
          return '/articles/new';
        }

        return '/categories/' + this.categoryId + '/articles/new';
      }
    },
    props: ['categoryId']
  };
</script>
