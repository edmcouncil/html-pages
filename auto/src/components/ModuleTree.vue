<template>
  <div>
    <li class="module container">
      <div class="row">
        <div
          class="arrow-container"
          :class="{ hidden: !isFolder }"
          @click="toggle"
        >
          <img
            v:if="!isOpen"
            class="icon-arrow"
            :class="{ down: isOpen }"
            src="../assets/icons/arrow.svg"
          />
        </div>
        <div class="indicator-container">
          <i
            :class="{
              devIndicator:
                this.item.maturityLevel.label === 'PROVISIONAL' ||
                this.item.maturityLevel.label === 'INFORMATIVE',
              prodIndicator: this.item.maturityLevel.label === 'RELEASE',
              prodDevIndicator: this.item.maturityLevel.label === 'MIXED',
              indicator: true,
            }"
          ></i>
        </div>
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
  </div>
</template>

<script>
import Vue from "vue";
import customLink from "./chunks/link";

Vue.component("customLink", customLink);

export default {
  name: "module-tree",
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
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .row {
    flex-wrap: nowrap;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    line-height: 24px;
    font-size: 12px;

    ::before {
      margin-top: 10px;
      display: none;
    }
  }

  ul {
    margin-left: 15px;
  }
  .icon-arrow.down {
    -ms-transform: rotate(90deg); /* IE 9 */
    transform: rotate(90deg);
  }
  .arrow-container {
    display: inline-block;
    width: 10px;
    height: 1em;
    width: 1em;
    &.hidden {
      visibility: hidden;
    }
    &.down {
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      margin-bottom: 4px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .indicator-container {
    pointer-events: none;
  }
  .indicator {
    margin-left: 10px;
    margin-top: 4px;
    font-size: 0.8rem;
    height: 1.6em;
    width: 1.6em;
    display: inline-block;
    background-size: 1.6em;
    &.devIndicator {
      background-image: url("../assets/icons/provisional-maturity.svg");
      background-position: center;
    }
    &.prodIndicator {
      background-image: url("../assets/icons/production-maturity.svg");
      background-position: center;
    }
    &.prodDevIndicator {
      background-image: url("../assets/icons/mixed-maturity.svg");
      background-position: center;
    }
  }
  .label {
    display: inline;
    &.selected {
      text-decoration: underline;
    }

    .custom-link {
      font-size: 14px;
      color: map-get($colors-map, "black");
      margin-left: 6px;
    }
  }
}
</style>
