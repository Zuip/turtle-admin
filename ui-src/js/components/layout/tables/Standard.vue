<template>
  <table class="table">
    <tbody>

      <tr v-for="(row, rowIndex) in value.rows"
          :key="getRowKey(rowIndex)">

        <td v-for="(cell, cellIndex) in row.cells"
            :key="getCellKey(rowIndex, cellIndex)">

          <component :is="cell.content" :props="cell.props" />

        </td>

      </tr>
      
    </tbody>
  </table>
</template>

<script>
  export default {
    methods: {
      getCellKey(rowIndex, cellIndex) {
        return this.getRowKey(rowIndex) + '_cell_' + cellIndex;
      },
      getRowKey(index) {
        return 'table_row_' + this.value.name + index;
      }
    },
    props: ['value']
  };
</script>