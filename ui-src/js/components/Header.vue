<template>
  <div id="navigation-header-color-bar">
    <div id="navigation-header-content">
      <router-link :to="'/'">
        <div id="site-name" class="header-element">
          <h1>Zui.fi</h1>
        </div>
      </router-link>
      <div class="header-element logout-button" v-on:click="logout" v-if="userIsLoggedIn">
        <i class="fas fa-power-off"></i>
      </div>
      <div class="header-element username" v-if="userIsLoggedIn">{{user.username}}</div>
    </div>
  </div>
</template>

<script>

  import getLogout from '../apiCalls/getLogout';

  export default {
    computed: {
      userIsLoggedIn() {
        return this.$store.getters.userIsLoggedIn;
      },
      user() {
        return this.$store.getters.getUser;
      }
    },
    methods: {
      logout: function(event) {

        let contentLoadingName = 'logout';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getLogout().then(data => {
          if(data.success === true) {
            this.$store.dispatch('logout');
          }
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>
