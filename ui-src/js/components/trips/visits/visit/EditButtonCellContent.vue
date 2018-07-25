<template>
  <router-link :to="editLanguageVersionLink"
                class="btn btn-primary float-edit-button-right">

    <i class="fas fa-pencil-alt"></i>

  </router-link>
</template>

<script>
  export default {
    computed: {
      editLanguageVersionLink() {
        return '/visits/' + this.props.visitId
             + '/articles/' + this.props.languageCode;
      }
    },
    props: ['props']
  }
</script>

<style>
  .float-edit-button-right {
    float: right;
  }
</style>