<template>
  <div class="overlay">
    <div class="popup content">
      <component :is="content"></component>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['content']
  }
</script>
