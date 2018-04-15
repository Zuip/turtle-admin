<template>
  <div class="popup-grid">
    <div class="popup-grid-content">

      <h3>{{translations.categories.newCategory}}</h3>

      <TextInput v-model="categoryName" :title="translations.categories.categoryName" />
      <TextInput v-model="urlName" :title="translations.urlName" />
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
      <button type="button" class="btn btn-danger" v-on:click="cancel">
        {{translations.cancel}}
      </button>
    </div>
  </div>
</template>

<script>

  import TextInput from '../layout/forms/TextInput.vue';
  import TextareaInput from '../layout/forms/TextareaInput.vue';

  export default {
    data: function() {
      return {
        categoryName: '',
        urlName: '',
        published: 'no',
        description: ''
      }
    },
    components: {
      TextInput,
      TextareaInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      cancel: function() {
        this.$store.dispatch('closePopup');
        this.$router.push('/');
      },
      save: function() {
        let contentLoadingName = 'saveNewCategory';
        this.$store.dispatch('startContentLoading', contentLoadingName);
      }
    }
  }
</script>
