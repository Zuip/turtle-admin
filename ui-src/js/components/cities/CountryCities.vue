<template>
  <div>
    <h3>
      <router-link :to="'/countries/'">
        {{translations.countries}}
      </router-link>
      &gt;
      {{country.name}}
      &gt;
      {{translations.cities}}
    </h3>
    <CitiesList :cities="cities" />
    <Button :link="'/countries/' + this.$route.params.countryId + '/cities/new'"
            :text="translations.newCity"/>
  </div>
</template>

<script>

  import getCountry from '../../apiCalls/countries/getCountry';
  import getCountryCities from '../../apiCalls/countries/getCountryCities';
  import Button from '../layout/buttons/PrimaryLinkButton.vue';
  import CitiesList from './citiesList/CitiesList.vue';

  export default {
    components: {
      Button,
      CitiesList
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.countries;
      }
    },
    created() {
      
      this.updateCityList();
      this.updateCountry();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateCityList);
      }
    },
    data() {
      return {
        cities: [],
        country: {
          id: null,
          name: null
        }
      };
    },
    methods: {
      updateCityList() {

        this.$store.dispatch('startContentLoading', 'loadCountryCities');

        getCountryCities(this.$route.params.countryId, 'fi').then(cities => {
          this.cities = cities;
          this.$store.dispatch('endContentLoading', 'loadCountryCities');
        }).catch(error => {
          console.log(error);
        });
      },
      updateCountry() {

        this.$store.dispatch('startContentLoading', 'loadCityCountry');

        getCountry(this.$route.params.countryId, 'fi').then(country => {
          this.country = country;
          this.$store.dispatch('endContentLoading', 'loadCityCountry');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['openLayover']
  };
</script>