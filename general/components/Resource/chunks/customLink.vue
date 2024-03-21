<template>
  <nuxt-link
    v-if="query.startsWith(uriSpace)"
    :prefetch="false"
    :to="{
      path: `/ontology/${query.replace(uriSpace, '')}`,
      query: {
        ...($route.query && $route.query.version
          ? { version: encodeURI($route.query.version) }
          : null)
      }
    }"
    :class="{ deprecated: isDeprecated === 'true' }"
    @click.native="linkClickNative"
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
        ...($route.query && $route.query.version
          ? { version: encodeURI($route.query.version) }
          : null)
      }
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
  name: 'CustomLink',
  beforeRouteUpdate(to, from, next) {
    next();
  },
  props: {
    name: String,
    query: String,
    isDeprecated: String,
    customLinkOnClick: Function
  },
  data() {
    return {
      tooltips
    };
  },
  computed: {
    ...mapState(useConfigurationStore, {
      uriSpace: (store) => store.config.uriSpace
    })
  },
  methods: {
    linkClickNative(event) {
      if (this.customLinkOnClick !== undefined) {
        this.customLinkOnClick(event);
      }
    }
  }
};
</script>
