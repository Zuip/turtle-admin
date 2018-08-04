<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">

      <VisitForm class="popup-grid-content"
                 v-model="fields"
                 :topic="translations.trips.visits.newVisit" />

      <div class="popup-grid-footer">

        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.common.save}}
        </button>

        <ClosePopupButton :closeToAddress="closeToAddress" :confirmClose="true" />

      </div>
    </div>

    <SavingSucceeded v-if="saved"
                     :closeToAddress="closeToAddress"
                     :topic="translations.trips.visits.newVisit" />

  </div>
</template>

<script>

  import citiesObjectToOptionsFormat from '../../../services/countries/citiesObjectToOptionsFormat';
  import ClosePopupButton from '../../overlay/ClosePopupButton.vue';
  import getCities from '../../../apiCalls/countries/getCities';
  import getTripUsers from '../../../apiCalls/trips/getTripUsers';
  import initializeVisit from '../../../services/formDataInitializers/trips/initializeVisit';
  import postTripCityVisit from '../../../apiCalls/trips/postTripCityVisit';
  import SavingSucceeded from '../../overlay/SavingSucceeded.vue';
  import VisitForm from './VisitForm.vue';

  export default {
    components: {
      ClosePopupButton,
      SavingSucceeded,
      VisitForm
    },
    computed: {
      closeToAddress() {
        return '/trips/' + this.$route.params.tripId;
      },
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    created() {
      this.loadCities();
      this.loadUsers();
    },
    data() {
      return {
        fields: initializeVisit(),
        saved: false
      }
    },
    methods: {
      loadCities() {

        let contentLoadingName = 'loadCities';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCities('fi').then(data => {
          this.fields.city.options = citiesObjectToOptionsFormat(data);
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      loadUsers() {

        let contentLoadingName = 'loadTripUsersToUserSelect';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getTripUsers(
          this.$route.params.tripId
        ).then(data => {
          this.fields.users.users = data;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      save() {
        postTripCityVisit(
          this.$route.params.tripId,
          {
            cityId: this.fields.city.value,
            start: this.fields.start.value,
            end: this.fields.end.value,
            users: this.fields.users.value
          }
        ).then(data => {
          this.saved = true;
        }).catch(
          error => console.log(error)
        );
      }
    }
  }
</script>
