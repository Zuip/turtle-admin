<template>
  <div class="overlay">
    <div class="popup content">
      <component :is="content.component" v-bind="content.props"></component>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['content']
  }
</script>
