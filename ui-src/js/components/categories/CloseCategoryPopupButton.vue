<template>
  <button type="button" class="btn btn-danger" v-on:click="close">
    {{text}}
  </button>
</template>

<script>
  export default {
    methods: {
      close: function() {

        this.$emit('updateCategoryList');
        this.$store.dispatch('closePopup');

        if(this.getCategoryId() === 'root') {
          this.$router.push('/');
          return;
        }

        this.$router.push('/categories/' + this.getCategoryId());
      },
      getCategoryId() {

        if(typeof this.$route.params.categoryId !== 'undefined') {
          return parseInt(this.$route.params.categoryId);
        }

        return 'root';
      }
    },
    props: ['text', 'updateCategoryList']
  }
</script>
