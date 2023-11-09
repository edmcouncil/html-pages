<template>
  <div class="show-more-list">
    <div v-if="list.length > 1">
      <ul :class="{ 'is-show-more': list.length > limit }">
        <li
          v-for="field in list.slice(0, limit)"
          :key="field.id"
          :class="{ 'has-list': field.hasList }"
          ref="sliceList"
          class="top-level top-level--list"
        >
          <component
            :is="resolved(field.type)"
            :value="field.value"
            :entityMaping="field.entityMaping"
            :inferable="field.inferable"
            :entityLabel="field.entityLabel"
            v-bind="field"
          />
          <SubAnnotation
            v-for="(subannotation, key) in field.subAnnotations"
            :key="key"
            :title="key"
            :subannotation="subannotation"
          />
        </li>
      </ul>
      <bs-collapse :id="sectionId" :open="expanded">
        <ul
          class="animated-list"
          :id="sectionId"
          :class="{ 'is-show-more': list.length > limit }"
        >
          <li
            v-for="(field, index) in list.slice(limit)"
            :key="field.id"
            :class="{ 'has-list': field.hasList }"
            class="list-item top-level top-level--list"
            ref="collapsedList"
          >
            <component
              :is="resolved(field.type)"
              :value="field.value"
              :entityMaping="field.entityMaping"
              :inferable="field.inferable"
              :entityLabel="field.entityLabel"
              :identifier="sectionId + index"
              v-bind="field"
            />
            <SubAnnotation
              v-for="(subannotation, key) in field.subAnnotations"
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
      >
        <component
          :is="resolved(field.type)"
          :value="field.value"
          :entityMaping="field.entityMaping"
          :inferable="field.inferable"
          :entityLabel="field.entityLabel"
          :class="{ 'has-list': field.hasList }"
          v-bind="field"
        ></component>
        <SubAnnotation
          v-for="(subannotation, key) in field.subAnnotations"
          :key="key"
          :title="key"
          :subannotation="subannotation"
        />
      </div>
    </div>

    <div class="see-more-btn-wrapper" v-if="list.length > limit">
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
  name: 'PropertiesList',
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
      if (
        item.type === 'AXIOM'
        && item.fullRenderedString?.includes('<br />')
      ) {
        item.hasList = true;
      } else if (
        item.type === 'OWL_LABELED_MULTI_AXIOM'
        && Array.isArray(item.value)
        && item.value
        && item.value.length > 0
      ) {
        item.hasList = true;
      } else if (item.type === 'STRING' && item.value?.includes('\n')) {
        item.hasList = true;
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
</style>
