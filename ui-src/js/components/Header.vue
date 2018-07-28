<template>
  <div id="navigation-header-color-bar">
    <div id="navigation-header-content">
      <router-link :to="'/'">
        <div id="site-name" class="header-element">
          <h1>Turtle.travel</h1>
          <h5>{{translations.admin}}</h5>
        </div>
      </router-link>
      <div class="header-element float-right">
        <a href="/" class="btn btn-primary">
          {{translations.toTheMainSite}}
        </a>
      </div>
      <div class="header-element username float-right" v-if="userIsLoggedIn">
        {{user.username}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations.header;
      },
      user() {
        return this.$store.getters.getUser;
      },
      userIsLoggedIn() {
        return this.$store.getters.userIsLoggedIn;
      }
    }
  }
</script>
