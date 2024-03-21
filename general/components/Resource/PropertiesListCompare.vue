<template>
  <div class="show-more-list-compare">
    <div v-if="list.length > 1">
      <ul :class="{ 'is-show-more': list.length > limit }">
        <li
          v-for="field in list.slice(0, limit)"
          :key="field.id"
          ref="sliceList"
          class="compare-item row"
        >
          <ChunkResolver
            :value="field.left"
            :class="{ 'has-list': field.left.hasList }"
            class="top-level top-level--list compare-left col-6"
          />
          <ComparedText
            :current-item="field.left"
            :compared-item="field.right"
            :change-type="field.changeType"
            :identifier="sectionId + '1'"
            :class="{ 'has-list': field.right.hasList || field.left.hasList }"
            class="top-level top-level--list compare-right col-6"
          />
        </li>
      </ul>
      <bs-collapse :id="sectionId" :open="expanded">
        <ul
          :id="sectionId"
          class="animated-list"
          :class="{ 'is-show-more': list.length > limit }"
        >
          <li
            v-for="field in list.slice(limit)"
            :key="field.id"
            ref="collapsedList"
            :class="{ 'has-list': field.hasList }"
            class="compare-item row"
          >
            <ChunkResolver
              :value="field.left"
              :class="{ 'has-list': field.left.hasList }"
              class="top-level top-level--list compare-left col-6"
            />
            <ComparedText
              :current-item="field.left"
              :compared-item="field.right"
              :change-type="field.changeType"
              :identifier="sectionId + '1'"
              :class="{
                'has-list': field.right.hasList || field.left.hasList
              }"
              class="top-level top-level--list compare-right col-6"
            />
          </li>
        </ul>
      </bs-collapse>
    </div>
    <div v-else class="show-more-list-compare__short">
      <div v-for="field in list" :key="field.id">
        <ul>
          <li class="compare-item row">
            <ChunkResolver
              :value="field.left"
              :class="{ 'has-list': field.left.hasList }"
              class="top-level top-level--single compare-left col-6"
            />
            <ComparedText
              :current-item="field.left"
              :compared-item="field.right"
              :change-type="field.changeType"
              :identifier="sectionId + '1'"
              :class="{ 'has-list': field.right.hasList || field.left.hasList }"
              class="top-level top-level--single compare-right col-6"
            />
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="list.length > limit"
      :class="{ 'reveal-shadow': !expanded }"
      class="see-more-btn-wrapper"
    >
      <div
        v-if="!expanded"
        :key="'see-more-btn'"
        class="see-more-btn"
        @click="toggleExpanded()"
      >
        <div>Show {{ howManyMore }} more</div>
      </div>
      <div
        v-else
        :key="'see-less-btn'"
        class="see-less-btn"
        @click="toggleExpanded()"
      >
        <div>Show less</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertiesListCompare',
  props: [
    'list',
    'limit', // specifies how many items can be displayed without collapsing
    'sectionId'
  ],
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    howManyMore() {
      return this.list.length - this.limit;
    }
  },
  created() {
    this.list.forEach((element) => {
      this.checkHasList(element.left);
      this.checkHasList(element.right);
    });
  },
  methods: {
    toggleExpanded() {
      const element = document.getElementById(this.sectionId);
      const topOffset = element.getBoundingClientRect().top;

      if (!this.expanded) {
        this.expanded = !this.expanded;
      } else if (topOffset < 0) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
        setTimeout(() => {
          this.expanded = !this.expanded;
        }, 500);
      } else {
        this.expanded = !this.expanded;
      }
    },
    checkHasList(item) {
      if (item.type === 'AXIOM') {
        if (
          (Array.isArray(item.value) && item.value && item.value.length > 1) ||
          item.fullRenderedString?.includes('<br />')
        )
          item.hasList = true;
      } else if (item.type === 'OWL_LABELED_MULTI_AXIOM') {
        if (Array.isArray(item.value) && item.value && item.value.length > 0)
          item.hasList = true;
      } else if (item.type === 'STRING') {
        if (
          (Array.isArray(item.value) && item.value && item.value.length > 1) ||
          item.value?.includes('\n')
        )
          item.hasList = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.animated-list {
  overflow: hidden;
}

.see-more-btn-wrapper.reveal-shadow {
  box-shadow: 0px -20px 20px -20px white;
}
</style>
