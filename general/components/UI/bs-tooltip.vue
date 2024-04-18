<template>
  <div
    ref="tooltipElement"
    :data-bs-title="text"
    :data-bs-placement="placement"
    :data-bs-offset="offset"
    class="bs-tooltip"
    data-bs-toggle="tooltip"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BsTooltip',
  props: {
    text: {
      type: String,
      required: true
    },
    placement: {
      type: String as PropType<'auto' | 'top' | 'bottom' | 'left' | 'right'>,
      default: 'bottom'
    },
    offset: {
      type: String,
      default: '0,0'
    },
    variant: {
      type: String as PropType<'default' | 'warning'>,
      default: 'default'
    }
  },
  data() {
    return {
      instance: null as any
    };
  },
  mounted() {
    const { $bootstrap } = useNuxtApp();
    const element = this.$refs.tooltipElement as HTMLElement;
    if (element) {
      this.instance = new $bootstrap.Tooltip(element, {
        title: this.text,
        placement: this.placement,
        offset: this.offset,
        customClass: this.variant
      });
    }
  },
  beforeUnmount() {
    if (this.instance) {
      this.instance.dispose();
    }
  }
});
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

  &.warning {
    --bs-tooltip-bg: #feb700;
    --bs-tooltip-color: black;
  }

  &.default {
    --bs-tooltip-bg: black;
    --bs-tooltip-color: var(--bs-body-bg);
  }
}
</style>
