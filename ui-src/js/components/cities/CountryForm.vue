<template>
  <div>
    
    <h3>{{topic}}</h3>

    <LanguageVersionsInput v-model="value.languageVersions"
                           class="country-language-versions-input"
                           :initializeLanguageVersion="initializeCountryLanguageVersion"/>

  </div>
</template>

<script>

  import initializeCountryLanguageVersion from '../../services/formDataInitializers/cities/initializeCountryLanguageVersion';
  import LanguageVersionsInput from '../layout/forms/LanguageVersionsInput.vue';
  
  export default {
    components: {
      LanguageVersionsInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      initializeCountryLanguageVersion() {
        return initializeCountryLanguageVersion();
      }
    },
    props: ['topic', 'value']
  }

</script>

<style>
  .country-language-versions-input {
    margin-bottom: 20px;
  }
</style>
