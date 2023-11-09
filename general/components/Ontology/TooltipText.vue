<template>
  <span v-if="found"><!--
  -->{{ textBefore}}<!--
    --><bs-tooltip :text="tooltipText"><!--
      --><span class="resource-text-tooltip">{{ textWrapped }}</span><!--
    --></bs-tooltip><!--
    -->{{ textAfter }}<!--
  --></span>
  <span v-else>
    {{ content }}
  </span>
</template>

<script>
export default {
  name: 'TooltipText',
  props: ['tooltipText', 'content', 'defining'],
  data() {
    return {
      textBefore: '',
      textWrapped: '',
      textAfter: '',
      found: false,
    };
  },
  mounted() {
    const { content } = this;
    const { length } = this.defining;
    const index = content.indexOf(this.defining);

    if (index !== -1) {
      this.found = true;
      this.textBefore = content.slice(0, index);
      this.textAfter = content.slice(index + length);
      this.textWrapped = this.defining;
    }
  },
};
</script>

<style lang="scss">
.resource-text-tooltip {
  text-decoration-line: underline;
  text-decoration-style: dashed;
  text-underline-position: under;
  text-decoration-color: map-get($colors-map, "black-40");
  overflow: visible;
}
</style>
