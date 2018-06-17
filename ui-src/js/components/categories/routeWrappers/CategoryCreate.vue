<template>
  <Categories :categoryId="categoryId" :openLayover="openNewCategoryLayover" />
</template>

<script>

  import Categories from '../Categories.vue';
  import formatCategoryId from '../../../services/categories/formatCategoryId';
  import NewCategory from '../NewCategory.vue';

  export default {
    components: {
      Categories
    },
    computed: {
      categoryId() {
        return formatCategoryId(this.$route.params.categoryId);
      }
    },
    methods: {
      openNewCategoryLayover: function(updateCategoryList) {
        this.$store.dispatch('openPopup', {
          component: NewCategory,
          props: {
            updateCategoryList,
            categoryId: this.categoryId
          }
        });
      }
    }
  };
</script>
