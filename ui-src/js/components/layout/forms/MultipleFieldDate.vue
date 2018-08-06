<template>
  <div class="jepa">
    <label>
      {{title}}:
    </label>
    <div class="input-group">
      <input type="text"
            class="form-control"
            v-bind:class="{'failed': dayFailed}"
            :placeholder="'day'"
            v-model="value.day.value" />
      <input type="text"
            class="form-control"
            v-bind:class="{'failed': monthFailed}"
            :placeholder="'month'"
            v-model="value.month.value" />
      <input type="text"
            class="form-control"
            v-bind:class="{'failed': yearFailed}"
            :placeholder="'year'"
            v-model="value.year.value" />
    </div>
    <br />
  </div>
</template>

<script>
  export default {
    computed: {
      yearFailed: function() {

        if(typeof this.value.year.failed === 'undefined') {
          return false;
        }

        return this.value.year.failed;
      },
      monthFailed: function() {

        if(typeof this.value.month.failed === 'undefined') {
          return false;
        }

        return this.value.month.failed;
      },
      dayFailed: function() {

        if(typeof this.value.day.failed === 'undefined') {
          return false;
        }

        return this.value.day.failed;
      }
    },
    props: ['title', 'value'],
  }
</script>
