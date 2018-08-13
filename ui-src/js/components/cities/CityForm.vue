<template>
  <div>
    
    <h3>{{topic}}</h3>

    <LanguageVersionsInput v-model="value.languageVersions"
                           class="country-language-versions-input"
                           :initializeLanguageVersion="initializeCityLanguageVersion"/>

  </div>
</template>

<script>

  import initializeCityLanguageVersion from '../../services/formDataInitializers/cities/initializeCityLanguageVersion';
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
      initializeCityLanguageVersion() {
        return initializeCityLanguageVersion(this.$store.getters.getTranslations);
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
