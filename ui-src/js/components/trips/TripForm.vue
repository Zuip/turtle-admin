<template>
  <div>
    
    <h3>{{topic}}</h3>

    <LanguageVersionsInput v-model="value.languageVersions"
                           class="trip-language-versions-input"
                           :initializeLanguageVersion="initializeTripLanguageVersion"/>

    <UserSelectInput v-model="value.users"
                     :title="translations.trips.users" />
  </div>
</template>

<script>

  import initializeTripLanguageVersion from '../../services/formDataInitializers/trips/initializeTripLanguageVersion';
  import LanguageVersionsInput from '../layout/forms/LanguageVersionsInput.vue';
  import UserSelectInput from '../layout/forms/UserSelectInput.vue';
  
  export default {
    components: {
      LanguageVersionsInput,
      UserSelectInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      initializeTripLanguageVersion() {
        return initializeTripLanguageVersion();
      },
    },
    props: ['topic', 'value']
  }

</script>

<style>
  .trip-language-versions-input {
    margin-bottom: 20px;
  }
</style>
