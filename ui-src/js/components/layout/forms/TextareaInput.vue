<template>
  <p>

    {{title}}:<br/>

    <textarea class="form-control"
              :placeholder="title"
              v-model="inputVal.value"
              :rows="rowsNum">
    </textarea>

    <button class="btn btn-primary"
            v-on:click="selectImage">
      {{translations.images.selectImage}}
    </button>

  </p>
</template>

<script>
  export default {
    computed: {
      translations() {
        return this.$store.getters.getTranslations;
      }
    },
    data() {
      return {
        inputVal: this.value,
        rowsNum: typeof this.rows === 'undefined' ? 3 : this.rows
      }
    },
    methods: {
      selectImage: function() {
        this.$emit('selectImage');
      }
    },
    props: ['value', 'title', 'rows'],
    watch: {
      inputVal(val) {
        this.$emit('input', val);
      }
    }
  }
</script>
