<template>
  <CountryCities :openLayover="openNewCityLayover" />
</template>

<script>

  import NewCity from '../NewCity.vue';
  import CountryCities from '../CountryCities.vue';

  export default {
    components: {
      CountryCities
    },
    methods: {
      openNewCityLayover: function(updateCityList) {
        this.$store.dispatch('openPopup', {
          component: NewCity,
          props: {
            updateCityList
          }
        });
      }
    }
  };
</script>
