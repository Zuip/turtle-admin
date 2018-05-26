<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">
      <div class="popup-grid-content">
        <h3>{{translations.articles.editArticle}}</h3>
        <ArticleForm v-model="fields" />
      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <ClosePopupButton :text="translations.close" />
      </div>
    </div>
    <SavingSucceeded v-if="saved" />
  </div>
</template>

<script>

  import ArticleForm from './ArticleForm.vue';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';
  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import getArticle from '../../apiCalls/getArticle';
  import getUsers from '../../apiCalls/getUsers';
  import initializeArticle from '../../services/articles/initializeArticle';
  import putArticle from '../../apiCalls/putArticle';

  export default {
    data: function() {
      return {
        fields: initializeArticle(),
        saved: false
      }
    },
    components: {
      ArticleForm,
      ClosePopupButton,
      SavingSucceeded
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    created: function() {

      this.initializeArticle();

      let contentLoadingName = 'loadUsersToUserSelect';
      this.$store.dispatch('startContentLoading', contentLoadingName);

      getUsers().then(data => {
        this.fields.writers.users = data;
        this.$store.dispatch('endContentLoading', contentLoadingName);
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      initializeArticle: function() {

        let contentLoadingName = 'loadArticleData';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getArticle(this.$route.params.articleId, 'fi').then(data => {
          this.fields.topic.value = data.topic;
          this.fields.urlName.value = data.urlName;
          this.fields.summary.value = data.summary;
          this.fields.text.value = data.text;
          this.fields.publishDate.value = data.publishDate;
          this.fields.published.value = data.published ? 'yes' : 'no';
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(error => {
          console.log(error);
        });
      },
      save: function() {
        putArticle(this.$route.params.articleId, 'fi', {
          topic: this.fields.topic.value,
          urlName: this.fields.urlName.value,
          summary: this.fields.summary.value,
          text: this.fields.text.value,
          publishDate: this.fields.publishDate.value,
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
      },
      getCategoryId() {

        if(typeof this.$route.params.categoryId !== 'undefined') {
          return parseInt(this.$route.params.categoryId);
        }

        return null;
      }
    },
    props: ['updateCategoryList']
  }
</script>
