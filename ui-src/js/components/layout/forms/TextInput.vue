<template>
  <p>
    <strong v-if="value.mandatory">* </strong>{{title}}:<br/>
    <input type="text"
           class="form-control"
           v-bind:class="{'failed': value.failed}"
           :placeholder="title"
           v-model="inputVal.value" />
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
    },
    created: function() {
      if(typeof this.mandatory === 'undefined') {
        this.value.mandatory = false;
      }
      if(typeof this.failed === 'undefined') {
        this.value.failed = false;
      }
    }
  }
</script>
