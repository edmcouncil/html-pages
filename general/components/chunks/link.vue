<template>
  <nuxt-link v-if="query.match(/^https:\/\/spec\.edmcouncil\.org\/idmp/)"
    :to="{
      path: query.replace(/https:\/\/spec\.edmcouncil\.org\/idmp/,''),
      query: {
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null)
      }
    }"
    @click.native="linkClickNative"
    >{{name}}</nuxt-link>
  <nuxt-link v-else
    :to="{
      name: 'ontology',
      query: {
        ...{query},
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null)
      }
    }"
    >{{name}}</nuxt-link>

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
};
</script>
