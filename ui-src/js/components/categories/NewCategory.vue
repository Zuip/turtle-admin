<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">
      <div class="popup-grid-content">

        <h3>{{translations.categories.newCategory}}</h3>

        <TextInput v-model="categoryName"
                   :title="translations.categories.categoryName"
                   mandatory="true"
                   :failed="categoryNameFailed" />
        <TextInput v-model="urlName"
                   :title="translations.urlName"
                   mandatory="true"
                   :failed="urlNameFailed" />
        <TextareaInput v-model="description" :title="translations.categories.description" />

        <p>
          {{translations.published}}:<br/>
          <select class="form-control" v-model="published">
            <option value="no">{{translations.no}}</option>
            <option value="yes">{{translations.yes}}</option>
          </select>
        </p>

      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <button type="button" class="btn btn-danger" v-on:click="close">
          {{translations.cancel}}
        </button>
      </div>
    </div>
    <SavingSucceeded v-if="saved" @close="close" />
  </div>
</template>

<script>

  import postCategory from '../../apiCalls/postCategory.js';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';
  import TextInput from '../layout/forms/TextInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';

  export default {
    data: function() {
      return {
        categoryName: '',
        urlName: '',
        published: 'no',
        description: '',
        categoryNameFailed: false,
        urlNameFailed: false,
        saved: false
      }
    },
    components: {
      SavingSucceeded,
      TextInput,
      TextareaInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      close: function() {

        this.$store.dispatch('closePopup');

        if(this.categoryId === null) {
          this.$router.push('/');
          return;
        }

        this.$router.push('/categories/' + this.getCategoryId());
      },
      save: function() {

        let contentLoadingName = 'saveNewCategory';
        this.$store.dispatch('startContentLoading', contentLoadingName);
        this.categoryNameFailed = false;
        this.urlNameFailed = false;

        postCategory({
          parent: this.getCategoryId(),
          name: this.categoryName,
          urlName: this.urlName,
          description: this.description,
          published: this.published
        }).then(data => {

          this.$store.dispatch('endContentLoading', contentLoadingName);

          if(!data.success) {

            if(data.failedFields.includes("name")) {
              this.categoryNameFailed = true;
            }

            if(data.failedFields.includes("urlName")) {
              this.urlNameFailed = true;
            }
          }

          if(data.success) {
            this.saved = true;
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
    }
  }
</script>
