<template>
  <div>

    <SelectInput v-model="value.language"
                 v-if="typeof value.language !== 'undefined'"
                 :title="translations.common.language" />

    <TextareaInput v-model="value.summary"
                   :title="translations.articles.summary"
                   :field="'summary'"
                   @selectImage="selectImage" />

    <TextareaInput v-model="value.text"
                   :title="translations.articles.text"
                   :rows="10"
                   :field="'text'"
                   @selectImage="selectImage" />

  </div>
</template>

<script>

  import SelectInput from '../layout/forms/SelectInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';

  export default {
    components: {
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
    props: ['value', 'mode']
  }

</script>
