<template>
  <b-tooltip
    :target="targetRef ? targetRef : target"
    placement="bottom"
    :delay="50"
    :noninteractive="true"
  >
    {{ text }}
  </b-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: ['target', 'targetRef', 'text'],
};
</script>

<style lang="scss">
.tooltip.b-tooltip.bs-tooltip-bottom {
  opacity: 0.8;
  .arrow::before {
    bottom: -1px;
  }
  .tooltip-inner {
    border-radius: 2px;
  }
}
</style>
