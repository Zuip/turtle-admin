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

        <ClosePopupButton :closeToAddress="closeToAddress" :confirmClose="true" />

      </div>
    </div>

    <SavingSucceeded v-if="saved"
                     :closeToAddress="closeToAddress"
                     :topic="translations.trips.newTrip" />

  </div>
</template>

<script>

  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import getUsers from '../../apiCalls/users/getUsers';
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
    created() {
      this.loadUsers();
    },
    data() {
      return {
        closeToAddress: '/trips',
        fields: initializeTrip(this.$store.getters.getTranslations),
        saved: false
      }
    },
    methods: {
      loadUsers() {

        let contentLoadingName = 'loadUsersToUserSelect';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getUsers().then(data => {
          this.fields.users.users = data;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      save() {
        postTrip(
          {
            languageVersions: this.fields.languageVersions.map(languageVersion => ({
              name: languageVersion.name.value,
              urlName: languageVersion.urlName.value,
              language: languageVersion.language.value
            })),
            users: this.fields.users.value
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
