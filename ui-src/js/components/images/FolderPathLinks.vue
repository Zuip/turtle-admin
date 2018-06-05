<template>
  <div class="folder-path-links">
    <a v-on:click="folderLinkClicked('')">
      {{translations.images.rootFolder}}
    </a>
    <span v-for="folder in value">
      &gt; <a v-on:click="folderLinkClicked(folder)">{{folder}}</a>
    </span>
  </div>
</template>

<script>
  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      folderLinkClicked: function(folder) {
        this.$emit('folderLinkClicked', folder);
      }
    },
    props: [ 'value' ]
  };
</script>
