<template>
  <div id="navigation-header-color-bar">
    <div id="navigation-header-content">
      <a href="/">
        <div id="site-name" class="header-element">
          <h1>Zui.fi</h1>
        </div>
      </a>
      <div class="header-element logout-button" v-on:click="logout" v-if="userIsLoggedIn">
        <i class="fas fa-power-off"></i>
      </div>
      <div class="header-element username" v-if="userIsLoggedIn">{{user.username}}</div>
    </div>
  </div>
</template>

<script>
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
        fetch(
          '/api/logout',
          {
            method: 'GET',
            credentials: 'same-origin'
          }
        ).then(
          data => data.json()
        ).then(data => {
          if(data.success === true) {
            this.$store.dispatch('logout');
          }
        }).catch(error => {

        });
      }
    }
  }
</script>
