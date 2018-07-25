<template>
  <EditArticleSkeleton v-model="fields"
                       :topic="translations.articles.newArticle"
                       :save="save"
                       :visitId="$route.params.visitId"
                       :saved="saved" />
</template>

<script>

  import EditArticleSkeleton from './EditArticleSkeleton.vue';
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
      this.loadUsers();
    },
    methods: {
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
        postArticle(
          this.$route.params.visitId,
          'fi',
          {
            summary: this.fields.summary.value,
            text: this.fields.text.value,
            publish: this.fields.publish.value,
            published: this.fields.published.value,
            writers: this.fields.writers.value
          }
        ).then(data => {

          if(data.success) {
            this.saved = true;
            this.updateVisitPage();
          } else {
            if(data.failedFields.includes("text")) {
              this.fields.text.failed = true;
            }
          }

        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['updateVisitPage']
  }
</script>
