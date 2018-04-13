<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <p></p>
  </div>
</template>

<script>
  export default {
    components: { },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.categories;
      }
    }
  }
</script>
