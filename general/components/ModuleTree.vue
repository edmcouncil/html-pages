<template>
  <li class="module">
    <div class="module-row">
      <div
        class="icon-arrow"
        :class="{ hidden: !isFolder, down: isOpen }"
        @click="toggle"
      ></div>
      <div
        v-if="this.item.maturityLevel.label !== 'Not Set'"
        class="indicator-container"
        :class="{
          provisionalIndicator:
            this.item.maturityLevel.label === 'Provisional' ||
            this.item.maturityLevel.label === 'Preliminary',
          informativeIndicator: this.item.maturityLevel.label === 'Informative',
          releaseIndicator: this.item.maturityLevel.label === 'Release',
          mixedIndicator: this.item.maturityLevel.label === 'Mixed',
          indicator: true,
        }"
      ></div>
      <div class="label" :class="{ selected: isSelected }">
        <customLink
          class="custom-link"
          :name="item.label"
          :query="item.iri"
        ></customLink>
      </div>
    </div>
    <bs-collapse
      v-if="isFolder"
      :open="isOpen"
      @shown="onShown()"
    >
      <transition name="list">
        <ul class="list-unstyled" v-show="isOpen">
          <module-tree
            v-for="subItem in item.subModule"
            :item="subItem"
            :location="location"
            :key="subItem.label"
            @treeOpeningFinished="openFolder()"
            ref="childNodes"
          />
        </ul>
      </transition>
    </bs-collapse>
  </li>
</template>

<script>
import customLink from './Resource/chunks/customLink';

export default {
  name: 'module-tree',
  components: {
    customLink,
  },
  props: {
    item: Object,
    location: Object,
  },
  data() {
    return {
      isOpen: false,
      isSelected: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    expandOpened(loc) {
      if (loc && loc.locationInModules) {
        const isLowestLevel = !this.isFolder || loc.locationInModules.at(-1) == this.item.iri;
        this.isSelected = loc.locationInModules.some(
          (location) => location == this.item.iri,
        );
        this.isOpen = this.isSelected && isLowestLevel;
        if (this.isOpen && !this.isFolder) {
          this.$emit('treeOpeningFinished');
        }
      } else {
        this.isSelected = false;
        this.isOpen = false;
      }
    },
    openFolder() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      this.isSelected = true;
    },
    onShown() {
      if (this.isOpen) {
        this.$emit('treeOpeningFinished');
      }
    }
  },
  mounted() {
    if (!this.isSelected) this.expandOpened(this.location);
  },
  computed: {
    isFolder() {
      return this.item?.subModule?.length && this.item.subModule.length > 0;
    },
  },
  watch: {
    location: {
      handler(val) {
        this.expandOpened(val);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.module {
  user-select: none;

  .module-row {
    display: flex;
    flex-wrap: nowrap;
    padding-top: 5px;
  }

  ul,
  li {
    padding: 0;

    ::before {
      margin-top: 10px;
      display: none;
    }
  }

  ul {
    padding: 0px 15px 0px 30px;
  }
  .icon-arrow.down {
    transform: rotate(90deg);
  }
  .icon-arrow {
    display: inline-block;
    height: 30px;
    width: 30px;
    background-image: url("../assets/icons/arrow.svg");
    background-position: center;
    flex-shrink: 0;
    transition: transform 0.4s;
    &.hidden {
      visibility: hidden;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .indicator {
    pointer-events: none;
    display: inline-block;
    height: 30px;
    width: 24px;
    background-position: center;
    background-size: 20px;
    background-repeat: no-repeat;
    flex-shrink: 0;
    margin-right: 5px;
    &.provisionalIndicator {
      background-image: url("../assets/icons/provisional-maturity.svg");
    }
    &.informativeIndicator {
      background-image: url("../assets/icons/informative-maturity.svg");
    }
    &.releaseIndicator {
      background-image: url("../assets/icons/production-maturity.svg");
    }
    &.mixedIndicator {
      background-image: url("../assets/icons/mixed-maturity.svg");
    }
  }
  .label {
    display: inline;
    line-height: 24px;
    padding-top: 2px;
    word-wrap: break-word;
    max-width: calc(100% - 60px);

    a {
      text-decoration: none;
    }

    &.selected a, a:hover {
      text-decoration: underline;
    }
    .custom-link {
      font-size: 14px;
      color: map-get($colors-map, "black");
    }
  }
}
</style>
