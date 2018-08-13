<template>
  <div>
    
    <h3>{{topic}}</h3>

    <LanguageVersionsInput v-model="value.languageVersions"
                           class="country-language-versions-input"
                           :initializeLanguageVersion="initializeQuestionLanguageVersion"/>

  </div>
</template>

<script>

  import initializeQuestionLanguageVersion from '../../services/formDataInitializers/cities/initializeQuestionLanguageVersion';
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
      initializeQuestionLanguageVersion() {
        return initializeQuestionLanguageVersion(this.$store.getters.getTranslations);
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
