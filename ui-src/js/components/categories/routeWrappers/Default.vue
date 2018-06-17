<template>
  <Categories :categoryId="categoryId" />
</template>

<script>

  import Categories from '../Categories.vue';
  import formatCategoryId from '../../../services/categories/formatCategoryId';

  export default {
    components: {
      Categories
    },
    computed: {
      categoryId() {
        return formatCategoryId(this.$route.params.categoryId);
      }
    }
  };
</script>
