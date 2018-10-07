<template>
  <div>
    <router-link
      :to="editLanguageVersionLink"
      class="btn btn-primary float-edit-button-right"
    >
      <i class="fas fa-pencil-alt"></i>
    </router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      editLanguageVersionLink() {
        return '/countries/' + this.props.countryId
             + '/cities/' + this.props.cityId;
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