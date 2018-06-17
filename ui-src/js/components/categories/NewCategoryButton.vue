<template>
  <router-link :to="newCategoryLink" class="btn btn-primary">
    {{translations.newCategory}}
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
