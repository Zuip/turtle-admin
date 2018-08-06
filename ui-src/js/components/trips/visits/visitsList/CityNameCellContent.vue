<template>
  <router-link :to="'/visits/' + props.id">
    {{props.city.name}}, {{props.city.country.name}}
  </router-link>
</template>

<script>
  export default {
    props: ['props']
  }
</script>