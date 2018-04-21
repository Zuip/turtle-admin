<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <CategoryContent :categoryId="categoryId" />
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
    computed: {
      translations() {
        return this.$store.getters.getTranslations.categories;
      },
      categoryId() {

        if(typeof this.$route.params.categoryId === 'undefined') {
          return 'root';
        }

        return this.$route.params.categoryId;
      }
    },
    created: function() {
      if(this.$attrs.action === 'new') {
        this.$store.dispatch('openPopup', NewCategory);
      }
    },
    data: function() {
      return { };
    },
    watch: {
      '$attrs.action': function(action) {
        if(action === 'new') {
          this.$store.dispatch('openPopup', NewCategory);
        }
      }
    }
  }
</script>
