<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">

      <CityForm class="popup-grid-content"
                v-model="fields"
                :topic="translations.cities.newCity" />

      <div class="popup-grid-footer">

        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.common.save}}
        </button>

        <ClosePopupButton :closeToAddress="closeToAddress" :confirmClose="true" />

      </div>
    </div>

    <SavingSucceeded v-if="saved"
                     :closeToAddress="closeToAddress"
                     :topic="translations.cities.newCity" />

  </div>
</template>

<script>

  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import CityForm from './CityForm.vue';
  import initializeCity from '../../services/formDataInitializers/cities/initializeCity';
  import postCity from '../../apiCalls/cities/postCity';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';

  export default {
    components: {
      ClosePopupButton,
      CityForm,
      SavingSucceeded
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        closeToAddress: '/countries/' + this.$route.params.countryId + '/cities',
        fields: initializeCity(this.$store.getters.getTranslations),
        saved: false
      }
    },
    methods: {
      save() {
        postCity(
          this.$route.params.countryId,
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
