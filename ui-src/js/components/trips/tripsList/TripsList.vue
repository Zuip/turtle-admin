<template>
  <StandardTable v-model="tableData" />
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
          rows: this.trips.map(trip => {
            return {
              id: trip.id,
              cells: [
                this.getNameCellData(trip)
              ]
            }
          })
        };
      }
    },
    methods: {
      getNameCellData(trip) {
        return {
          content: NameCellContent,
          props: {
            id: trip.id,
            name: trip.name
          }
        };
      }
    },
    props: ['trips']
  };
</script>
