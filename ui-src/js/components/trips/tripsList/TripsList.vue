<template>
  <div>
    <StandardTable v-model="tableData" v-if="trips.length" />
    <div v-if="!trips.length" class="no-trips-message">
      {{$store.getters.getTranslations.trips.noTripsExists}}
    </div>
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

<style>
  .no-trips-message {
    margin-bottom: 10px;
  }
</style>