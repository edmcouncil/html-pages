<template>
  <component :is="processedHtml"></component>
</template>
<script>
import customLink from './customLink';

export default {
  name: 'INSTANCES',
  components: {
    customLink
  },
  props: ['value', 'entityMaping'],
  computed: {
    processedHtml() {
      const html = `<customLink name="${this.value.label}" query="${this.value.iri}"></customLink>`;
      return {
        template: `<div>${html}</div>`
      };
    }
  }
};
</script>
