<template>
  <EditArticleSkeleton v-model="fields"
                       :topic="translations.articles.editArticle"
                       :save="save"
                       :visitId="$route.params.visitId"
                       :saved="saved" />
</template>

<script>

  import EditArticleSkeleton from './EditArticleSkeleton.vue';
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
    created() {
      this.initializeArticle();
    },
    methods: {
      initializeArticle: function() {
        this.fields.summary.value = this.article.summary;
        this.fields.text.value = this.article.text;
        this.fields.publish.value = this.article.publish;
        this.fields.published.value = this.article.published ? 'yes' : 'no';
      },
      save: function() {
        putArticle(
          this.$route.params.visitId,
          this.$route.params.language,
          {
            summary: this.fields.summary.value,
            text: this.fields.text.value,
            publish: this.fields.publish.value,
            published: this.fields.published.value
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
    props: ['article', 'updateVisitPage']
  }
</script>
