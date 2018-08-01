<template>
  <p>
    {{title}}:<br/>
    <select class="form-control" v-model="inputVal.value" multiple>
      <option v-for="(user, index) in value.users"
              :value="user.id"
              :key="'user_' + index">
        {{user.name}}
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
