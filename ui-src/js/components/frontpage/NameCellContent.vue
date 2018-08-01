<template>
  <h3>
    <router-link :to="props.link">
      {{props.name}}
    </router-link>
  </h3>
</template>

<script>
  export default {
    props: ['props']
  }
</script>

<style>
  h3 {
    margin: 5px 0 0 0;
  }
</style>