<template>
  <EditArticleSkeleton v-model="fields"
                       v-if="fields"
                       :topic="translations.articles.newArticleTranslation"
                       :save="save"
                       :visitId="$route.params.visitId"
                       :saved="saved" />
</template>

<script>

  import EditArticleSkeleton from './EditArticleSkeleton.vue';
  import getAvailableArticleTranslations from '../../apiCalls/articles/getAvailableTranslations';
  import postArticleTranslation from '../../apiCalls/articles/postArticleTranslation';
  import initializeArticle from '../../services/articles/initializeArticle';

  export default {
    data() {
      return {
        fields: null,
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
    created() {
      this.loadAvailableTranslations();
    },
    methods: {
      loadAvailableTranslations() {

        let contentLoadingName = 'loadAvailableTranslations';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getAvailableArticleTranslations(
          this.$route.params.visitId
        ).then(languages => {
          this.fields = initializeArticle(languages);
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      save() {
        postArticleTranslation(
          this.$route.params.visitId,
          this.fields.language.value,
          {
            summary: this.fields.summary.value,
            text: this.fields.text.value
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
