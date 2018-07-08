<template>
  <Categories :categoryId="article.categoryId"
              :openLayover="openEditArticleLayover"
              v-if="article !== null"/>
</template>

<script>

  import Categories from '../Categories.vue';
  import EditArticle from '../../articles/EditArticle.vue';
  import getArticle from '../../../apiCalls/articles/getArticle';

  export default {
    components: {
      Categories
    },
    created() {

      let contentLoadingName = 'loadArticleData';
      this.$store.dispatch('startContentLoading', contentLoadingName);

      getArticle(
        this.$route.params.articleId,
        this.$route.params.language
      ).then(data => {
        this.article = data;
        this.$store.dispatch('endContentLoading', contentLoadingName);
      }).catch(error => {
        console.log(error);
      });
    },
    data: function() {
      return {
        article: null
      }
    },
    methods: {
      openEditArticleLayover: function(updateCategoryList) {
        this.$store.dispatch('openPopup', {
          component: EditArticle,
          props: {
            article: this.article,
            language: this.$route.params.language,
            updateCategoryList
          }
        });
      }
    }
  };
</script>
