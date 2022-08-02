<template>
  <li class="module container">
    <div class="row">
      <div
        class="icon-arrow"
        :class="{ hidden: !isFolder, down: isOpen }"
        @click="toggle"
        v-b-toggle.collapse-3
      ></div>
      <div
        v-if="this.item.maturityLevel.label !== 'NOT_SET'"
        class="indicator-container"
        :class="{
          devIndicator:
            this.item.maturityLevel.label === 'PROVISIONAL' ||
            this.item.maturityLevel.label === 'INFORMATIVE',
          prodIndicator: this.item.maturityLevel.label === 'RELEASE',
          prodDevIndicator: this.item.maturityLevel.label === 'MIXED',
          indicator: true,
        }"
      ></div>
      <div class="label" :class="{ selected: isSelected }">
        <customLink
          class="custom-link"
          :name="item.label"
          :query="item.iri"
          :customLinkOnClick="this.ontologyClicked"
        ></customLink>
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder" class="list-unstyled">
      <module-tree
        :item="subItem"
        :location="location"
        v-for="subItem in item.subModule"
        :key="subItem.label"
      />
    </ul>
  </li>
</template>

<script>
import customLink from "./chunks/link";

export default {
  name: "module-tree",
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
    ontologyClicked(event) {},
    expandOpened(loc) {
      if (loc && loc.locationInModules) {
        this.isSelected = loc.locationInModules.some((location) => location == this.item.iri);
        this.isOpen = /* this.isOpen || */ this.isSelected; //isOpen is commented out to enable collapsing tree after opening different branch
      } else {
        this.isSelected = false;
        this.isOpen = false;
      }
    },
  },
  mounted() {
    this.expandOpened(this.location);
  },
  computed: {
    isFolder() {
      return this.item.subModule && this.item.subModule.length;
    },
  },
  watch: {
    location: {
      handler(val, oldVal) {
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
  margin-bottom: 5px;

  .row {
    flex-wrap: nowrap;
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
    margin: 5px 0px 5px 15px;
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
    &.devIndicator {
      background-image: url("../assets/icons/provisional-maturity.svg");
    }
    &.prodIndicator {
      background-image: url("../assets/icons/production-maturity.svg");
    }
    &.prodDevIndicator {
      background-image: url("../assets/icons/mixed-maturity.svg");
    }
  }
  .label {
    display: inline;
    line-height: 24px;
    padding-top: 2px;
    word-wrap: break-word;
    max-width: calc( 100% - 60px );
    &.selected {
      text-decoration: underline;
    }
    .custom-link {
      font-size: 14px;
      color: map-get($colors-map, "black");
    }
  }
}
</style>
