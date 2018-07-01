<template>
  <div>

    <h3>{{topic}}</h3>

    <TextInput v-model="value.categoryName"
               :title="translations.categories.categoryName" />

    <TextInput v-model="value.urlName"
               :title="translations.urlName" />

    <TextareaInput v-model="value.description"
                   :title="translations.categories.description" />

    <SelectInput v-model="value.published"
                 :title="translations.published" />

  </div>
</template>

<script>

  import SelectInput from '../layout/forms/SelectInput/SelectInput.vue';
  import TextInput from '../layout/forms/TextInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';

  export default {
    components: {
      SelectInput,
      TextInput,
      TextareaInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    props: ['value', 'topic']
  };
</script>
