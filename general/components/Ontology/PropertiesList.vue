<template>
  <div class="show-more-list">
    <div v-if="list.length > 1">
      <ul>
        <li
          v-for="field in list.slice(0, limit)"
          :key="field.id"
          :class="{'has-list': field.hasList}"
          ref="sliceList"
        >
          <component
            :is="field.type"
            :value="field.value"
            :entityMaping="field.entityMaping"
            v-bind="field"
          />
        </li>
      </ul>
      <b-collapse :id="`${sectionId}-collapse`" v-model="expanded">
        <transition name="list">
          <ul class="animated-list" :id="sectionId" v-show="expanded">
            <li
              v-for="(field, index) in list.slice(limit)"
              :key="field.id"
              :class="{'has-list': field.hasList}"
              class="list-item"
              ref="collapsedList"
            >
              <component
                :is="field.type"
                :value="field.value"
                :entityMaping="field.entityMaping"
                :identifier="sectionId + index"
                v-bind="field"
              />
            </li>
          </ul>
        </transition>
      </b-collapse>
    </div>

    <component
      v-else
      v-for="field in list"
      :key="field.id"
      :is="field.type"
      :value="field.value"
      :entityMaping="field.entityMaping"
      :class="{'has-list': field.hasList}"
      v-bind="field"
    ></component>

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
  },
  name: 'PropertiesList',
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
      this.checkHasList(element)
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
        item.hasList = true
      }
      else if (item.type === "STRING" && item.value?.includes("\n")) {
        item.hasList = true
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

.see-more-btn-wrapper {
  margin-left: 10px;
}
</style>
