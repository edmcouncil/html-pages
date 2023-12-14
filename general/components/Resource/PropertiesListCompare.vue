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
          <ChunkResolver :value="field.left" :class="{ 'has-list': field.left.hasList }" class="top-level top-level--list compare-left col-6" />
          <ComparedText
            :currentItem="field.left"
            :comparedItem="field.right"
            :changeType="field.changeType"
            :identifier="sectionId + '1'"
            :class="{ 'has-list': field.right.hasList || field.left.hasList }"
            class="top-level top-level--list compare-right col-6"
          />
        </li>
      </ul>
      <bs-collapse :id="sectionId" :open="expanded">
        <transition name="list">
          <ul
            class="animated-list"
            :id="sectionId"
            :class="{ 'is-show-more': list.length > limit }"
          >
            <li
              v-for="(field, index) in list.slice(limit)"
              :key="field.id"
              :class="{ 'has-list': field.hasList }"
              class="compare-item row"
              ref="collapsedList"
            >
              <ChunkResolver :value="field.left" :class="{ 'has-list': field.left.hasList }" class="top-level top-level--list compare-left col-6" />
              <ComparedText
                :currentItem="field.left"
                :comparedItem="field.right"
                :changeType="field.changeType"
                :identifier="sectionId + '1'"
                :class="{
                  'has-list': field.right.hasList || field.left.hasList,
                }"
                class="top-level top-level--list compare-right col-6"
              />
            </li>
          </ul>
        </transition>
      </bs-collapse>
    </div>
    <div class="show-more-list-compare__short" v-else>
      <div
        v-for="field in list"
        :key="field.id"
        class="compare-item row"
      >
        <ul
          :class="{ 'has-list': field.left.hasList }"
          class="top-level top-level--single compare-left col-6"
        >
          <li>
            <ChunkResolver
              :value="field.left"
            />
          </li>
        </ul>
        <ul
          :class="{ 'has-list': field.right.hasList || field.left.hasList }"
          class="top-level top-level--single compare-right col-6"
        >
          <li>
            <ComparedText
              :currentItem="field.left"
              :comparedItem="field.right"
              :changeType="field.changeType"
              :identifier="sectionId + '1'"
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
        class="see-more-btn"
        :key="'see-more-btn'"
        @click="toggleExpanded()"
      >
        <div>Show {{ howManyMore }} more</div>
      </div>
      <div
        v-else
        class="see-less-btn"
        :key="'see-less-btn'"
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
    'sectionId',
  ],
  data() {
    return {
      expanded: false,
    };
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
          behavior: 'smooth',
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
          (Array.isArray(item.value) && item.value && item.value.length > 1)
          || item.fullRenderedString?.includes('<br />')
        ) item.hasList = true;
      } else if (item.type === 'OWL_LABELED_MULTI_AXIOM') {
        if (Array.isArray(item.value) && item.value && item.value.length > 0) item.hasList = true;
      } else if (item.type === 'STRING') {
        if (
          (Array.isArray(item.value) && item.value && item.value.length > 1)
          || item.value?.includes('\n')
        ) item.hasList = true;
      }
    },
    resolved(name) {
      return resolveComponent(name.replaceAll('_', ''));
    }
  },
  computed: {
    howManyMore() {
      return this.list.length - this.limit;
    },
  },
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
