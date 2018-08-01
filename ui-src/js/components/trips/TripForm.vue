<template>
  <div>
    
    <h3>{{topic}}</h3>

    <TripLanguageVersionsInput v-model="value.languageVersions"
                               class="trip-language-versions-input"/>

    <UserSelectInput v-model="value.users"
                     :title="translations.trips.users" /> 
  </div>
</template>

<script>

  import TripLanguageVersionsInput from '../layout/forms/TripLanguageVersionsInput.vue';
  import UserSelectInput from '../layout/forms/UserSelectInput.vue';
  
  export default {
    components: {
      TripLanguageVersionsInput,
      UserSelectInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    props: ['topic', 'value']
  }

</script>

<style>
  .trip-language-versions-input {
    margin-bottom: 20px;
  }
</style>
