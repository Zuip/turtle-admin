<template>
  <div class="popup-grid">
    <div class="popup-grid-content">
      <h3>{{topic}}</h3>
      <p>{{translations.common.savingSucceeded}}</p>
    </div>
    <div class="popup-grid-footer">
      <ClosePopupButton :closeToAddress="closeToAddress" />
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
    },
    props: [ 'closeToAddress', 'topic' ]
  };
</script>
