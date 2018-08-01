<template>
  <div class="input-group mb-3">

    <div class="input-group-prepend">
      <div class="input-group-text">{{title}}</div>
    </div>

    <input type="text" class="form-control" v-model="folderName" />

    <div class="input-group-append" v-if="folderName !== ''">
      <button class="btn btn-outline-secondary" type="button" v-on:click="createFolder">
        {{translations.common.save}}
      </button>
    </div>

  </div>
</template>

<script>
  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data: function() {
      return {
        folderName: ''
      };
    },
    methods: {
      createFolder: function() {
        this.$emit('createFolder', this.folderName);
        this.folderName = '';
      }
    },
    props: ['title']
  };
</script>
