<template>
  <p>
    <strong v-if="mandatory">* </strong>{{title}}:<br/>
    <input type="text"
           class="form-control"
           v-bind:class="{'failed': failed}"
           :placeholder="title"
           v-model="value.value.date" />
  </p>
</template>

<script>
  export default {
    props: ['value', 'title'],
    computed: {
      failed: function() {

        if(typeof this.value.failed === 'undefined') {
          return false;
        }

        return this.value.failed;
      },
      mandatory: function() {

        if(typeof this.value.mandatory === 'undefined') {
          return false;
        }

        return this.value.mandatory;
      }
    }
  }
</script>
