<template>
  <nuxt-link
    v-if="query.startsWith(this.internalOntologyUrl)"
    :to="{
      path: query.replace(this.internalOntologyUrl, ''),
      query: {
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null),
      },
    }"
    @click.native="linkClickNative"
  >
    {{ name }}
  </nuxt-link>
  <nuxt-link
    v-else
    :to="{
      path: '/ontology',
      query: {
        ...{ query },
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null),
      },
    }"
  >
    {{ name }}
  </nuxt-link>
</template>
<script>
export default {
  name: 'customLink',
  props: {name: String, query: String, customLinkOnClick: Function},
  methods: {
    linkClickNative(event) {
      if(this.customLinkOnClick !== undefined){
        this.customLinkOnClick(event);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  computed: {
    ontologyName() {
      return process.env.ontologyName.toLowerCase();
    },
    internalOntologyUrl() {
      return `https://spec.edmcouncil.org/${this.ontologyName}`;
    },
  }
};
</script>
