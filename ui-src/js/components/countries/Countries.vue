<template>
  <div class="countries" v-if="userHasRequiredPermissions">
    <div v-if="!selectedCountry">
      <h3>{{translations.countries}}</h3>
      <table class="table countries-list">
        <tbody>
          <tr v-for="(country, index) in countries" :key="'country_' + index">
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
          <tr v-for="(city, index) in cities" :key="'city_' + index">
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

  import getCountryCities from '../../apiCalls/countries/getCountryCities';
  import getCountries from '../../apiCalls/countries/getCountries';
  import getUserPermissionsTo from '../../apiCalls/users/getUserPermissionsTo';
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
      this.updateUserHasRequiredPermissions().then(() => {
        this.updateCountryList();
      });
    },
    data() {
      return {
        cities: [],
        countries: [],
        selectedCountry: null,
        userHasRequiredPermissions: false
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

        if(!this.userHasRequiredPermissions) {
          return;
        }

        let contentLoadingName = 'loadCities';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCountryCities(this.selectedCountry.id, 'fi').then(cities => {
          this.cities = cities;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      updateCountryList() {

        if(!this.userHasRequiredPermissions) {
          return;
        }

        let contentLoadingName = 'loadCountries';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCountries('fi').then(countries => {
          this.countries = countries;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      updateUserHasRequiredPermissions() {

        let contentLoadingName = 'loadUserCityPermissions';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        return getUserPermissionsTo('cities').then(permissions => {
          this.userHasRequiredPermissions = permissions.length > 0;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
    }
  };
</script>
