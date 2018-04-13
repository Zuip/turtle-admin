<template>
  <div id="grid-container">
    <Header />
    <div id="left-bar"></div>
    <div id="navigation-content">
      <Login v-if="!userIsLoggedIn" />
      <router-view v-if="userIsLoggedIn"></router-view>
    </div>
    <div id="right-div"></div>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Login from './login/Login.vue';

  export default {
    components: {
      Header,
      Login
    },
    computed: {
      userIsLoggedIn() {
        return this.$store.getters.userIsLoggedIn;
      }
    }
  }
</script>
