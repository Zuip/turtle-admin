<template>
  <div>

    <h3>{{topic}}</h3>

    <TextInput v-model="value.name"
               :title="translations.name" />

    <TextInput v-model="value.urlName"
               :title="translations.urlName" />

  </div>
</template>

<script>

  import TextInput from '../layout/forms/TextInput.vue';

  export default {
    components: {
      TextInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    props: ['topic', 'value']
  }

</script>
