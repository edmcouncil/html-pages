<template>
  <bs-tooltip :text="text" :variant="variant">
    <div ref="resourceInlineTooltip" class="resource-inline-tooltip"></div>
  </bs-tooltip>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TooltipInline',
  props: {
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String as PropType<'default' | 'warning'>,
      default: 'default'
    }
  }
});
</script>

<style lang="scss">
.resource-inline-tooltip {
  cursor: default;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('../../assets/icons/tooltip.svg');
  background-size: 100%;
  opacity: 0.5;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
