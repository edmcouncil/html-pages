<template>
  <div class="resource-inline-tooltip" ref="resourceInlineTooltip">
    <Tooltip :targetRef="() => $refs['resourceInlineTooltip']" :text="text" />
  </div>
</template>

<script>
export default {
  name: 'TooltipInline',
  props: [
    'text'
  ],
};
</script>

<style lang="scss">
.resource-inline-tooltip {
  cursor: default;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("../../assets/icons/tooltip.svg");
  background-size: 100%;
  opacity: 0.5;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
