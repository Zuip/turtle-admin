<template>
  <div>
    <Trips />
    <br />
    <Countries />
  </div>
</template>

<script>

  import Countries from './countries/Countries.vue';
  import Trips from './trips/Trips.vue'

  export default {
    components: {
      Countries,
      Trips
    },
    created() {
      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(function() {});
      }
    },
    props: ['openLayover']
  };
</script>
