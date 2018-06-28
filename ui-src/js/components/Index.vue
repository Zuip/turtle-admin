<template>
  <div>
    <DefaultCategoryRouteWrapper />
    <Countries />
  </div>
</template>

<script>

  import Countries from './countries/Countries.vue';
  import DefaultCategoryRouteWrapper from './categories/routeWrappers/Default.vue';

  export default {
    components: {
      Countries,
      DefaultCategoryRouteWrapper
    }
  };
</script>
