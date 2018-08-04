<template>
  <button class="btn btn-danger" v-on:click="buttonClicked()" >
    {{text}}
  </button>
</template>

<script>
  export default {
    methods: {
      buttonClicked() {

        if(typeof this.confirmationMessage !== 'undefined') {
          if(!confirm(this.confirmationMessage)) {
            return;
          }
        }

        this.$emit('click');
      }
    },
    props: ['text', 'confirmationMessage']
  }
</script>