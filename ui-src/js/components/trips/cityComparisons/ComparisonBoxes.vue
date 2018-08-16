<template>
  <div>

    <h4>Arvosteltu</h4>
    <draggable v-model="value.ranked"
               class="draggable-comparison-box"
               :options="{group:'cities'}">

      <div v-for="(city, index) in value.ranked" :key="city.id" class="city-box">
        {{index + 1}}. {{city.name}}
      </div>

    </draggable>

    <h4>Arvostelematta</h4>
    <draggable v-model="value.available"
               class="draggable-comparison-box"
               :options="{group:'cities'}">

      <div v-for="city in value.available" :key="city.id" class="city-box">
        {{city.name}}
      </div>

    </draggable>

  </div>
</template>

<script>

  import draggable from 'vuedraggable';

  export default {
    components: {
      draggable
    },
    props: ['value']
  };

</script>

<style>

  .draggable-comparison-box {
    background-color: lightgrey;
    min-height: 30px;
    padding: 8px;
  }

  .draggable-comparison-box .city-box {
    background-color: grey;
    cursor: move;
    min-height: 30px;
    padding: 5px;
  }

</style>