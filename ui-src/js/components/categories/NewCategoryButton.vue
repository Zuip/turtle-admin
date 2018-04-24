<template>
  <router-link :to="newCategoryLink">
    <button type="button" class="btn btn-primary">
      {{translations.newCategory}}
    </button>
  </router-link>
</template>

<script>
  export default {
    computed: {
      newCategoryLink() {

        if(this.categoryId === 'root') {
          return '/categories/new';
        }

        return '/categories/' + this.categoryId + '/new';
      },
      translations() {
        return this.$store.getters.getTranslations.categories;
      }
    },
    props: ['categoryId']
  };
</script>
