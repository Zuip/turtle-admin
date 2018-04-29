<template>
  <p>
    {{title}}:<br/>
    <textarea class="form-control"
              :placeholder="title"
              v-model="inputVal.value"
              :rows="rowsNum">
    </textarea>
  </p>
</template>

<script>
  export default {
    props: ['value', 'title', 'rows'],
    data() {
      return {
        inputVal: this.value,
        rowsNum: typeof this.rows === 'undefined' ? 3 : this.rows
      }
    },
    watch: {
      inputVal(val) {
        this.$emit('input', val);
      }
    }
  }
</script>
