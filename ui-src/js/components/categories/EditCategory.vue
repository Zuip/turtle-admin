<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">
      <CategoryForm class="popup-grid-content" v-model="fields" :topic="translations.categories.editCategory" />
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <ClosePopupButton :text="translations.close" :categoryId="parentCategoryId" />
      </div>
    </div>
    <SavingSucceeded v-if="saved" :categoryId="parentCategoryId" :topic="translations.categories.editCategory" />
  </div>
</template>

<script>

  import CategoryForm from './CategoryForm.vue';
  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import initializeCategory from '../../services/categories/initializeCategory';
  import putCategory from '../../apiCalls/categories/putCategory';
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
    created: function() {
      this.initializeCategory();
    },
    methods: {
      initializeCategory: function() {
        this.fields.categoryName.value = this.category.name;
        this.fields.urlName.value = this.category.urlName;
        this.fields.description.value = this.category.description;
        this.fields.published.value = this.category.published ? 'yes' : 'no';
      },
      save: function() {

        let contentLoadingName = 'editCategory';
        this.$store.dispatch('startContentLoading', contentLoadingName);
        this.fields.categoryName.failed = false;
        this.fields.urlName.failed = false;

        putCategory(this.category.id, {
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
            this.categoryName.failed = true;
          }

          if(data.failedFields.includes("urlName")) {
            this.urlName.failed = true;
          }

        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['category', 'parentCategoryId', 'updateCategoryList']
  }
</script>
