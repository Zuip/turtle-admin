<template>
  <div>
    <h3>{{topic}}</h3>
    <TripLanguageVersionsInput v-model="value.languageVersions" />
  </div>
</template>

<script>

  import TripLanguageVersionsInput from '../layout/forms/TripLanguageVersionsInput.vue';

  export default {
    components: {
      TripLanguageVersionsInput
    },
    props: ['topic', 'value']
  }

</script>
