<template>
  <div v-if="this.category !== null">
    &lt; <router-link :to="parentCategoryUrl">{{translations.backToParent}}</router-link>
  </div>
</template>

<script>
  import getCategory from '../../apiCalls/categories/getCategory';

  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations.categories;
      },
      parentCategoryUrl() {

        if(this.category.parentId === null) {
          return '/';
        }

        return '/categories/' + this.category.parentId;
      }
    },
    created: function() {
      this.updateCategory();
    },
    data: function() {
      return {
        category: null
      };
    },
    methods: {
      updateCategory: function() {

        if(this.categoryId === 'root') {
          this.category = null;
          return;
        }

        let contentLoadingName = 'getBackButtonCategory';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCategory(this.categoryId, this.$store.getters.getLanguage).then(data => {
          this.category = data;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(function(error) {
          console.log(error);
        });
      }
    },
    props: ['categoryId'],
    watch: {
      categoryId: function(newCategoryId, oldCategoryId) {
        if(newCategoryId !== oldCategoryId) {
          this.updateCategory();
        }
      }
    }
  };
</script>
