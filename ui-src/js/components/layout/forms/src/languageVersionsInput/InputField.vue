<template>
  <input type="text"
          class="form-control"
          v-bind:class="{'failed': failed}"
          :placeholder="value.name"
          v-model="value.value"
          v-on:change="emitChanges()" />
</template>

<script>
  export default {
    computed: {
      failed() {

        if(typeof this.value.failed === 'undefined') {
          return false;
        }

        return this.value.failed;
      }
    },
    methods: {
      emitChanges() {
        this.$emit('input', this.value);
      }
    },
    props: ['value']
  }
</script>