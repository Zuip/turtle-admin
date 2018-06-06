<template>
  <p>

    {{title}}:<br/>

    <textarea class="form-control"
              :placeholder="title"
              v-model="inputVal.value"
              :rows="rowsNum"
              v-on:focus="focusIn()"
              v-on:focusout="focusOut()"
              ref="field">
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
        rowsNum: typeof this.rows === 'undefined' ? 3 : this.rows,
        hasFocus: false
      }
    },
    methods: {
      focusIn: function() {
        this.hasFocus = true;
      },
      focusOut: function() {
        setTimeout(() => {
          this.hasFocus = false;
        }, 1000);
      },
      selectImage: function() {

        let startPosition = null;
        let endPosition = null;
        if(this.hasFocus) {
          startPosition = this.$refs.field.selectionStart;
          endPosition = this.$refs.field.selectionEnd;
        }

        this.$emit(
          'selectImage',
          {
            field: this.field,
            startPosition,
            endPosition
          }
        );
      }
    },
    props: ['value', 'title', 'rows', 'field'],
    watch: {
      inputVal(val) {
        this.$emit('input', val);
      }
    }
  }
</script>
