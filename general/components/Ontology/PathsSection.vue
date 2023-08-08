<template>
  <div>
    <h5
      class="section-title"
      :class="{ 'section-collapse': sectionCollapsed }"
      @click="toggleSectionCollapsed()"
      ref="scrollTarget"
    >
      Path(s)
    </h5>
    <div class="section-content-wrapper">
      <div class="custom-control custom-switch">
        <input
          type="checkbox"
          class="custom-control-input"
          id="paths-switch"
          v-model="isTreeView"
        />
        <label class="custom-control-label-prev" for="paths-switch">
          List
        </label>
        <label class="custom-control-label" for="paths-switch"> Tree </label>
      </div>

      <transition name="fade" mode="out-in">
        <div
          key="path-view"
          class="ontology-item__paths__path-view"
          v-if="!isTreeView"
        >
          <PathsListItem
            v-for="(listItem, index) in data.taxonomy.value.slice(0, 2)"
            :key="'taxonomyParagraph' + index + data.iri"
            :itemData="listItem"
          />

          <div v-if="data.taxonomy.value.length > 2">
            <b-collapse v-model="isPathsMoreVisible">
              <transition name="list">
                <div v-show="isPathsMoreVisible">
                  <PathsListItem
                    v-for="(listItem, index) in data.taxonomy.value.slice(2)"
                    :key="'taxonomyParagraph' + index + data.iri"
                    :itemData="listItem"
                    ref="collapseList"
                  />
                </div>
              </transition>
            </b-collapse>

            <div v-show="!isPathsMoreVisible" @click="togglePathsMoreVisible()">
              <div class="see-more-btn">
                Show {{ data.taxonomy.value.length - 2 }} more
                {{ data.taxonomy.value.length - 2 > 1 ? "paths" : "path" }}
              </div>
            </div>

            <div v-show="isPathsMoreVisible" @click="togglePathsMoreVisible()">
              <div class="see-less-btn">Show less paths</div>
            </div>
          </div>
        </div>
        <div key="tree-view" class="ontology-item__paths__tree-view" v-else>
          <ul class="ontology-item__paths__tree-view__root">
            <PathsTree
              v-for="(child, index) in treeView"
              :key="child.label"
              :item="child"
              :isLast="index == treeView.length - 1"
              :isOnly="treeView.length === 1"
              :isRoot="true"
            />
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PathsSection',
  props: ['data'],
  data() {
    return {
      sectionCollapsed: false,
      treeView: [],
      isTreeView: false,
      isPathsMoreVisible: false,
    };
  },
  created() {
    if (localStorage.isTreeView && localStorage.isTreeView === 'true') {
      this.isTreeView = true;
    }
    this.initializeTree();
  },
  methods: {
    toggleSectionCollapsed() {
      this.sectionCollapsed = !this.sectionCollapsed;
    },
    togglePathsMoreVisible() {
      const element = this.$refs.scrollTarget;
      const topOffset = element.getBoundingClientRect().top;

      if (this.isPathsMoreVisible && topOffset < 0) {
        this.$refs.scrollTarget.scrollIntoView({
          behavior: 'smooth',
        });
        setTimeout(() => {
          this.isPathsMoreVisible = false;
        }, 500);
      } else {
        this.isPathsMoreVisible = !this.isPathsMoreVisible;
      }

      this.$nextTick(() => {
        this.$refs.collapseList.forEach((element) => {
          element.checkOverflow();
        });
      });
    },
    initializeTree() {
      if (this.data.taxonomy?.value) {
        this.treeView = [];
        const tempTaxonomy = JSON.parse(
          JSON.stringify(this.data.taxonomy.value),
        );
        tempTaxonomy.forEach((element) => {
          this.getTreeFromList(element, this.treeView);
        });
      }
    },
    getTreeFromList(parts, treeNode) {
      if (parts.length === 0) {
        return;
      }

      for (let i = 0; i < treeNode.length; i++) {
        if (parts[0].label === treeNode[i].value.label) {
          this.getTreeFromList(
            parts.splice(1, parts.length),
            treeNode[i].children,
          );
          return;
        }
      }

      const newNode = { value: parts[0], children: [] };
      treeNode.push(newNode);
      this.getTreeFromList(parts.splice(1, parts.length), newNode.children);
    },
  },
  watch: {
    isTreeView: (newValue) => {
      localStorage.isTreeView = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.see-more-btn {
  margin-top: 0px;
}

.see-less-btn {
  margin-top: 0px;
}

h5 {
  margin-bottom: 40px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  color: black;
}

.ontology-item__paths__tree-view {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px 20px;

  .ontology-item__paths__tree-view__root {
    padding-left: 0px;
    margin: 0;
    list-style: none;
  }
}

@media (max-width: 991px) {
  h5 {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    color: black;
  }
}
</style>
