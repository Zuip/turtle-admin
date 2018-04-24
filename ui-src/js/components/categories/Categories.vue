<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <BackToParentCategoryLink :categoryId="categoryId" />
    <table class="table category-content-table">
      <tbody>
        <CategoryRow v-for="category in categories"
                     :data="category"
                     :key="category.id"
                     @updateCategoryList="updateCategoryList"/>
      </tbody>
    </table>
    <NewCategoryButton :categoryId="categoryId" />
  </div>
</template>

<script>

  import BackToParentCategoryLink from './BackToParentCategoryLink.vue';
  import CategoryRow from './CategoryRow.vue';
  import NewCategory from './NewCategory.vue';
  import NewCategoryButton from './NewCategoryButton.vue';

  import getCategories from '../../apiCalls/getCategories';

  export default {
    components: {
      BackToParentCategoryLink,
      CategoryRow,
      NewCategoryButton
    },
    computed: {
      categoryId() {

        if(typeof this.$route.params.categoryId === 'undefined') {
          return 'root';
        }

        return this.$route.params.categoryId;
      },
      translations() {
        return this.$store.getters.getTranslations.categories;
      }
    },
    created: function() {

      this.updateCategoryList();

      if(this.$attrs.action === 'new') {
        this.openNewCategoryPopup();
      }
    },
    data: function() {
      return {
        categories: []
      };
    },
    methods: {
      openNewCategoryPopup: function() {
        this.$store.dispatch( 'openPopup', {
          component: NewCategory,
          props: {
            updateCategoryList: this.updateCategoryList
          }
        });
      },
      updateCategoryList: function() {

        let contentLoadingName = 'updateCategoryContent';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCategories(this.categoryId, this.$store.getters.getLanguage).then(data => {
          this.categories = data;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(function(error) {
          console.log(error);
        });
      }
    },
    watch: {
      '$attrs.action': function(action) {
        if(action === 'new') {
          this.openNewCategoryPopup();
        }
      },
      categoryId: function(newCategoryId, oldCategoryId) {
        if(newCategoryId !== oldCategoryId) {
          this.updateCategoryList();
        }
      }
    }
  }
</script>
