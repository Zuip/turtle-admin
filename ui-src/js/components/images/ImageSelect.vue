<template>
  <div class="popup-grid">
    <div class="popup-grid-content">
      <h3>{{translations.images.selectImage}}</h3>
      <FolderContent ref="folderContent" />
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
</template>

<script>

  import CreateFolderInput from './CreateFolderInput.vue';
  import FileInput from '../layout/forms/FileInput.vue';
  import FolderContent from './FolderContent.vue';
  import postArticleImage from '../../apiCalls/postArticleImage';
  import postArticleImageFolder from '../../apiCalls/postArticleImageFolder';
  import TextInput from '../layout/forms/TextInput.vue';

  export default {
    components: {
      CreateFolderInput,
      FileInput,
      FolderContent,
      TextInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data: function() {
      return {
        caption: { value: "" }
      }
    },
    methods: {
      cancel: function() {
        this.$emit('cancel');
      },
      createFolder: function(name) {

        let contentLoadingName = 'createArticleImageFolder';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        let path = [];
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
      select: function() {
        this.$emit('select');
      },
      uploadImage: function(file) {

        let contentLoadingName = 'uploadFile';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        let formData  = new FormData();
        formData.append("articleImage", new Blob([file]), file.name);

        postArticleImage(
          formData
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
