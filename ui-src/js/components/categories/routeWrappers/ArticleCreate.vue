<template>
  <Categories :categoryId="categoryId" :openLayover="openNewArticleLayover" />
</template>

<script>

  import Categories from '../Categories.vue';
  import NewArticle from '../../articles/NewArticle.vue';

  export default {
    components: {
      Categories
    },
    computed: {
      categoryId() {
        return parseInt(this.$route.params.categoryId);
      }
    },
    methods: {
      openNewArticleLayover: function(updateCategoryList) {
        this.$store.dispatch('openPopup', {
          component: NewArticle,
          props: {
            updateCategoryList,
            categoryId: this.categoryId
          }
        });
      }
    }
  };
</script>
