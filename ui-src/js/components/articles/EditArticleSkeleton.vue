<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="mode === 'edit'">
      <div class="popup-grid-content">
        <h3>{{topic}}</h3>
        <ArticleForm v-model="value" @selectImage="selectImage" />
      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <button type="button" class="btn btn-primary" v-on:click="preview">
          {{translations.preview}}
        </button>
        <ClosePopupButton :text="translations.close"
                          :closeToAddress="closeToAddress" />
      </div>
    </div>

    <ImageSelect v-if="mode === 'selectingImage'"
                 @cancel="cancelImageSelect"
                 @select="imageSelected" />

    <PreviewArticle v-if="mode === 'previewing'"
                    :fields="value"
                    @stopPreviewing="stopPreviewing"/>

    <SavingSucceeded v-if="mode === 'saved'"
                    :closeToAddress="closeToAddress"
                    :topic="topic" />
  </div>
</template>

<script>

  import addTextInText from '../../services/addTextInText';
  import ArticleForm from './ArticleForm.vue';
  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import ImageSelect from '../images/ImageSelect.vue';
  import PreviewArticle from './PreviewArticle.vue';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';

  export default {
    components: {
      ArticleForm,
      ClosePopupButton,
      ImageSelect,
      PreviewArticle,
      SavingSucceeded
    },
    computed: {
      closeToAddress() {
        return '/visits/' + this.visitId;
      },
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
    data() {
      return {
        selectingImage: {
          active: false,
          previewing: false
        }
      }
    },
    methods: {
      cancelImageSelect: function() {
        this.selectingImage = {
          active: false
        };
      },
      imageSelected: function(text) {

        this.value[this.selectingImage.field].value = addTextInText(
          this.value[this.selectingImage.field].value,
          text,
          this.selectingImage.startPosition,
          this.selectingImage.endPosition
        );

        this.cancelImageSelect();
      },
      preview: function() {
        this.previewing = true;
      },
      selectImage(data) {
        this.selectingImage = {
          active: true,
          field: data.field,
          startPosition: data.startPosition,
          endPosition: data.endPosition
        };
      },
      stopPreviewing() {
        this.previewing = false;
      }
    },
    props: ['visitId', 'save', 'saved', 'topic', 'value']
  }
</script>
