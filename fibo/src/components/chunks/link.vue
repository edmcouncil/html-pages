<template>
  <router-link v-if="query.match(/^https:\/\/spec\.edmcouncil\.org\/fibo/)"
    :to="{
      path: query.replace(/https:\/\/spec\.edmcouncil\.org\/fibo/,''),
      query: {
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null)
      }
    }"
    @click.native="linkClickNative"
    >{{name}}</router-link>
  <router-link v-else
    :to="{
      name: 'ontology',
      query: {
        ...{query},
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null)
      }
    }"
    >{{name}}</router-link>
  
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
