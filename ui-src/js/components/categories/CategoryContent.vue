<template>
  <div>
    <table class="table category-content-table">
      <tbody>
        <CategoryRow v-for="category in categories" :data="category" :key="category.id"/>
      </tbody>
    </table>
  </div>
</template>

<script>
  import CategoryRow from './CategoryRow.vue';
  import getCategories from '../../apiCalls/getCategories';

  export default {
    components: {
      CategoryRow
    },
    data: function() {
      return {
        categories: []
      };
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.categories;
      }
    },
    created: function() {

      let contentLoadingName = 'loadCategoryContent';
      this.$store.dispatch('startContentLoading', contentLoadingName);

      getCategories('root', this.$store.getters.getLanguage).then(data => {
        this.categories = data;
        this.$store.dispatch('endContentLoading', contentLoadingName);
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
</script>
