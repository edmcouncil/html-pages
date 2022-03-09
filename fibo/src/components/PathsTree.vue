<template>
  <li>
    <div
      class="icon"
      :class="{ 'item-open': isOpen }"
      @click="toggleOpen"
      v-if="isFolder"
    ></div>
    <span>
      <customLink
        class="custom-link"
        :name="item.value.label"
        :query="item.value.iri"
      ></customLink>
    </span>
    <ul v-show="isOpen">
      <paths-tree
        v-for="child in this.item.children"
        :key="child.label"
        :item="child"
      />
    </ul>
  </li>
</template>

<script>
import Vue from "vue";
import customLink from "./chunks/link";

Vue.component("customLink", customLink);

export default {
  name: "paths-tree",
  props: {
    item: Object,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding-left: 0px;
  list-style: none;
}

li {
  padding-left: 20px;
  position: relative;

  .custom-link {
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0.01em;
  }
  .icon {
    background-image: url("../assets/icons/arrow.svg");
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: center;

    position: absolute;
    left: -10px;

    display: block;
    width: 30px;
    height: 30px;

    &:hover {
      cursor: pointer;
    }
    &.item-open {
      transform: rotate(90deg);
    }
  }
}
</style>
