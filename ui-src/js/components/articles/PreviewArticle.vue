<template>
  <div class="popup-grid-container">
    <div class="popup-grid">
      <div class="popup-grid-content">
        <div class="preview-article">
          <h3>{{ this.fields.topic.value }}</h3>
          <div v-html="fields.summary.value" class="article-summary"></div>
          <div v-html="fields.text.value"></div>
        </div>
      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="close">
          {{translations.common.close}}
        </button>
      </div>
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
      close: function() {
        this.$emit('stopPreviewing');
      }
    },
    props: ['fields']
  }
</script>
