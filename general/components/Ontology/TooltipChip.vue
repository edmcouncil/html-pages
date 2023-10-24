<template>
  <bs-tooltip :text="tooltipText">
    <div class="resource-tooltip-chip">
      {{ chipText }}
    </div>
  </bs-tooltip>
</template>

<script>
export default {
  name: 'TooltipChip',
  props: ['chipText', 'tooltipText'],
};
</script>

<style lang="scss">
.resource-tooltip-chip {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-overflow: ellipsis;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 6px 10px;
  color: black;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  width: min-content;
  display: inline;
  cursor: default;
}
</style>
