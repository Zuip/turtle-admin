<template>
  <div>
    <button class="btn btn-primary"
            v-on:click="startCreatingNewCity"
            v-if="!creatingNewCity">

      {{translations.countries.newCity}}

    </button>
    <div class="input-group" v-if="creatingNewCity">
      <input v-model="cityName"
             type="text"
             class="form-control"
             :class="{ failed }"
             :placeholder="translations.name">
      <div class="input-group-append">
        <button class="btn btn-danger" v-on:click="stopSavingCity">
          {{translations.cancel}}
        </button>
      </div>
      <div class="input-group-append">
        <button class="btn btn-primary" v-on:click="saveCity">
          {{translations.save}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

  import postCity from '../../apiCalls/countries/postCity';

  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        cityName: '',
        creatingNewCity: false,
        failed: false
      }
    },
    methods: {
      saveCity() {

        let contentLoadingName = 'saveNewCity';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        postCity(this.countryId, this.cityName).then(data => {
          this.$emit('updateCityList');
          this.stopSavingCity();
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
      startCreatingNewCity() {
        this.creatingNewCity = true;
      },
      stopSavingCity() {
        this.creatingNewCity = false;
        this.cityName = '';
        this.failed = false;
      }
    },
    props: [ 'countryId' ]
  }
</script>
