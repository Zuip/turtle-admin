<template>
  <div>

    <TextInput v-model="value.topic"
               :title="translations.articles.topic" />

    <TextInput v-model="value.urlName"
               :title="translations.urlName" />

    <SelectInput v-model="value.city"
                 :title="translations.articles.city" />

    <TextareaInput v-model="value.summary"
                   :title="translations.articles.summary"
                   :field="'summary'"
                   @selectImage="selectImage" />

    <TextareaInput v-model="value.text"
                   :title="translations.articles.text"
                   :rows="10"
                   :field="'text'"
                   @selectImage="selectImage" />

    <UserSelectInput v-model="value.writers"
                     :title="translations.articles.writers" />

    <DateInput v-model="value.publish"
               :title="translations.articles.publishDate" />

    <SelectInput v-model="value.published"
                 :title="translations.published" />

  </div>
</template>

<script>

  import DateInput from '../layout/forms/DateInput.vue';
  import SelectInput from '../layout/forms/SelectInput/SelectInput.vue';
  import TextInput from '../layout/forms/TextInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';
  import UserSelectInput from '../layout/forms/UserSelectInput.vue';

  export default {
    components: {
      DateInput,
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
    methods: {
      selectImage(parameter) {
        this.$emit('selectImage', parameter);
      }
    },
    props: ['value']
  }

</script>
