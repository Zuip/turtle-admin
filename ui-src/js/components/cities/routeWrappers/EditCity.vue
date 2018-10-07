<template>
  <CountryCities :openLayover="openNewCityLayover" />
</template>

<script>

  import EditCity from '../EditCity.vue';
  import CountryCities from '../CountryCities.vue';

  export default {
    components: {
      CountryCities
    },
    methods: {
      openNewCityLayover: function(updateCityList) {
        this.$store.dispatch('openPopup', {
          component: EditCity,
          props: {
            updateCityList
          }
        });
      }
    }
  };
</script>
