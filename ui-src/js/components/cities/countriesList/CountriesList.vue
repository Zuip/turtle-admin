<template>
  <div>
    <StandardTable v-model="tableData" />
  </div>
</template>

<script>

  import NameCellContent from './NameCellContent.vue';
  import nameSort from '../../../services/nameSort';
  import StandardTable from '../../layout/tables/Standard.vue';

  export default {
    components: {
      StandardTable
    },
    computed: {
      tableData() {
        return {
          rows: this.countries.sort(
            nameSort
          ).map(country => {
            return {
              id: country.id,
              cells: [
                this.getNameCellData(country)
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
      getNameCellData(country) {
        return {
          content: NameCellContent,
          props: {
            id: country.id,
            name: country.name
          }
        };
      }
    },
    props: ['countries']
  };
</script>