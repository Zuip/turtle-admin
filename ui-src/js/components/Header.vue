<template>
  <div id="navigation-header-color-bar">
    <div id="navigation-header-content">
      <a href="/">
        <div id="site-name" class="header-element">
          <h1>Zui.fi</h1>
        </div>
      </a>
      <div class="header-element logout-button" v-on:click="logout">
        <i class="fas fa-power-off"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      logout: function(event) {
        this.$store.dispatch('logout');
      }
    }
  }
</script>
