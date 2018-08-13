<template>
  <div>
    <h3>{{translations.countries}}</h3>
    <CountriesList :countries="countries" />
    <Button :link="'/countries/new'" :text="translations.newCountry"/>
  </div>
</template>

<script>

  import getCountries from '../../apiCalls/cities/getCountries';
  import Button from '../layout/buttons/PrimaryLinkButton.vue';
  import CountriesList from './countriesList/CountriesList.vue';

  export default {
    components: {
      Button,
      CountriesList
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.cities;
      }
    },
    created() {
      
      this.updateCountryList();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateCountryList);
      }
    },
    data() {
      return {
        countries: []
      };
    },
    methods: {
      updateCountryList() {

        this.$store.dispatch('startContentLoading', 'loadCountries');

        getCountries('fi').then(countries => {
          this.countries = countries;
          this.$store.dispatch('endContentLoading', 'loadCountries');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['openLayover']
  };
</script>