<template>
  <div class="input-group">

    <div class="input-group-prepend">
      <select class="language-select form-control"
              v-model="value.language.value"
              v-on:change="emitChanges()">

        <option v-for="language in availableLanguages"
                :value="language.code"
                :key="'language_' + language.code">
          {{language.code}}
        </option>

      </select>
    </div>

    <InputField v-for="field in Object.keys(value)"
                v-if="field !== 'language'"
                :key="'language_version_field_' + field"
                v-model="value[field]" />

    <div class="input-group-append">
      <button class="btn btn-danger"
              v-on:click="$emit('removeLanguageVersion')">

        <i class="fas fa-trash-alt"></i>
      
      </button>
    </div>
    
  </div>
</template>

<script>

  import InputField from './InputField.vue';

  export default {
    components: {
      InputField
    },
    computed: {
      availableLanguages() {
        return this.languages.filter(language => {

          if(language.code === this.value.language.value) {
            return true;
          }

          if(this.reservedLanguages.includes(language.code)) {
            return false;
          }

          return true;
        });
      },
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      emitChanges() {
        this.$emit('input', this.value);
      }
    },
    props: ['value', 'languages', 'reservedLanguages']
  }
</script>

<style>
  .language-select {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>