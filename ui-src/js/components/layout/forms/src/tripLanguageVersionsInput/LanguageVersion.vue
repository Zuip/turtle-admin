<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <select class="language-select form-control"
              v-model="value.language.value"
              v-on:change="emitChanges()">

        <option v-for="languageVersion in availableLanguageVersions"
                :value="languageVersion.code"
                :key="'languageVersion_' + languageVersion.code">
          {{languageVersion.code}}
        </option>

      </select>
    </div>
    <input type="text"
           class="form-control"
           v-bind:class="{'failed': nameFailed}"
           :placeholder="translations.common.name"
           v-model="value.name.value"
           v-on:change="emitChanges()" />
    <input type="text"
           class="form-control"
           v-bind:class="{'failed': urlNameFailed}"
           :placeholder="translations.common.urlName"
           v-model="value.urlName.value"
           v-on:change="emitChanges()" />
    <div class="input-group-append">
      <button class="btn btn-danger"
              v-on:click="$emit('removeTripLanguageVersion')">

        <i class="fas fa-trash-alt"></i>
      
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      availableLanguageVersions() {
        return this.languageVersions.filter(languageVersion => {

          if(languageVersion.code === this.value.language.value) {
            return true;
          }

          if(this.reservedLanguages.includes(languageVersion.code)) {
            return false;
          }

          return true;
        });
      },
      nameFailed() {

        if(typeof this.value.name.failed === 'undefined') {
          return false;
        }

        return this.value.name.failed;
      },
      translations() {
        return this.$store.getters.getTranslations;
      },
      urlNameFailed() {

        if(typeof this.value.urlName.failed === 'undefined') {
          return false;
        }

        return this.value.urlName.failed;
      }
    },
    methods: {
      emitChanges() {
        this.$emit('input', this.value);
      }
    },
    props: ['value', 'languageVersions', 'reservedLanguages']
  }
</script>

<style>
  .language-select {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>