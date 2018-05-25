<template>
  <div>
    <TextInput v-model="value.topic" :title="translations.articles.topic" />
    <TextInput v-model="value.urlName" :title="translations.urlName" />
    <TextareaInput v-model="value.summary" :title="translations.articles.summary" />
    <TextareaInput v-model="value.text" :title="translations.articles.text" :rows="10" />
    <UserSelectInput v-model="value.writers" :title="translations.articles.writers" />
    <TextInput v-model="value.publishDate" :title="translations.articles.publishDate" />
    <SelectInput v-model="value.published" :title="translations.published" />
  </div>
</template>

<script>

  import SelectInput from '../layout/forms/SelectInput.vue';
  import TextInput from '../layout/forms/TextInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';
  import UserSelectInput from '../layout/forms/UserSelectInput.vue';

  export default {
    components: {
      SelectInput,
      TextInput,
      TextareaInput,
      UserSelectInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    props: ['value']
  }

</script>
