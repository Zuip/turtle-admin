<template>
  <EditArticleSkeleton v-model="fields"
                       :topic="translations.articles.newArticle"
                       :save="save"
                       :categoryId="categoryId"
                       :saved="saved" />
</template>

<script>

  import citiesObjectToOptionsFormat from '../../services/countries/citiesObjectToOptionsFormat';
  import EditArticleSkeleton from './EditArticleSkeleton.vue';
  import getCities from '../../apiCalls/countries/getCities';
  import getUsers from '../../apiCalls/users/getUsers';
  import postArticle from '../../apiCalls/articles/postArticle';
  import initializeArticle from '../../services/articles/initializeArticle';

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
      save() {
        postArticle({
          categoryId: this.categoryId,
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
    props: ['categoryId', 'updateCategoryList']
  }
</script>
