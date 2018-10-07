<template>
  <div>
    
    <h3>{{topic}}</h3>

    <LanguageVersionsInput
      v-model="value.languageVersions"
      class="country-language-versions-input"
      :initializeLanguageVersion="initializeCityLanguageVersion"
    />

    <TextInput
      v-model="value.latitude"
      :title="translations.cities.latitude"
    />

    <TextInput
      v-model="value.longitude"
      :title="translations.cities.longitude"
    />

  </div>
</template>

<script>

  import initializeCityLanguageVersion from '../../services/formDataInitializers/cities/initializeCityLanguageVersion';
  import LanguageVersionsInput from '../layout/forms/LanguageVersionsInput.vue';
  import TextInput from '../layout/forms/TextInput.vue';

  export default {
    components: {
      LanguageVersionsInput,
      TextInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      initializeCityLanguageVersion() {
        return initializeCityLanguageVersion(
          this.$store.getters.getTranslations
        );
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
