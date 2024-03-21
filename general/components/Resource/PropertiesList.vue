<template>
  <div class="show-more-list">
    <div v-if="list.length > 1">
      <ul :class="{ 'is-show-more': list.length > limit }">
        <li
          v-for="field in list.slice(0, limit)"
          :key="field.id"
          ref="sliceList"
          :class="{ 'has-list': field.hasList }"
          class="top-level top-level--list"
        >
          <ChunkResolver :value="field" />
          <SubAnnotation
            v-for="(subannotation, key) in getFieldAnnotations(field)"
            :key="key"
            :title="key"
            :subannotation="subannotation"
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
            class="list-item top-level top-level--list"
          >
            <ChunkResolver :value="field" />
            <SubAnnotation
              v-for="(subannotation, key) in getFieldAnnotations(field)"
              :key="key"
              :title="key"
              :subannotation="subannotation"
            />
          </li>
        </ul>
      </bs-collapse>
    </div>
    <div v-else>
      <div
        v-for="field in list"
        :key="field.id"
        class="top-level top-level--single"
        :class="{ 'has-list': field.hasList }"
      >
        <ul>
          <li>
            <ChunkResolver :value="field" />
            <SubAnnotation
              v-for="(subannotation, key) in getFieldAnnotations(field)"
              :key="key"
              :title="key"
              :subannotation="subannotation"
            />
          </li>
        </ul>
      </div>
    </div>

    <div v-if="list.length > limit" class="see-more-btn-wrapper">
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
  name: 'PropertiesList',
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
      this.checkHasList(element);
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
      if (
        item.type === 'AXIOM' &&
        item.fullRenderedString?.includes('<br />')
      ) {
        item.hasList = true;
      } else if (
        item.type === 'OWL_LABELED_MULTI_AXIOM' &&
        Array.isArray(item.value) &&
        item.value &&
        item.value.length > 0
      ) {
        item.hasList = true;
      } else if (item.type === 'STRING' && item.value?.includes('\n')) {
        item.hasList = true;
      }
    },
    getFieldAnnotations(field) {
      const annotations = { ...field.subAnnotations };

      field.annotationPropertyValues?.forEach((value) => {
        Object.assign(annotations, value.subAnnotations);
      });

      return annotations;
    }
  }
};
</script>

<style lang="scss" scoped>
.animated-list {
  overflow: hidden;
}
</style>
