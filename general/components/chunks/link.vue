<template>
  <nuxt-link
    v-if="query.match(this.regex)"
    :to="{
      path: query.replace(this.regexToReplace, ''),
      query: {
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null),
      },
    }"
    @click.native="linkClickNative"
    >{{ name }}</nuxt-link
  >
  <nuxt-link
    v-else
    :to="{
      name: 'ontology',
      query: {
        ...{ query },
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null),
      },
    }"
    >{{ name }}</nuxt-link
  >
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
    regex() {
      return new RegExp( `/^https:\/\/spec\.edmcouncil\.org\/${this.ontologyName}/` );
    },
    regexToReplace() {
      return new RegExp( `/https:\/\/spec\.edmcouncil\.org\/${this.ontologyName}/` );
    }
  }
};
</script>
