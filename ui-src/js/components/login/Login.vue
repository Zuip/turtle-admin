<template>
  <div>
    <h3>{{translations.youAreNotLoggedIn}}</h3>
    <a href="/login" class="btn btn-primary">
      {{translations.loginFromHere}}
    </a>
  </div>
</template>

<script>
  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations.login;
      }
    }
  }
</script>
