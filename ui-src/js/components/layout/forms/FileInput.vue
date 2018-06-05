<template>
  <p>
    <label class="custom-file">

      <input type="file"
             ref="fileInput"
             v-on:change="filesChanged"
             class="custom-file-input"
             style="display:none" />

      <span class="custom-file-control">
        <div class="input-group mb-3">

          <div class="input-group-prepend">
            <div class="input-group-text">{{title}}</div>
          </div>

          <input type="text"
                 class="form-control"
                 v-on:click="inputClicked"
                 :value="fileName" />

          <div class="input-group-append" v-if="file !== null">
            <button class="btn btn-outline-secondary" type="button" v-on:click="uploadFile">
              {{translations.save}}
            </button>
          </div>

        </div>
      </span>
    </label>
  </p>
</template>

<script>
  export default {
    computed: {
      fileName() {

        if(this.file === null) {
          return "";
        }

        return this.file.name;
      },
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data: function() {
      return {
        file: null
      }
    },
    methods: {
      filesChanged: function(event) {

        if(event.target.files.length === 0) {
          return;
        }

        if (event.target.files.length > 1) {
          alert(this.translations.images.onlySingleFileUploadAllowed);
          return;
        }

        this.file = event.target.files[0];
      },
      inputClicked: function() {
        this.$refs.fileInput.click();
      },
      uploadFile: function() {
        this.$emit('uploadFile', this.file);
        this.file = null;
        this.$refs.fileInput.value = "";
      }
    },
    props: ['title']
  }
</script>
