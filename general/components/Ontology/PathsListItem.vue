<template>
  <div class="ontology-item__paths__list-item">
    <div
      class="ontology-item__paths__list-item__container"
      :class="{ collapsed: !isFullPathVisible }"
      ref="listItemContainer"
    >
      <div class="taxonomy-wrapper">
        <span
          v-for="(element, index) in itemData"
          :key="'taxonomyEl' + index + element.iri"
        >
          <span v-if="element.iri.includes('http://org.semanticweb.owlapi/error#')" class="error-iri-element">{{element.label}}</span>
          <customLink v-else :name="element.label" :query="element.iri"></customLink>
          <span
            class="card-subtitle taxonomy-separator"
            v-if="index != Object.keys(itemData).length - 1"
          >
            /
          </span>
        </span>
      </div>

      <div
        class="collapseButtons"
        v-if="hasOverflow"
        @click="toggleFullPathVisible"
      >
        <div v-if="!isFullPathVisible" class="see-more-btn">Show full path</div>
        <div v-else class="see-less-btn">Hide full path</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PathsListItem",
  props: [ "itemData" ],
  data() {
    return {
      isFullPathVisible: false,
      hasOverflow: false,
      resizeDebounce: null,
    }
  },
  mounted() {
    this.checkOverflow();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    toggleFullPathVisible() {
      this.isFullPathVisible = !this.isFullPathVisible;
    },
    checkOverflow() {
      const wrapper = this.$refs.listItemContainer;
      const element = this.$refs.listItemContainer.firstChild;

      wrapper.style.overflow = "hidden";
      element.style.height = "1em";
      element.style.whiteSpace = "nowrap";

      const isOverflowing =
            element.clientWidth < element.scrollWidth;

      wrapper.style.removeProperty("overflow");
      element.style.removeProperty("height");
      element.style.removeProperty("white-space");

      this.hasOverflow = isOverflowing;
    },
    onResize() {
      clearTimeout(this.resizeDebounce);
      this.resizeDebounce = setTimeout(this.checkOverflow, 300);
    }
  },
}
</script>

<style lang="scss" scoped>
.error-iri-element {
  color: #ff6000 !important;
}
.ontology-item__paths__list-item {
  padding-bottom: 20px;

  .ontology-item__paths__list-item__container {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.4);
    border-radius: 2px;
    padding: 10px 20px;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0.01em;
  }

  .collapseButtons {
    display: none;
  }

  span {
    .taxonomy-separator {
      color: rgba(0, 0, 0, 0.4);
    }

    a {
      color: rgba(0, 0, 0, 0.8);

      &:active {
        color: $link-active-color;
      }
      &:hover {
        color: $link-hover-color;
      }
    }
  }
}

@media (max-width: 991px) {
  .ontology-item__paths__list-item {
    .ontology-item__paths__list-item__container {
      background: rgba(0, 0, 0, 0.05);
      color: rgba(0, 0, 0, 0.4);
      padding: 10px 20px;
      font-size: 16px;
      line-height: 24px;

      .taxonomy-wrapper {
        width: 100%;
        overflow: hidden;
      }
      span a {
        color: rgba(0, 0, 0, 0.8);
      }
      .collapseButtons {
        display: block;
        .see-less-btn {
          display: block;
        }
        .see-more-btn {
          display: none;
        }
      }
      &.collapsed {
        .taxonomy-wrapper {
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .collapseButtons {
          .see-less-btn {
            display: none;
          }
          .see-more-btn {
            display: block;
          }
        }
        .span {
          height: 1em;
        }
      }
    }
  }
}
</style>
