<template>
  <router-link :to="'/visits/' + props.id">
    {{props.city.name}}
  </router-link>
</template>

<script>
  export default {
    props: ['props']
  }
</script>