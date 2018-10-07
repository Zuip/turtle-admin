<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">

      <CityForm class="popup-grid-content"
                v-model="fields"
                :topic="translations.cities.editCity" />

      <div class="popup-grid-footer">

        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.common.save}}
        </button>

        <ClosePopupButton :closeToAddress="closeToAddress" :confirmClose="true" />

      </div>
    </div>

    <SavingSucceeded v-if="saved"
                     :closeToAddress="closeToAddress"
                     :topic="translations.cities.editCity" />

  </div>
</template>

<script>

  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import CityForm from './CityForm.vue';
  import getCity from '../../apiCalls/cities/getCity';
  import initializeCity from '../../services/formDataInitializers/cities/initializeCity';
  import initializeCityLanguageVersion from '../../services/formDataInitializers/cities/initializeCityLanguageVersion';
  import putCity from '../../apiCalls/cities/putCity';
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
    created() {
      getCity(
        this.$route.params.cityId
      ).then(city => {

        this.fields.latitude.value = city.latitude;
        this.fields.longitude.value = city.longitude;

        this.fields.languageVersions = city.languageVersions.map(cityLanguageVersion => {
          
          let languageVersion = initializeCityLanguageVersion(
            this.$store.getters.getTranslations
          );

          languageVersion.name.value = cityLanguageVersion.name;
          languageVersion.urlName.value = cityLanguageVersion.urlName;
          languageVersion.language.value = cityLanguageVersion.language;

          return languageVersion;
        });
      }).catch(
        error => console.log(error)
      );
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
        putCity(
          this.$route.params.cityId,
          {
            languageVersions: this.fields.languageVersions.map(languageVersion => ({
              name: languageVersion.name.value,
              urlName: languageVersion.urlName.value,
              language: languageVersion.language.value
            })),
            latitude: this.fields.latitude.value,
            longitude: this.fields.longitude.value
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
