<template>
  <p>
    <strong v-if="mandatory">* </strong>{{title}}:<br/>
    <input type="text"
           class="form-control"
           v-bind:class="{'failed': failed}"
           :placeholder="title"
           v-model="inputVal" />
  </p>
</template>

<script>
  export default {
    props: ['value', 'title', 'mandatory', 'failed'],
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
        this.mandatory = false;
      }
      if(typeof this.failed === 'undefined') {
        this.failed = false;
      }
    }
  }
</script>
