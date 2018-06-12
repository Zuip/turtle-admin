<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="mode === 'edit'">
      <div class="popup-grid-content">
        <h3>{{translations.articles.newArticle}}</h3>
        <ArticleForm v-model="fields" @selectImage="selectImage" />
      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <button type="button" class="btn btn-primary" v-on:click="preview">
          {{translations.preview}}
        </button>
        <ClosePopupButton :text="translations.close" />
      </div>
    </div>
    <ImageSelect v-if="mode === 'selectingImage'" @cancel="cancelImageSelect" @select="imageSelected" />
    <PreviewArticle v-if="mode === 'previewing'" :fields="fields" @stopPreviewing="stopPreviewing"/>
    <SavingSucceeded v-if="mode === 'saved'" />
  </div>
</template>

<script>

  import addTextInText from '../../services/addTextInText';
  import ArticleForm from './ArticleForm.vue';
  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import getUsers from '../../apiCalls/users/getUsers';
  import postArticle from '../../apiCalls/articles/postArticle';
  import PreviewArticle from './PreviewArticle.vue';
  import ImageSelect from '../images/ImageSelect.vue';
  import initializeArticle from '../../services/articles/initializeArticle';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';

  export default {
    data: function() {
      return {
        fields: initializeArticle(),
        previewing: false,
        selectingImage: {
          active: false
        },
        saved: false
      }
    },
    components: {
      ArticleForm,
      ClosePopupButton,
      PreviewArticle,
      ImageSelect,
      SavingSucceeded
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      },
      mode() {

        if(this.previewing) {
          return "previewing";
        }

        if(this.selectingImage.active) {
          return "selectingImage";
        }

        if(this.saved) {
          return "saved";
        }

        return "edit";
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
      preview: function() {
        this.previewing = true;
      },
      save: function() {
        postArticle({
          categoryId: this.getCategoryId(),
          topic: this.fields.topic.value,
          urlName: this.fields.urlName.value,
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
      },
      selectImage: function(data) {
        this.selectingImage = {
          active: true,
          field: data.field,
          startPosition: data.startPosition,
          endPosition: data.endPosition
        }
      },
      stopPreviewing() {
        this.previewing = false;
      },
      getCategoryId: function() {

        if(typeof this.$route.params.categoryId !== 'undefined') {
          return parseInt(this.$route.params.categoryId);
        }

        return null;
      }
    },
    props: ['updateCategoryList']
  }
</script>
