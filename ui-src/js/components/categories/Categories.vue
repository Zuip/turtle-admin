<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <p></p>
    <router-link :to="'/categories/new'">New category</router-link>
  </div>
</template>

<script>
  import NewCategory from './NewCategory.vue';

  export default {
    components: { },
    data: function() {
      return { };
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.categories;
      }
    },
    created: function() {
      if(this.$route.params.categoryId === 'new') {
        this.$store.dispatch('openPopup', NewCategory);
      }
    },
    watch: {
      "$route.params.categoryId": function(categoryId) {
        if(categoryId === 'new') {
          this.$store.dispatch('openPopup', NewCategory);
        }
      }
    }
  }
</script>
