<template>
  <div>
    <table class="table image-folder-content-table">
      <tbody>
        <tr v-for="folder in folders" v-on:click="folderClicked(folder)">
          <td class="image-folder-icon-column"><i class="far fa-folder"></i></td>
          <td>{{folder}}</td>
        </tr>
        <tr v-for="image in images">
          <td class="image-folder-icon-column"><i class="far fa-file-alt"></i></td>
          <td>{{image}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import getArticleImages from '../../apiCalls/articles/getArticleImages';

  export default {
    created: function() {
      this.getImages();
    },
    data: function() {
      return {
        folders: [],
        images: []
      }
    },
    methods: {
      getImages() {

        let contentLoadingName = 'loadingArticleImages';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        getArticleImages(this.folderPath).then(data => {
          this.folders = data.folders;
          this.images = data.images;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(
          error => console.log(error)
        );
      },
      folderClicked(folder) {
        this.$emit('folderClicked', folder);
      }
    },
    props: [ 'folderPath' ],
    watch: {
      'folderPath': function() {
        this.getImages()
      }
    }
  }
</script>
