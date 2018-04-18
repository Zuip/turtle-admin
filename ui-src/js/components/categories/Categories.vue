<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <CategoryContent />
    <router-link :to="'/categories/new'">
      <button type="button" class="btn btn-primary">
        {{translations.newCategory}}
      </button>
    </router-link>
  </div>
</template>

<script>
  import CategoryContent from './CategoryContent.vue';
  import NewCategory from './NewCategory.vue';

  export default {
    components: {
      CategoryContent
    },
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
