<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved && !selectingImage.active">
      <div class="popup-grid-content">
        <h3>{{translations.articles.editArticle}}</h3>
        <ArticleForm v-model="fields" @selectImage="selectImage" />
      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <ClosePopupButton :text="translations.close" />
      </div>
    </div>
    <ImageSelect v-if="!saved && selectingImage.active" @cancel="cancelImageSelect" @select="imageSelected" />
    <SavingSucceeded v-if="saved" />
  </div>
</template>

<script>

  import addTextInText from '../../services/addTextInText';
  import ArticleForm from './ArticleForm.vue';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';
  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import getArticle from '../../apiCalls/articles/getArticle';
  import getUsers from '../../apiCalls/users/getUsers';
  import initializeArticle from '../../services/articles/initializeArticle';
  import ImageSelect from '../images/ImageSelect.vue';
  import putArticle from '../../apiCalls/articles/putArticle';

  export default {
    data: function() {
      return {
        fields: initializeArticle(),
        selectingImage: {
          active: false
        },
        saved: false
      }
    },
    components: {
      ArticleForm,
      ClosePopupButton,
      ImageSelect,
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
      cancelImageSelect: function() {
        this.selectingImage = {
          active: false
        };
      },
      imageSelected: function(text) {

        this.fields[this.selectingImage.field].value = addTextInText(
          this.fields[this.selectingImage.field].value,
          text,
          this.selectingImage.startPosition,
          this.selectingImage.endPosition
        );

        this.cancelImageSelect();
      },
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
      selectImage: function(data) {
        this.selectingImage = {
          active: true,
          field: data.field,
          startPosition: data.startPosition,
          endPosition: data.endPosition
        };
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
