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

        if(this.categoryId === 'root') {
          this.$router.push('/');
          return;
        }

        this.$router.push('/categories/' + this.categoryId);
      }
    },
    props: ['categoryId', 'text']
  }
</script>
