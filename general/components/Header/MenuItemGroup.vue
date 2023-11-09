<template>
  <button
    class="nav-link dropdown-item sub-nav-menu"
    :class="{ collapsed: !isOpen }"
    @click.stop="toggleOpen"
  >
    {{ item.item.name }}
  </button>
  <bs-collapse
    :open="isOpen"
    :id="item.item.name + item.id"
  >
    <template v-for="subitem in item.submenu">
      <nuxt-link
        v-if="subitem.type === 'router-link'"
        class="nav-link dropdown-item sub-nav-item"
        :to="{ path: subitem.link }"
      >
        {{ subitem.name }}</nuxt-link
      >
      <a
        v-else-if="subitem.type === 'link'"
        :href="subitem.link"
        class="nav-link dropdown-item sub-nav-item"
      >
        {{ subitem.name }}
      </a>
    </template>
  </bs-collapse>
</template>

<script>
export default {
  name: 'MenuItemGroup',
  props: {
    item: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted() {

  },
  beforeUnmount() {

  },
  watch: {

  },
  computed: {

  }
};
</script>
