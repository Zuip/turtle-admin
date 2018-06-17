<template>
  <div>
    <h3>{{translations.categoriesAndArticles}}</h3>
    <BackToParentCategoryLink :categoryId="categoryId" />
    <table class="table category-content-table">
      <tbody>
        <CategoryRow v-for="category in categories"
                     :data="category"
                     :key="'category_row_' + category.id"
                     @updateCategoryList="updateCategoryList" />
        <ArticleRow v-for="article in articles"
                    :data="article"
                    :key="'article_row_' + article.id"
                    @updateCategoryList="updateCategoryList" />
      </tbody>
    </table>
    <NewCategoryButton :categoryId="categoryId" />
    <NewArticleButton :categoryId="categoryId" v-if="categoryId !== 'root'" />
  </div>
</template>

<script>

  import BackToParentCategoryLink from './BackToParentCategoryLink.vue';
  import ArticleRow from '../articles/ArticleRow.vue';
  import CategoryRow from './CategoryRow.vue';
  import NewArticleButton from '../articles/NewArticleButton.vue';
  import NewCategoryButton from './NewCategoryButton.vue';

  import getArticles from '../../apiCalls/articles/getArticles';
  import getCategories from '../../apiCalls/categories/getCategories';

  export default {
    components: {
      ArticleRow,
      BackToParentCategoryLink,
      CategoryRow,
      NewArticleButton,
      NewCategoryButton
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.categories;
      }
    },
    created: function() {

      this.updateCategoryList();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateCategoryList);
      }
    },
    data: function() {
      return {
        categories: [],
        articles: []
      };
    },
    methods: {
      updateCategoryList: function() {

        let contentLoadingName = 'updateCategoryContent';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        let categories = getCategories(this.categoryId, this.$store.getters.getLanguage).then(data => {
          this.categories = data;
        }).catch(function(error) {
          console.log(error);
        });

        let articles = getArticles(this.categoryId, this.$store.getters.getLanguage).then(data => {
          this.articles = data;
        }).catch(function(error) {
          console.log(error);
        });

        Promise.all([categories, articles]).then(() => {
          this.$store.dispatch('endContentLoading', contentLoadingName);
        });
      }
    },
    props: [ 'categoryId', 'openLayover' ],
    watch: {
      categoryId: function(newCategoryId, oldCategoryId) {
        if(newCategoryId !== oldCategoryId) {
          this.updateCategoryList();
        }
      }
    }
  }
</script>
