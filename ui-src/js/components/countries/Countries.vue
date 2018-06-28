<template>
  <div class="countries">
    <div v-if="!selectedCountry">
      <h3>{{translations.countries}}</h3>
      <table class="table countries-list">
        <tbody>
          <tr v-for="country in countries">
            <td v-on:click="selectCountry(country)">{{country.name}}</td>
          </tr>
        </tbody>
      </table>
      <NewCountry @updateCountryList="updateCountryList" />
    </div>
    <div v-if="selectedCountry">
      <h3>
        <span class="countries-topic-link" v-on:click="goToCountriesList()">
          {{translations.countries}}
        </span>
        &gt; {{selectedCountry.name}}
      </h3>
      <table class="table">
        <tbody>
          <tr v-for="city in cities">
            <td>{{city.name}}</td>
          </tr>
        </tbody>
      </table>
      <NewCity :countryId="selectedCountry.id"
               @updateCityList="updateCityList" />
    </div>
  </div>
</template>

<script>

  import getCities from '../../apiCalls/countries/getCities';
  import getCountries from '../../apiCalls/countries/getCountries';
  import NewCity from './NewCity.vue';
  import NewCountry from './NewCountry.vue';

  export default {
    components: {
      NewCity,
      NewCountry
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.countries;
      }
    },
    created() {
      this.updateCountryList();
    },
    data() {
      return {
        cities: [],
        countries: [],
        selectedCountry: null
      };
    },
    methods: {
      goToCountriesList() {
        this.selectedCountry = null;
        this.cities = [];
        this.updateCountryList();
      },
      selectCountry(country) {
        this.selectedCountry = country;
        this.updateCityList();
      },
      updateCityList() {

        let contentLoadingName = 'loadCities';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCities(this.selectedCountry.id, 'fi').then(cities => {
          this.cities = cities;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      updateCountryList() {

        let contentLoadingName = 'loadCountries';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCountries('fi').then(countries => {
          this.countries = countries;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      }
    }
  };
</script>
