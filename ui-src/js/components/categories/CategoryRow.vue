<template>
  <tr>
    <td class="row-type-icon-column"><i class="far fa-folder"></i></td>
    <td>{{data.name}}</td>
    <td class="actions-column">
      <button type="button" class="btn btn-danger" v-on:click="remove">
        <i class="far fa-trash-alt"></i>
      </button>
      <button type="button" class="btn btn-primary">
        <i class="fas fa-edit"></i>
      </button>
    </td>
  </tr>
</template>

<script>
  import deleteCategory from '../../apiCalls/deleteCategory';

  export default {
    props: ['data'],
    data: function() {
      return { };
    },
    methods: {
      remove: function() {
        if(confirm(this.$store.getters.getTranslations.categories.confirmDelete + " " + this.data.name + "?")) {
          deleteCategory(this.data.id).then(data => {
            this.updateCategoryList();
          }).catch(error => {
            console.log(error);
          });
        }
      },
      updateCategoryList() {
        this.$emit('updateCategoryList');
      }
    }
  }
</script>
