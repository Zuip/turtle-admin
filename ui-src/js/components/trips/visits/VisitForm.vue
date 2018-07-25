<template>
  <div>

    <h3>{{topic}}</h3>

    <SelectInput v-model="value.city"
                 :title="translations.city" />

    <MultipleFieldDate v-model="value.start"
                       :title="translations.visitStart" />

    <MultipleFieldDate v-model="value.end"
                       :title="translations.visitEnd" />

  </div>
</template>

<script>

  import MultipleFieldDate from '../../layout/forms/MultipleFieldDate.vue';
  import SelectInput from '../../layout/forms/SelectInput/SelectInput.vue';

  export default {
    components: {
      MultipleFieldDate,
      SelectInput
    },
    computed: {
      translations() {
        return this.$store.getters.getTranslations.trips.visits;
      }
    },
    props: ['topic', 'value']
  }

</script>