<template>
  <p>
    {{title}}:<br/>
    <select class="form-control" v-model="inputVal.value">
      <option v-for="option in value.options" :value="option.value">
        {{option.translation}}
      </option>
    </select>
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
