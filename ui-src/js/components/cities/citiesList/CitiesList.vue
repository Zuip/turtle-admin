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
          rows: this.cities.map(city => {
            return {
              id: city.id,
              cells: [
                this.getNameCellData(city)
              ]
            }
          })
        };
      },
      translations() {
        return this.$store.getters.getTranslations.countries;
      }
    },
    methods: {
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