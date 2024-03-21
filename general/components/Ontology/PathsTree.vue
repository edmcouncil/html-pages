<template>
  <li :class="{ selected: !isFolder }">
    <div class="guiding-lines">
      <div v-if="!isRoot" class="parent-link" :class="{ only: isOnly }"></div>
      <div v-if="!isLast && !isRoot" class="line"></div>
    </div>
    <div
      v-if="isFolder"
      class="icon"
      :class="{ 'item-open': isOpen }"
      @click="toggleOpen"
    ></div>
    <span>
      <div v-if="isFolder && isOpen" class="wrapping-line-fill"></div>
      <customLink
        class="custom-link"
        :name="item.value.label"
        :query="item.value.iri"
      ></customLink>
    </span>
    <ul v-show="isOpen">
      <paths-tree
        v-for="(child, index) in item.children"
        :key="child.label"
        :item="child"
        :is-last="index == item.children.length - 1"
        :is-only="item.children.length === 1"
        :is-root="false"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'PathsTree',
  props: {
    item: Object,
    isLast: Boolean,
    isOnly: Boolean,
    isRoot: Boolean
  },
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  padding-left: 20px;
  position: relative;

  .parent-link {
    height: 15px;
    width: 10px;
    position: absolute;
    border-bottom: 1px solid rgb(153, 153, 153);
    left: -15px;

    &.only {
      border-left: 1px solid rgb(153, 153, 153);
    }
  }

  .line {
    height: calc(100% + 15px);
    width: 1px;
    position: absolute;
    border-left: 1px solid rgb(153, 153, 153);
    left: -15px;
  }

  span {
    position: relative;

    .wrapping-line-fill {
      height: calc(100% - 15px);
      width: 1px;
      position: absolute;
      border-left: 1px solid rgb(153, 153, 153);
      left: -15px;
      top: 30px;
    }

    .custom-link {
      font-size: 18px;
      line-height: 30px;
      letter-spacing: 0.01em;
    }
  }

  .icon {
    background-image: url('@/assets/icons/arrow.svg');
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: center;

    position: absolute;
    left: -9px;

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

  ul {
    margin: 0;
    padding-left: 0px;
    list-style: none;
  }
}

li.selected {
  font-weight: bold;

  .parent-link {
    width: 25px;
  }
}

@media (max-width: 768px) {
  li {
    span .custom-link {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
