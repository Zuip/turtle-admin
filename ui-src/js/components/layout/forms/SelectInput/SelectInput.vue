<template>
  <p>
    {{title}}:<br/>
    <select class="form-control" v-model="inputVal.value">
      <SelectOption v-for="option in value.options"
              :option="option"
              :key="'select-option-' + value.options.indexOf(option)" />
    </select>
  </p>
</template>

<script>

  import SelectOption from './SelectOption.vue';

  export default {
    components: {
      SelectOption
    },
    data() {
      return {
        inputVal: this.value
      }
    },
    props: ['value', 'title'],
    watch: {
      inputVal(val) {
        this.$emit('input', val);
      }
    }
  }
</script>
