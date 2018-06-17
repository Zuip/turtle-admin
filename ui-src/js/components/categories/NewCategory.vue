<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">
      <CategoryForm class="popup-grid-content" v-model="fields" :topic="translations.categories.newCategory" />
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <ClosePopupButton :text="translations.close" :categoryId="categoryId" />
      </div>
    </div>
    <SavingSucceeded v-if="saved" :categoryId="categoryId" :topic="translations.categories.newCategory" />
  </div>
</template>

<script>

  import CategoryForm from './CategoryForm.vue';
  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import initializeCategory from '../../services/categories/initializeCategory';
  import postCategory from '../../apiCalls/categories/postCategory';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';

  export default {
    data: function() {
      return {
        fields: initializeCategory(),
        saved: false
      }
    },
    components: {
      CategoryForm,
      ClosePopupButton,
      SavingSucceeded
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      save: function() {

        let contentLoadingName = 'saveNewCategory';
        this.$store.dispatch('startContentLoading', contentLoadingName);
        this.fields.categoryName.failed = false;
        this.fields.urlName.failed = false;

        postCategory({
          parent: this.categoryId === 'root' ? null : this.categoryId,
          name: this.fields.categoryName.value,
          urlName: this.fields.urlName.value,
          description: this.fields.description.value,
          published: this.fields.published.value
        }).then(data => {

          this.$store.dispatch('endContentLoading', contentLoadingName);

          if(data.success) {
            this.saved = true;
            this.updateCategoryList();
            return;
          }

          if(data.failedFields.includes("name")) {
            this.fields.categoryName.failed = true;
          }

          if(data.failedFields.includes("urlName")) {
            this.fields.urlName.failed = true;
          }

        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['categoryId', 'updateCategoryList']
  }
</script>
