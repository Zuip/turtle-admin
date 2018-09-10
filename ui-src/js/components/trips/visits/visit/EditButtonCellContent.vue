<template>
  <div>
    <router-link :to="editLanguageVersionLink"
                  class="btn btn-primary float-edit-button-right">

      <i class="fas fa-pencil-alt"></i>

    </router-link>
    <button v-if="props.languageVersion.published === null && !published"
            v-on:click="publish"
            class="btn btn-primary float-edit-button-right"
            style="margin-right: 5px">

      {{translations.common.publish}}

    </button>
  </div>
</template>

<script>

  import putArticleTranslationPublished from '../../../../apiCalls/articles/putArticleTranslationPublished';

  export default {
    computed: {
      editLanguageVersionLink() {
        return '/visits/' + this.props.visitId
             + '/article/translations/' + this.props.languageVersion.language;
      },
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        published: false
      };
    },
    methods: {
      publish() {
        putArticleTranslationPublished(
          this.props.visitId,
          this.props.languageVersion.language,
          {
            published: true
          }
        ).then(data => {
          this.published = true;
        }).catch(
          error => console.log(error)
        );
      }
    },
    props: ['props']
  }
</script>

<style>
  .float-edit-button-right {
    float: right;
  }
</style>