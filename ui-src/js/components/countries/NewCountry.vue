<template>
  <div>
    <button class="btn btn-primary"
            v-on:click="startCreatingNewCountry"
            v-if="!creatingNewCountry">

      {{translations.countries.newCountry}}

    </button>
    <div class="input-group" v-if="creatingNewCountry">
      <input v-model="countryName"
             type="text"
             class="form-control"
             :class="{ failed }"
             :placeholder="translations.common.name">
      <input v-model="urlName"
             type="text"
             class="form-control"
             :class="{ failed }"
             :placeholder="translations.common.urlName">
      <div class="input-group-append">
        <button class="btn btn-danger" v-on:click="stopSavingCountry">
          {{translations.common.cancel}}
        </button>
      </div>
      <div class="input-group-append">
        <button class="btn btn-primary" v-on:click="saveCountry">
          {{translations.common.save}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

  import postCountry from '../../apiCalls/countries/postCountry';

  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        countryName: '',
        urlName: '',
        creatingNewCountry: false,
        failed: false
      }
    },
    methods: {
      saveCountry() {

        let contentLoadingName = 'saveNewCountry';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        postCountry({
          name: this.countryName,
          urlName: this.urlName
        }).then(data => {
          this.$emit('updateCountryList');
          this.stopSavingCountry();
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          if(error.invalidInput) {
            this.failed = true;
            this.$store.dispatch('endContentLoading', contentLoadingName);
          } else {
            console.log(error);
          }
        });
      },
      startCreatingNewCountry() {
        this.creatingNewCountry = true;
      },
      stopSavingCountry() {
        this.creatingNewCountry = false;
        this.countryName = '';
        this.failed = false;
        this.urlName = '';
      }
    }
  }
</script>
