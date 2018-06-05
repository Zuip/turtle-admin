<template>
  <div>
    <table class="table image-folder-content-table">
      <tbody>
        <tr v-for="folder in folders">
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

  import getArticleImages from '../../apiCalls/getArticleImages';

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

        getArticleImages().then(data => {
          this.folders = data.folders;
          this.images = data.images;
          this.$store.dispatch('endContentLoading', contentLoadingName);
        }).catch(
          error => console.log(error)
        );
      }
    }
  }
</script>
