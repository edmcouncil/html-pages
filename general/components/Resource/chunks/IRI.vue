<template>
  <component :is="processedHtml"></component>
</template>
<script>
import customLink from './customLink';

export default {
  name: 'IRI',
  components: {
    customLink
  },
  props: ['value', 'entityMaping'],
  computed: {
    processedHtml() {
      const html = `<customLink name="${this.label}" query="${this.iri}" isDeprecated="${this.value.deprecated}"></customLink>`;
      return {
        template: `<div>${html}</div>`
      };
    },
    label() {
      if (this.value.label) return this.value.label;
      else return this.value.iri ? this.value.iri : this.value;
    },
    iri() {
      return this.value.iri ? this.value.iri : this.value;
    }
  }
};
</script>
