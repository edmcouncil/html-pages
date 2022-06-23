<template>
  <div class="show-more-list">
    <div v-if="list.length > 1">
      <div v-if="list.length > limit" @click="guidingLineClick" class="properties-list-guiding-line"></div>
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
    },
    guidingLineClick() {
      if(!this.collapsed)
        this.scrollBackUp();
      this.toggleCollapsed();
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
.properties-list-guiding-line {
  position: absolute;
  left: -15px;
  top: -15px;
  height: calc(100% - 5px);
  width: 15px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  &:hover {
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    &::before {
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
    }
    &::after {
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
    cursor: pointer;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 7px;
    height: 0px;
    transition: border 0.2s;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  &::after {
    content: "";
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 15px;
    height: 0px;
    transition: border 0.2s;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
}
.see-more-btn-wrapper {
  padding-left: 15px;
}
.show-more-list {
  position: relative;
  padding: 5px 5px 5px 0px;
  border-radius: 2px;
}
ul {
  padding-left: 20px;
  list-style-type: disc;
}
li {
  padding: 5px 0;
}
li::marker {
  color: rgba(0, 0, 0, 0.4);
}
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
