<template>
  <div>

    <TextareaInput v-model="value.summary"
                   :title="translations.articles.summary"
                   :field="'summary'"
                   @selectImage="selectImage" />

    <TextareaInput v-model="value.text"
                   :title="translations.articles.text"
                   :rows="10"
                   :field="'text'"
                   @selectImage="selectImage" />

    <DateInput v-model="value.publish"
               :title="translations.articles.publishDate" />

    <SelectInput v-model="value.published"
                 :title="translations.common.published" />

  </div>
</template>

<script>

  import DateInput from '../layout/forms/DateInput.vue';
  import SelectInput from '../layout/forms/SelectInput/SelectInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';

  export default {
    components: {
      DateInput,
      SelectInput,
      TextareaInput
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
