<template>
  <Categories :categoryId="parentCategoryId"
              :openLayover="openEditCategoryLayover"
              v-if="parentCategoryId !== null" />
</template>

<script>

  import Categories from '../Categories.vue';
  import getCategory from '../../../apiCalls/categories/getCategory';
  import EditCategory from '../EditCategory.vue';

  export default {
    components: {
      Categories
    },
    computed: {
      parentCategoryId() {

        if(this.category === null) {
          return null;
        }

        return this.category.parentId === null ? 'root' : this.category.parentId;
      }
    },
    created() {

      let contentLoadingName = 'loadCategoryData';
      this.$store.dispatch('startContentLoading', contentLoadingName);

      getCategory(this.$route.params.categoryId, 'fi').then(data => {
        this.category = data;
        this.$store.dispatch('endContentLoading', contentLoadingName);
      }).catch(error => {
        console.log(error);
      });
    },
    data() {
      return {
        category: null
      }
    },
    methods: {
      openEditCategoryLayover(updateCategoryList) {
        this.$store.dispatch('openPopup', {
          component: EditCategory,
          props: {
            category: this.category,
            parentCategoryId: this.parentCategoryId,
            updateCategoryList
          }
        });
      }
    }
  };
</script>
