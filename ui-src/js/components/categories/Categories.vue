<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <p></p>
    <router-link :to="'/categories/new'">New category</router-link>
  </div>
</template>

<script>
  export default {
    components: { },
    data: { },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.categories;
      }
    }
  }
</script>
