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
          <component
            :is="field.left.type"
            :value="field.left.value"
            :entityMaping="field.left.entityMaping"
            v-bind="field.left"
            :class="{ 'has-list': field.left.hasList }"
            class="top-level top-level--list compare-left col-6"
          />
          <ComparedText
            :currentItem="field.left"
            :comparedItem="field.right"
            :identifier="sectionId + '1'"
            :class="{ 'has-list': field.right.hasList }"
            class="top-level top-level--list compare-right col-6"
          />
        </li>
      </ul>
      <b-collapse :id="`${sectionId}-collapse`" v-model="expanded">
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
              <component
                :is="field.left.type"
                :value="field.left.value"
                :entityMaping="field.left.entityMaping"
                :identifier="sectionId + index"
                v-bind="field.left"
                :class="{ 'has-list': field.left.hasList }"
                class="top-level top-level--list compare-left col-6"
              />
              <ComparedText
                :currentItem="field.left"
                :comparedItem="field.right"
                :identifier="sectionId + '1'"
                :class="{ 'has-list': field.right.hasList }"
                class="top-level top-level--list compare-right col-6"
              />
            </li>
          </ul>
        </transition>
      </b-collapse>
    </div>

    <div class="compare-item row" v-else v-for="field in list" :key="field.id">
      <component
        :is="field.left.type"
        :value="field.left.value"
        :entityMaping="field.left.entityMaping"
        :class="{ 'has-list': field.left.hasList }"
        v-bind="field.left"
        class="top-level top-level--single compare-left col-6"
      />
      <ComparedText
        :currentItem="field.left"
        :comparedItem="field.right"
        :identifier="sectionId + '1'"
        :class="{ 'has-list': field.right.hasList }"
        class="top-level top-level--single compare-right col-6"
      />
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
  components: {
    AXIOM: () => import(/* webpackChunkName: "AXIOM" */ '../chunks/AXIOM'),
    STRING: () => import(/* webpackChunkName: "STRING" */ '../chunks/STRING'),
    DIRECT_SUBCLASSES: () =>
      import(
        // eslint-disable-next-line comma-dangle
        /* webpackChunkName: "DIRECT_SUBCLASSES" */ '../chunks/DIRECT_SUBCLASSES'
      ),
    MODULES: () => import(/* webpackChunkName: "MODULES" */ '../chunks/MODULES'),
    IRI: () => import(/* webpackChunkName: "IRI" */ '../chunks/IRI'),
    INSTANCES: () =>
      import(
        // eslint-disable-next-line comma-dangle
        /* webpackChunkName: "INSTANCES" */ '../chunks/INSTANCES'
      ),
    ANY_URI: () => import(/* webpackChunkName: "ANY_URI" */ '../chunks/ANY_URI'),
    EMPTY: () => import(/* webpackChunkName: "EMPTY" */ '../chunks/EMPTY'),
  },
  name: 'PropertiesListCompare',
  props: [
    'list',
    'limit', // specifies how many items can be displayed without collapsing
    'sectionId',
  ],
  data() {
    return {
      expanded: false,
    }
  },
  created() {
    this.list.forEach(element => {
      this.checkHasList(element.left);
      this.checkHasList(element.right);
    })
  },
  methods: {
    toggleExpanded() {
      const element = document.getElementById(this.sectionId);
      const topOffset = element.getBoundingClientRect().top;

      if (!this.expanded) {
        this.expanded = !this.expanded;
      } else if(topOffset < 0) {
        element.scrollIntoView({
          behavior: "smooth"
        });
        setTimeout(()=>{
          this.expanded = !this.expanded;
        }, 500)
      }
      else {
        this.expanded = !this.expanded;
      }
    },
    checkHasList(item) {
      if (item.type === "AXIOM" && item.fullRenderedString?.includes("<br />")) {
        item.hasList = true;
      }
      else if (item.type === "STRING" && item.value?.includes("\n")) {
        item.hasList = true;
      }
    }
  },
  computed: {
    howManyMore() {
      return this.list.length - this.limit;
    },
  }
};
</script>

<style lang="scss" scoped>
.animated-list {
  overflow: hidden;
}
</style>
