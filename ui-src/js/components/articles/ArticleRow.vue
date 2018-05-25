<template>
  <tr>
    <td class="row-type-icon-column"><i class="far fa-file-alt"></i></td>
    <td>{{data.topic}}</td>
    <td class="actions-column">
      <button type="button" class="btn btn-danger" v-on:click="remove">
        <i class="far fa-trash-alt"></i>
      </button>
      <router-link :to="editArticleLink()">
        <button type="button" class="btn btn-primary">
          <i class="fas fa-edit"></i>
        </button>
      </router-link>
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
      editArticleLink() {

        if(this.categoryId === 'root') {
          return '/articles/' + this.data.id;
        }

        return '/categories/' + this.data.categoryId + '/articles/' + this.data.id;
      },
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
