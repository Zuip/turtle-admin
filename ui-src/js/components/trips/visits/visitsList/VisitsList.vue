<template>
  <StandardTable v-model="tableData" />
</template>

<script>

  import CityNameCellContent from './CityNameCellContent.vue';
  import StandardTable from '../../../layout/tables/Standard.vue';

  export default {
    components: {
      StandardTable
    },
    computed: {
      tableData() {
        return {
          rows: this.visits.map(visit => {
            return {
              id: visit.id,
              cells: [
                this.getCityNameCellData(visit)
              ]
            }
          })
        };
      }
    },
    methods: {
      getCityNameCellData(visit) {
        return {
          content: CityNameCellContent,
          props: {
            id: visit.id,
            city: {
              name: visit.city.name
            }
          }
        };
      }
    },
    props: ['visits']
  };
</script>
