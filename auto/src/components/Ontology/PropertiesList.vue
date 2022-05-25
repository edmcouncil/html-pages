<template>
  <div class="show-more-list">
    <div v-if="list.length > 1">
      <ul>
        <li v-for="field in list.slice(0, limit)" :key="field.id">
          <component
            :is="field.type"
            :value="field.value"
            :entityMaping="field.entityMaping"
            v-bind="field"
          />
        </li>
      </ul>
      <transition name="list">
        <ul class="animated-list" v-show="!collapsed" :id="sectionId">
          <li
            v-for="field in list.slice(limit)"
            :key="field.id"
            class="list-item"
          >
            <component
              :is="field.type"
              :value="field.value"
              :entityMaping="field.entityMaping"
              v-bind="field"
            />
          </li>
        </ul>
      </transition>
    </div>

    <component
      v-else
      v-for="field in list"
      :key="field.id"
      :is="field.type"
      :value="field.value"
      :entityMaping="field.entityMaping"
      v-bind="field"
    ></component>

    <div class="see-more-btn-wrapper" v-if="list.length > limit">
        <div
          v-if="collapsed"
          class="see-more-btn"
          :key="'see-more-btn'"
          @click="toggleCollapsed()"
        >
          <div>Show {{ howManyMore }} more</div>
        </div>
        <div
          v-else
          class="see-less-btn"
          :key="'see-less-btn'"
          @click="
            toggleCollapsed();
            scrollBackUp();
          "
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
      collapsed: true,
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    scrollBackUp() {
      // only scroll back when element is higher
      const element = document.getElementById(this.sectionId);
      const topOffset = element.getBoundingClientRect().top;
      if(topOffset < 0) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  },
  computed: {
    howManyMore() {
      return this.list.length - this.limit;
    }
  }
};
</script>

<style lang="scss" scoped>
.animated-list {
  overflow: hidden;
  max-height: 60000px;
}
.list-leave-active {
  transition: max-height 1s cubic-bezier(0.075, 0.820, 0.000, 1.000), opacity 0.5s;
}
.list-enter-active {
  transition: max-height 1s cubic-bezier(0.920, 0.005, 0.980, 0.335), opacity 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
