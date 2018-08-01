<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">

      <TripForm class="popup-grid-content"
                v-model="fields"
                :topic="translations.trips.newTrip" />

      <div class="popup-grid-footer">

        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.common.save}}
        </button>

        <ClosePopupButton :text="translations.common.close"
                          :closeToAddress="closeToAddress" />

      </div>
    </div>

    <SavingSucceeded v-if="saved"
                     :closeToAddress="closeToAddress"
                     :topic="translations.trips.newTrip" />

  </div>
</template>

<script>

  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import initializeTrip from '../../services/formDataInitializers/trips/initializeTrip';
  import postTrip from '../../apiCalls/trips/postTrip';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';
  import TripForm from './TripForm.vue';

  export default {
    components: {
      ClosePopupButton,
      SavingSucceeded,
      TripForm
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        closeToAddress: '/trips',
        fields: initializeTrip(),
        saved: false
      }
    },
    methods: {
      save() {
        postTrip(
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
