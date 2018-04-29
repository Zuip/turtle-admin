<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">
      <div class="popup-grid-content">

        <h3>{{translations.articles.newArticle}}</h3>

        <TextInput v-model="topic" :title="translations.articles.topic" />
        <TextInput v-model="urlName" :title="translations.urlName" />
        <TextareaInput v-model="summary" :title="translations.articles.summary" />
        <TextareaInput v-model="text" :title="translations.articles.text" :rows="10" />
        <UserSelectInput v-model="writers" :title="translations.articles.writers" />
        <TextInput v-model="publishDate" :title="translations.articles.publishDate" />
        <SelectInput v-model="published" :title="translations.published" />

      </div>
      <div class="popup-grid-footer">
        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.save}}
        </button>
        <CloseCategoryPopupButton :text="translations.close" @updateCategoryList="updateCategoryList" />
      </div>
    </div>
    <SavingSucceeded v-if="saved" @close="close" />
  </div>
</template>

<script>

  import CloseCategoryPopupButton from '../categories/CloseCategoryPopupButton.vue';
  import getUsers from '../../apiCalls/getUsers';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';
  import SelectInput from '../layout/forms/SelectInput.vue';
  import TextInput from '../layout/forms/TextInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';
  import UserSelectInput from '../layout/forms/UserSelectInput.vue';

  export default {
    data: function() {
      return {
        topic:       { value: '',   failed: false, mandatory: true  },
        urlName:     { value: '',   failed: false, mandatory: true  },
        summary:     { value: '',   failed: false, mandatory: false },
        text:        { value: '',   failed: false, mandatory: true  },
        publishDate: { value: '',   failed: false, mandatory: true  },
        published: {
          value: 'no',
          failed: false,
          mandatory: true,
          options: [
            { value: 'no',  translation: this.$store.getters.getTranslations.no  },
            { value: 'yes', translation: this.$store.getters.getTranslations.yes }
          ]
        },
        writers:  {
          value: [],
          failed: false,
          mandatory: true,
          users: []
        },
        saved: false
      }
    },
    components: {
      CloseCategoryPopupButton,
      SavingSucceeded,
      SelectInput,
      TextInput,
      TextareaInput,
      UserSelectInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    created: function() {

      let contentLoadingName = 'loadUsersToUserSelect';
      this.$store.dispatch('startContentLoading', contentLoadingName);

      getUsers().then(data => {
        this.writers.users = data;
        this.$store.dispatch('endContentLoading', contentLoadingName);
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      save: function() {

      }
    },
    props: ['updateCategoryList']
  }
</script>
