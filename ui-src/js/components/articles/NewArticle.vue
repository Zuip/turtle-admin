<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">
      <div class="popup-grid-content">
        <h3>{{translations.articles.newArticle}}</h3>
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
  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import getUsers from '../../apiCalls/getUsers';
  import postArticle from '../../apiCalls/postArticle';
  import initializeArticle from '../../services/articles/initializeArticle';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';

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
      save: function() {
        postArticle({
          categoryId: this.getCategoryId(),
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
