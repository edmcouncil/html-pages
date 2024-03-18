<template>
  <div>
    <span
      v-for="part of line"
      :key="part.value"
      class="compared-diff"
      :class="{
        'diff-added': part[0] === 1,
        'diff-removed': part[0] === -1,
        'fullChange': changeType == 'added' || changeType == 'removed'
      }"
      v-html="part[1]"
    ></span>
  </div>
</template>

<script>
export default {
  name: 'ComparedDiff',
  props: ['line', 'changeType']
};
</script>

<style lang="scss" scoped>
.compared-diff {
  color: map-get($colors-map, 'black');

  &.diff-added {
    color: map-get($colors-map, 'black-80');
    background-color: #89c2a372;
    border-radius: 5px;
    padding: 4px;
  }

  &.diff-removed {
    text-decoration-line: line-through;
    color: #ec241d;
    background-color: #e4918f62;
    border-radius: 5px;
    padding: 4px;
  }

  &.fullChange {
    background-color: transparent;
    padding: 0;
  }
}
</style>
