<template>
  <div class="popup-grid">
    <div class="popup-grid-content">
      <h3>{{translations.categories.newCategory}}</h3>
      <p>{{translations.savingSucceeded}}</p>
    </div>
    <div class="popup-grid-footer">
      <button type="button" class="btn btn-primary" v-on:click="closeClicked">
        {{translations.close}}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      closeClicked: function() {
        this.$emit('close');
      }
    }
  };
</script>
