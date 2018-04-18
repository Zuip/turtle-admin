<template>
  <tr>
    <td class="row-type-icon-column"><i class="far fa-folder"></i></td>
    <td>{{data.name}}</td>
    <td class="actions-column">
      <button type="button" class="btn btn-danger">
        <i class="far fa-trash-alt"></i>
      </button>
      <button type="button" class="btn btn-primary">
        <i class="fas fa-edit"></i>
      </button>
    </td>
  </tr>
</template>

<script>
  export default {
    props: ['data'],
    data: function() {
      return { };
    }
  }
</script>
