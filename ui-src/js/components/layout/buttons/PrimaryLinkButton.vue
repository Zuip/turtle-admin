<template>
  <router-link :to="link" class="btn btn-primary">
    {{text}}
  </router-link>
</template>

<script>
  export default {
    props: ['link', 'text']
  }
</script>