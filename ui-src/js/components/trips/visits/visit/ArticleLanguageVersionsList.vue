<template>
  <div>
    <h4>{{translations.articles.article}}</h4>
    <StandardTable v-model="tableData" />
  </div>
</template>

<script>

  import EditButtonCellContent from './EditButtonCellContent.vue';
  import LanguageCodeCellContent from './LanguageCodeCellContent.vue';
  import StandardTable from '../../../layout/tables/Standard.vue';

  export default {
    components: {
      StandardTable
    },
    computed: {
      tableData() {
        return {
          rows: this.article.languageVersions.map(languageVersion => {
            return {
              id: this.article.id + '_' + languageVersion,
              cells: [
                this.getLanguageCodeCellData(languageVersion),
                this.getEditButtonCellData(languageVersion)
              ]
            }
          })
        };
      },
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    methods: {
      getEditButtonCellData(languageVersion) {
        return {
          content: EditButtonCellContent,
          props: {
            visitId: this.visitId,
            languageVersion
          }
        };
      },
      getLanguageCodeCellData(languageVersion) {
        return {
          content: LanguageCodeCellContent,
          props: {
            languageCode: languageVersion.language
          }
        };
      }
    },
    props: ['article', 'visitId']
  };
</script>