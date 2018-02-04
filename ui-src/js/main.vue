<template>
  <div id="grid-container">
    <Header />
    <div id="left-bar"></div>
    <div id="navigation-content">
      <Login/>
    </div>
    <div id="right-div"></div>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Login from './views/login/Login.vue';

  export default {
    components: {
      Header,
      Login
    }
  }
</script>
