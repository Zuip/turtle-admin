<template>
  <router-link :to="'/trips/' + props.id">
    {{props.name}}
  </router-link>
</template>

<script>
  export default {
    props: ['props']
  }
</script>