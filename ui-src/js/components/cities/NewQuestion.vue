<template>
  <div class="popup-grid-container">
    <div class="popup-grid" v-if="!saved">

      <QuestionForm class="popup-grid-content"
                    v-model="fields"
                    :topic="translations.cities.questions.newQuestion" />

      <div class="popup-grid-footer">

        <button type="button" class="btn btn-primary" v-on:click="save">
          {{translations.common.save}}
        </button>

        <ClosePopupButton :closeToAddress="closeToAddress" :confirmClose="true" />

      </div>
    </div>

    <SavingSucceeded v-if="saved"
                     :closeToAddress="closeToAddress"
                     :topic="translations.cities.questions.newQuestion" />

  </div>
</template>

<script>

  import ClosePopupButton from '../overlay/ClosePopupButton.vue';
  import QuestionForm from './QuestionForm.vue';
  import initializeQuestion from '../../services/formDataInitializers/cities/initializeQuestion';
  import postQuestion from '../../apiCalls/cities/postQuestion';
  import SavingSucceeded from '../overlay/SavingSucceeded.vue';

  export default {
    components: {
      ClosePopupButton,
      QuestionForm,
      SavingSucceeded
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        closeToAddress: '/cities/questions',
        fields: initializeQuestion(this.$store.getters.getTranslations),
        saved: false
      }
    },
    methods: {
      save() {
        postQuestion(
          {
            languageVersions: this.fields.languageVersions.map(languageVersion => ({
              text: languageVersion.text.value,
              language: languageVersion.language.value
            }))
          }
        ).then(() => {
          this.saved = true;
        }).catch(
          error => console.log(error)
        );
      }
    }
  }
</script>
