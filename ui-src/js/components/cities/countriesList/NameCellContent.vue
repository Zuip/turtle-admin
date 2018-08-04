<template>
  <router-link :to="'/countries/' + props.id + '/cities'">
    {{props.name}}
  </router-link>
</template>

<script>
  export default {
    props: ['props']
  }
</script>