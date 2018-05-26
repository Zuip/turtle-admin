<template>
  <div class="popup-grid">
    <div class="popup-grid-content">
      <h3>{{translations.categories.newCategory}}</h3>
      <p>{{translations.savingSucceeded}}</p>
    </div>
    <div class="popup-grid-footer">
      <ClosePopupButton :text="translations.close" />
    </div>
  </div>
</template>

<script>

  import ClosePopupButton from './ClosePopupButton.vue';

  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    components: {
      ClosePopupButton
    }
  };
</script>
