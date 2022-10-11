<template>
<div class="graph-section">
  <div class="graph-content">
    <GraphVisualization v-if="preparedData" :edgesData="preparedData" />
  </div>
</div>

</template>

<script>
export default {
  name: "GraphSection",
  props: [ "data" ],
  data() {
    let preparedData =  this.data.graph.edges
    preparedData.push({
      from: "",
      to: "1",
    });

    return {
      preparedData,
    }
  },
}
</script>

<style lang="scss">
.graph-section {
  background: rgba(0, 0, 0, 0.05);
}
</style>
