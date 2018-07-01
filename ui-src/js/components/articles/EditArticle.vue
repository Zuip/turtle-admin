<template>
  <EditArticleSkeleton v-model="fields"
                       :topic="translations.articles.editArticle"
                       :save="save"
                       :categoryId="article.categoryId"
                       :saved="saved" />
</template>

<script>

  import citiesObjectToOptionsFormat from '../../services/countries/citiesObjectToOptionsFormat';
  import EditArticleSkeleton from './EditArticleSkeleton.vue';
  import getCities from '../../apiCalls/countries/getCities';
  import getUsers from '../../apiCalls/users/getUsers';
  import initializeArticle from '../../services/articles/initializeArticle';
  import putArticle from '../../apiCalls/articles/putArticle';

  export default {
    data: function() {
      return {
        fields: initializeArticle(),
        saved: false
      }
    },
    components: {
      EditArticleSkeleton
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    created: function() {
      this.loadCities();
      this.loadUsers();
      this.initializeArticle();
    },
    methods: {
      loadCities() {

        let contentLoadingName = 'loadCities';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getCities('fi').then(data => {
          this.fields.city.options = citiesObjectToOptionsFormat(data);
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      loadUsers() {

        let contentLoadingName = 'loadUsersToUserSelect';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getUsers().then(data => {
          this.fields.writers.users = data;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      initializeArticle: function() {
        this.fields.topic.value = this.article.topic;
        this.fields.urlName.value = this.article.urlName;
        this.fields.city.value = this.article.cityId;
        this.fields.summary.value = this.article.summary;
        this.fields.text.value = this.article.text;
        this.fields.publish.value = this.article.publish;
        this.fields.published.value = this.article.published ? 'yes' : 'no';
        this.fields.writers.value = this.article.writers;
      },
      save: function() {
        putArticle(this.$route.params.articleId, 'fi', {
          topic: this.fields.topic.value,
          urlName: this.fields.urlName.value,
          cityId: this.fields.city.value,
          summary: this.fields.summary.value,
          text: this.fields.text.value,
          publish: this.fields.publish.value,
          published: this.fields.published.value,
          writers: this.fields.writers.value
        }).then(data => {

          if(data.success) {
            this.saved = true;
            this.updateCategoryList();
          } else {

            if(data.failedFields.includes("text")) {
              this.fields.text.failed = true;
            }

            if(data.failedFields.includes("topic")) {
              this.fields.topic.failed = true;
            }

            if(data.failedFields.includes("urlName")) {
              this.fields.urlName.failed = true;
            }
          }

        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['article', 'updateCategoryList']
  }
</script>
