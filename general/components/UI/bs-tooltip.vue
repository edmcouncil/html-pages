<template>
  <div
    ref="tooltipElement"
    :data-bs-title="text"
    :data-bs-placement="placement ? placement : 'bottom'"
    :data-bs-offset="offset ? offset : '0,0'"
    class="bs-tooltip"
    data-bs-toggle="tooltip"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BsTooltip',
  props: ['text', 'placement', 'offset'],
  data() {
    return {
      instance: null
    };
  },
  mounted() {
    const { $bootstrap } = useNuxtApp();
    const element = this.$refs.tooltipElement;
    this.instance = new $bootstrap.Tooltip(element);
  },
  beforeUnmount() {
    this.instance.dispose();
  }
};
</script>

<style lang="scss">
.bs-tooltip {
  display: inline-block;
  max-width: 100%;
}
.tooltip {
  --bs-tooltip-padding-x: 5px;
  --bs-tooltip-padding-y: 5px;
  --bs-tooltip-font-size: 0.875rem;
  --bs-tooltip-color: var(--bs-body-bg);
  --bs-tooltip-bg: black;
  --bs-tooltip-border-radius: 2px;
  --bs-tooltip-opacity: 1;
  --bs-tooltip-arrow-width: 0.8rem;
  --bs-tooltip-arrow-height: 0.4rem;
  font-family: Inter;
}
</style>
