<template>
  <Button :text="translations.common.close"
          :confirmationMessage="confirmationMessage"
          v-on:click="close" />
</template>

<script>

  import Button from '../layout/buttons/DangerButton.vue';

  export default {
    components: {
      Button
    },
    computed: {
      confirmationMessage() {
        if(this.confirmClose === true) {
          return this.translations.overlay.closeConfirmation;
        }
      },
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      close: function() {
        this.$store.dispatch('closePopup');
        this.$router.push(this.closeToAddress);
      }
    },
    props: ['closeToAddress', 'confirmClose']
  }
</script>
