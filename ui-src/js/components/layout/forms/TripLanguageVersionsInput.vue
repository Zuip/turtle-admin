<template>
  <div>
    <p>{{translations.common.languageVersions}}</p>
    <LanguageVersion v-for="(tripLanguageVersion, index) in value"
                     v-on:input="updateTripLanguageVersion(index, $event)"
                     class="language-version-input-row"
                     :key="'language_version_' + index"
                     :value="tripLanguageVersion"
                     :languageVersions="languageVersions"
                     :reservedLanguages="reservedLanguages"
                     @removeTripLanguageVersion="removeTripLanguageVersion(index)" />
    <Button :text="translations.common.newLanguageVersion"
            v-on:click="addNewLanguageVersion"
            v-if="languageVersions.length !== reservedLanguages.length" />
  </div>
</template>

<script>

  import Button from '../buttons/PrimaryButton.vue';
  import getLanguageVersions from '../../../apiCalls/getLanguageVersions';
  import initializeTripLanguageVersion from '../../../services/formDataInitializers/trips/initializeTripLanguageVersion';
  import LanguageVersion from './src/tripLanguageVersionsInput/LanguageVersion.vue';

  export default {
    components: {
      Button,
      LanguageVersion
    },
    computed: {
      reservedLanguages() {
        return this.value.map(
          tripLanguageVersion => tripLanguageVersion.language.value
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
        languageVersions: []
      }
    },
    methods: {
      addNewLanguageVersion() {
        
        let tripLanguageVersion = initializeTripLanguageVersion();

        tripLanguageVersion.language.value = this.languageVersions.filter(
          languageVersion => !this.reservedLanguages.includes(languageVersion.code)
        )[0].code;

        this.value.push(tripLanguageVersion);
        this.$emit('input', this.value);
      },
      loadLanguageVersions() {

        this.$store.dispatch('startContentLoading', 'loadLanguageVersions');

        getLanguageVersions().then(languageVersions => {

          this.languageVersions = languageVersions;

          if(this.value[0].language.value === "") {
            this.value[0].language.value = languageVersions[0].code;
            this.$emit('input', this.value);
          }

          this.$store.dispatch('endContentLoading', 'loadLanguageVersions');

        }).catch(error => {
          console.log(error);
        });
      },
      removeTripLanguageVersion(indexToRemove) {

        if(this.reservedLanguages.length === 1) {
          alert(this.translations.trips.lastLanguageVersionCannotBeRemoved);
          return;
        }

        let newValue = this.value.filter(
          (tripLanguageVersion, index) => index !== indexToRemove
        );
        this.$emit('input', newValue);
      },
      updateTripLanguageVersion(index, newTripLanguageVersionValue) {
        this.value[index] = newTripLanguageVersionValue;
        this.$emit('input', this.value);
      }
    },
    props: ['value']
  }
</script>

<style>
  .language-version-input-row {
    margin-bottom: 20px;
  }
</style>