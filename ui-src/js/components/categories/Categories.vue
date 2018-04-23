<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <BackToParentCategoryLink :categoryId="categoryId" />
    <CategoryContent :categoryId="categoryId" />
    <router-link :to="newCategoryLink">
      <button type="button" class="btn btn-primary">
        {{translations.newCategory}}
      </button>
    </router-link>
  </div>
</template>

<script>
  import BackToParentCategoryLink from './BackToParentCategoryLink.vue';
  import CategoryContent from './CategoryContent.vue';
  import NewCategory from './NewCategory.vue';

  export default {
    components: {
      CategoryContent,
      BackToParentCategoryLink
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
      },
      newCategoryLink() {

        if(this.categoryId === 'root') {
          return '/categories/new';
        }

        return '/categories/' + this.categoryId + '/new';
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
