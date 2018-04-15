<template>
  <p>
    {{title}}:<br/>
    <textarea class="form-control"
              :placeholder="title"
              v-model="inputVal" />
  </p>
</template>

<script>
  export default {
    props: ['value', 'title'],
    data() {
      return {
        inputVal: this.value
      }
    },
    watch: {
      inputVal(val) {
        this.$emit('input', val);
      }
    }
  }
</script>
