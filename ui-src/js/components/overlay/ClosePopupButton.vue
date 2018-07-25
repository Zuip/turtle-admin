<template>
  <button type="button" class="btn btn-danger" v-on:click="close">
    {{text}}
  </button>
</template>

<script>
  export default {
    methods: {
      close: function() {
        this.$store.dispatch('closePopup');
        this.$router.push(this.closeToAddress);
      }
    },
    props: ['closeToAddress', 'text']
  }
</script>
