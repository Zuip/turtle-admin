<template>
  <optgroup v-if="isOptgroup" :label="translation">

    <SelectOption v-for="optgroupOption in value"
            :key="'select-optgroup-option-' + value.indexOf(optgroupOption)"
            :option="optgroupOption" />

  </optgroup>
  <option v-else :value="value">
    {{translation}}
  </option>
</template>

<script>

  export default {
    computed: {
      isOptgroup() {
        return this.option === null ? false : Array.isArray(this.option.value);
      },
      translation() {
        return this.option === null ? "-" : this.option.translation;
      },
      value() {
        return this.option === null ? null : this.option.value;
      }
    },
    name: 'SelectOption',
    props: ['option']
  };
</script>
