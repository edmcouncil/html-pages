<template>
  <nuxt-link
    v-if="query.startsWith(this.uriSpace)"
    :to="{
      path: `/ontology/${query.replace(this.uriSpace, '')}`,
      query: {
        ...(this.$route.query && this.$route.query.version
          ? { version: encodeURI(this.$route.query.version) }
          : null),
      },
    }"
    @click.native="linkClickNative"
    :class="{ deprecated: isDeprecated === 'true' }"
    >{{ name
    }}<TooltipInline
      v-if="isDeprecated === 'true'"
      :text="tooltips['deprecated']"
  /></nuxt-link>
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
    :class="{ deprecated: isDeprecated === 'true' }"
    >{{ name
    }}<TooltipInline
      v-if="isDeprecated === 'true'"
      :text="tooltips['deprecated']"
  /></nuxt-link>
</template>

<script>
import tooltips from '~/constants/tooltips';

export default {
  name: 'customLink',
  props: {
    name: String,
    query: String,
    isDeprecated: String,
    customLinkOnClick: Function,
  },
  data() {
    return {
      tooltips,
    };
  },
  methods: {
    linkClickNative(event) {
      if (this.customLinkOnClick !== undefined) {
        this.customLinkOnClick(event);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  computed: {
    ontologyName() {
      return this.$store.state.configuration.config.ontpubFamily.toLowerCase();
    },
    uriSpace() {
      return this.$store.state.configuration.config.uriSpace;
    },
  },
};
</script>
