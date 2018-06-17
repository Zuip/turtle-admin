<template>
  <tr>
    <td class="row-type-icon-column"><i class="far fa-folder"></i></td>
    <td><router-link :to="'/categories/' + data.id">{{data.name}}</router-link></td>
    <td class="actions-column">
      <button type="button" class="btn btn-danger" v-on:click="remove">
        <i class="far fa-trash-alt"></i>
      </button>
      <router-link :to="editCategoryLink" class="btn btn-primary">
        <i class="fas fa-edit"></i>
      </router-link>
    </td>
  </tr>
</template>

<script>
  import deleteCategory from '../../apiCalls/categories/deleteCategory';

  export default {
    props: ['data'],
    computed: {
      editCategoryLink() {
        return '/categories/' + this.data.id + '/edit';
      },
    },
    data: function() {
      return { };
    },
    methods: {
      remove() {
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
