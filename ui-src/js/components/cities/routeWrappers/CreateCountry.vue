<template>
  <Countries :openLayover="openNewCountryLayover" />
</template>

<script>

  import NewCountry from '../NewCountry.vue';
  import Countries from '../Countries.vue';

  export default {
    components: {
      Countries
    },
    methods: {
      openNewCountryLayover: function(updateCountryList) {
        this.$store.dispatch('openPopup', {
          component: NewCountry,
          props: {
            updateCountryList
          }
        });
      }
    }
  };
</script>
