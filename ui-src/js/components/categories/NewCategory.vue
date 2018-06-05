<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">
      <div class="popup-grid-content">

        <h3>{{translations.categories.newCategory}}</h3>

        <TextInput v-model="categoryName" :title="translations.categories.categoryName" />
        <TextInput v-model="urlName" :title="translations.urlName" />
        <TextareaInput v-model="description" :title="translations.categories.description" />
        <SelectInput v-model="published" :title="translations.published" />

      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <ClosePopupButton :text="translations.close" />
      </div>
    </div>
    <SavingSucceeded v-if="saved" />
  </div>
</template>

<script>

  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import postCategory from '../../apiCalls/categories/postCategory';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';
  import SelectInput from '../layout/forms/SelectInput.vue';
  import TextInput from '../layout/forms/TextInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';

  export default {
    data: function() {
      return {
        categoryName: { value: '', failed: false, mandatory: true  },
        urlName:      { value: '', failed: false, mandatory: true  },
        description:  { value: '', failed: false, mandatory: false },
        published: {
          value: 'no',
          failed: false,
          mandatory: true,
          options: [
            { value: 'no',  translation: this.$store.getters.getTranslations.no  },
            { value: 'yes', translation: this.$store.getters.getTranslations.yes }
          ]
        },
        saved: false
      }
    },
    components: {
      ClosePopupButton,
      SavingSucceeded,
      SelectInput,
      TextInput,
      TextareaInput
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
        this.categoryName.failed = false;
        this.urlName.failed = false;

        postCategory({
          parent: this.getCategoryId(),
          name: this.categoryName.value,
          urlName: this.urlName.value,
          description: this.description.value,
          published: this.published.value
        }).then(data => {

          this.$store.dispatch('endContentLoading', contentLoadingName);

          if(data.success) {
            this.saved = true;
            this.updateCategoryList();
          } else {

            if(data.failedFields.includes("name")) {
              this.categoryName.failed = true;
            }

            if(data.failedFields.includes("urlName")) {
              this.urlName.failed = true;
            }
          }

        }).catch(error => {
          console.log(error);
        });
      },
      getCategoryId() {

        if(typeof this.$route.params.categoryId !== 'undefined') {
          return parseInt(this.$route.params.categoryId);
        }

        return null;
      }
    },
    props: ['updateCategoryList']
  }
</script>
