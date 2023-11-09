<template>
  <nuxt-link
    v-if="query.startsWith(this.uriSpace)"
    :prefetch="false"
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
    :prefetch="false"
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
import { mapState } from 'pinia';
import { useConfigurationStore } from '@/stores/configuration';
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
    ...mapState(useConfigurationStore, {
      uriSpace: store => store.config.uriSpace,
    }),
  },
};
</script>
