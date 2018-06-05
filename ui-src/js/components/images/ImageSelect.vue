<template>
  <div class="popup-grid">
    <div class="article-image-folder">
      <div class="popup-grid-content">
        <h3>{{translations.images.selectImage}}</h3>
        <FolderPathLinks v-model="folderPath" @folderLinkClicked="parentFolderLinkClicked" />
        <FolderContent ref="folderContent" :folderPath="folderPath" @folderClicked="folderClicked" />
        <FileInput :title="translations.images.newImage" @uploadFile="uploadImage"/>
        <CreateFolderInput :title="translations.images.newFolder" @createFolder="createFolder" />
        <h4>{{translations.images.imageSummary}}</h4>
        <TextInput v-model="caption" :title="translations.images.caption" />
      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="select">
          {{translations.select}}
        </button>
        <button type="button" class="btn btn-danger" v-on:click="cancel">
          {{translations.cancel}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

  import CreateFolderInput from './CreateFolderInput.vue';
  import FileInput from '../layout/forms/FileInput.vue';
  import FolderContent from './FolderContent.vue';
  import FolderPathLinks from './FolderPathLinks.vue';
  import postArticleImage from '../../apiCalls/articles/postArticleImage';
  import postArticleImageFolder from '../../apiCalls/articles/postArticleImageFolder';
  import TextInput from '../layout/forms/TextInput.vue';

  export default {
    components: {
      CreateFolderInput,
      FileInput,
      FolderContent,
      FolderPathLinks,
      TextInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data: function() {
      return {
        caption: { value: "" },
        folderPath: []
      }
    },
    methods: {
      cancel: function() {
        this.$emit('cancel');
      },
      createFolder: function(name) {

        let contentLoadingName = 'createArticleImageFolder';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        let path = this.folderPath.slice();
        path.push(name);

        postArticleImageFolder({
          path
        }).then(data => {
          this.$store.dispatch('endContentLoading', contentLoadingName);
          this.$refs.folderContent.getImages();
        }).catch(
          error => console.log(error)
        );
      },
      folderClicked: function(folderName) {
        this.folderPath.push(folderName);
      },
      parentFolderLinkClicked: function(folderName) {

        if(folderName === '') {
          this.folderPath = [];
        }

        let folderFound = false;

        this.folderPath = this.folderPath.filter(function(folderPathFolder) {

          if(folderFound) {
            return false;
          }

          if(folderPathFolder === folderName) {
            folderFound = true;
          }

          return true;
        });
      },
      select: function() {
        this.$emit('select');
      },
      uploadImage: function(file) {

        let contentLoadingName = 'uploadFile';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        let formData  = new FormData();
        formData.append("articleImage", new Blob([file]), file.name);

        postArticleImage(
          formData,
          this.folderPath
        ).then(data => {
          this.$store.dispatch('endContentLoading', contentLoadingName);
          this.$refs.folderContent.getImages();
        }).catch(
          error => console.log(error)
        );
      }
    }
  };
</script>
