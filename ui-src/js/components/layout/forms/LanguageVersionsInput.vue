<template>
  <div>
    <p>{{translations.common.languageVersions}}</p>
    <LanguageVersion v-for="(languageVersion, index) in value"
                     v-on:input="updateLanguageVersion(index, $event)"
                     class="language-version-input-row"
                     :key="'language_version_' + index"
                     :value="languageVersion"
                     :languages="languages"
                     :reservedLanguages="reservedLanguages"
                     @removeLanguageVersion="removeLanguageVersion(index)" />
    <Button :text="translations.common.newLanguageVersion"
            v-on:click="addNewLanguageVersion"
            v-if="languages.length !== reservedLanguages.length" />
  </div>
</template>

<script>

  import Button from '../buttons/PrimaryButton.vue';
  import getLanguages from '../../../apiCalls/getLanguageVersions';
  import LanguageVersion from './src/languageVersionsInput/LanguageVersion.vue';

  export default {
    components: {
      Button,
      LanguageVersion
    },
    computed: {
      reservedLanguages() {
        return this.value.map(
          languageVersion => languageVersion.language.value
        );
      },
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    created() {
      this.loadLanguageVersions();
    },
    data() {
      return {
        languages: []
      }
    },
    methods: {
      addNewLanguageVersion() {
        
        let languageVersion = this.initializeLanguageVersion();

        languageVersion.language.value = this.languages.filter(
          languageVersion => !this.reservedLanguages.includes(languageVersion.code)
        )[0].code;

        this.value.push(languageVersion);
        this.$emit('input', this.value);
      },
      loadLanguageVersions() {

        this.$store.dispatch('startContentLoading', 'loadLanguageVersions');

        getLanguages().then(languages => {

          this.languages = languages;

          if(this.value[0].language.value === "") {
            this.value[0].language.value = languages[0].code;
            this.$emit('input', this.value);
          }

          this.$store.dispatch('endContentLoading', 'loadLanguageVersions');

        }).catch(error => {
          console.log(error);
        });
      },
      removeLanguageVersion(indexToRemove) {

        if(this.reservedLanguages.length === 1) {
          alert(this.translations.forms.lastLanguageVersionCannotBeRemoved);
          return;
        }

        let newValue = this.value.filter(
          (languageVersion, index) => index !== indexToRemove
        );
        this.$emit('input', newValue);
      },
      updateLanguageVersion(index, newLanguageVersionValue) {
        this.value[index] = newLanguageVersionValue;
        this.$emit('input', this.value);
      }
    },
    props: ['initializeLanguageVersion', 'value']
  }
</script>

<style>
  .language-version-input-row {
    margin-bottom: 20px;
  }
</style>