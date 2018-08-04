<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">

      <CountryForm class="popup-grid-content"
                   v-model="fields"
                   :topic="translations.countries.newCountry" />

      <div class="popup-grid-footer">

        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.common.save}}
        </button>

        <ClosePopupButton :closeToAddress="closeToAddress" :confirmClose="true" />

      </div>
    </div>

    <SavingSucceeded v-if="saved"
                     :closeToAddress="closeToAddress"
                     :topic="translations.countries.newCountry" />

  </div>
</template>

<script>

  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import CountryForm from './CountryForm.vue';
  import initializeCountry from '../../services/formDataInitializers/cities/initializeCountry';
  import postCountry from '../../apiCalls/countries/postCountry';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';

  export default {
    components: {
      ClosePopupButton,
      CountryForm,
      SavingSucceeded
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        closeToAddress: '/countries',
        fields: initializeCountry(),
        saved: false
      }
    },
    methods: {
      save() {
        postCountry(
          {
            languageVersions: this.fields.languageVersions.map(languageVersion => ({
              name: languageVersion.name.value,
              urlName: languageVersion.urlName.value,
              language: languageVersion.language.value
            }))
          }
        ).then(() => {
          this.saved = true;
        }).catch(
          error => console.log(error)
        );
      }
    }
  }
</script>
