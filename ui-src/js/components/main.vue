<template>
  <div>
    <div id="grid-container">
      <Header />
      <div id="left-bar"></div>
      <div id="navigation-content">
        <Login v-if="!userIsLoggedIn" />
        <router-view v-if="userIsLoggedIn"></router-view>
      </div>
      <div id="right-div"></div>
    </div>
    <LoadingOverlay v-if="contentIsBeingLoaded" />
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Login from './login/Login.vue';
  import LoadingOverlay from './overlay/LoadingOverlay.vue';

  export default {
    components: {
      Header,
      Login,
      LoadingOverlay
    },
    computed: {
      userIsLoggedIn() {
        return this.$store.getters.userIsLoggedIn;
      },
      contentIsBeingLoaded() {
        return this.$store.getters.contentIsBeingLoaded;
      }
    }
  }
</script>
