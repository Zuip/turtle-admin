<template>
  <div>
    <StandardTable v-model="tableData" />
  </div>
</template>

<script>

  import NameCellContent from './NameCellContent.vue';
  import StandardTable from '../../layout/tables/Standard.vue';

  export default {
    components: {
      StandardTable
    },
    computed: {
      tableData() {
        return {
          rows: this.questions.map(question => {
            return {
              id: question.id,
              cells: [
                this.getNameCellData(question)
              ]
            }
          })
        };
      },
      translations() {
        return this.$store.getters.getTranslations.cities;
      }
    },
    methods: {
      getNameCellData(question) {
        return {
          content: NameCellContent,
          props: {
            id: question.id,
            text: question.text,
            questionLink: this.questionLink
          }
        };
      }
    },
    props: ['questions', 'questionLink']
  };
</script>