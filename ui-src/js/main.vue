<template>
  <div id="grid-container">
    <Header />
    <div id="left-bar"></div>
    <div id="content">
      <p>Welcome to Zui.fi Admin page!</p>
      <button>Description</button>
    </div>
    <div id="right-div"></div>
  </div>
</template>

<script>
  import Header from './Header.vue'

  export default {
    components: {
      Header
    }
  }
</script>
