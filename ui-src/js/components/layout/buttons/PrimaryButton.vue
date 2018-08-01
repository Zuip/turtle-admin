<template>
  <button class="btn btn-primary" v-on:click="$emit('click')" >
    {{text}}
  </button>
</template>

<script>
  export default {
    props: ['text']
  }
</script>