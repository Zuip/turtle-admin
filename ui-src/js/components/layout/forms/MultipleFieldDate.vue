<template>
  <div class="jepa">
    <label>
      <strong v-if="mandatory">*</strong>
      {{title}}:
    </label>
    <div class="input-group">
      <input type="text"
            class="form-control"
            v-bind:class="{'failed': failed}"
            :placeholder="'day'"
            v-model="day"
            v-on:input="updateDate" />
      <input type="text"
            class="form-control"
            v-bind:class="{'failed': failed}"
            :placeholder="'month'"
            v-model="month"
            v-on:input="updateDate" />
      <input type="text"
            class="form-control"
            v-bind:class="{'failed': failed}"
            :placeholder="'year'"
            v-model="year"
            v-on:input="updateDate" />
    </div>
    <br />
  </div>
</template>

<script>
  export default {
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
    },
    data() {
      return {
        day: '',
        month: '',
        year: ''
      }
    },
    methods: {
      getDatePart(index) {

        if(this.date === '') {
          return '';
        }

        let dateParts = this.getDateParts();
        return dateParts[index];
      },
      getDateParts() {
        return this.value.value.split('-');
      },
      updateDate() {
        this.value.value = this.year + '-' + this.month + '-' + this.day;
        this.$emit('input', this.value);
      }
    },
    props: ['title', 'value'],
    watch: {
      'value': function() {
        this.day = this.getDatePart(2);
        this.month = this.getDatePart(1);
        this.year = this.getDatePart(0);
      }
    }
  }
</script>
