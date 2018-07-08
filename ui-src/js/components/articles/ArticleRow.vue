<template>
  <tr>
    <td class="row-type-icon-column"><i class="far fa-file-alt"></i></td>
    <td>{{data.topic}}</td>
    <td class="actions-column">
      <button type="button" class="btn btn-danger">
        <i class="far fa-trash-alt"></i>
      </button>
      <router-link v-for="language in data.languages" :to="editArticleLink(language)">
        <button type="button" class="btn btn-primary">
          <i class="fas fa-edit"></i> {{language.code}}
        </button>
      </router-link>
    </td>
  </tr>
</template>

<script>
  import deleteCategory from '../../apiCalls/categories/deleteCategory';

  export default {
    props: ['data'],
    data: function() {
      return { };
    },
    methods: {
      getConfirmMessage() {
        return this.$store.getters.getTranslations.categories.confirmDelete
             + " "
             + this.data.name + "?";
      },
      editArticleLink(language) {
        return '/articles/' + this.data.id + '/' + language.code + '/edit';
      },
      remove() {

        if(!confirm(this.getConfirmMessage())) {
          return;
        }

        deleteCategory(this.data.id).then(data => {
          this.updateCategoryList();
        }).catch(error => {
          console.log(error);
        });
      },
      updateCategoryList() {
        this.$emit('updateCategoryList');
      }
    }
  }
</script>
