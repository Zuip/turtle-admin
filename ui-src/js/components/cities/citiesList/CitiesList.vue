<template>
  <StandardTable v-model="tableData" />
</template>

<script>

  import EditButtonCellContent from './EditButtonCellContent.vue';
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
          rows: this.cities.sort(
            nameSort
          ).map(city => {
            return {
              id: city.id,
              cells: [
                this.getNameCellData(city),
                this.getEditButtonCellData(city)
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
      getEditButtonCellData(city) {
        return {
          content: EditButtonCellContent,
          props: {
            cityId: city.id,
            countryId: this.$route.params.countryId
          }
        };
      },
      getNameCellData(city) {
        return {
          content: NameCellContent,
          props: {
            id: city.id,
            name: city.name
          }
        };
      }
    },
    props: ['cities']
  };
</script>