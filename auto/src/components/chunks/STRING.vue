<template>
  <div v-if="!isShowMore">
    <component v-bind:is="fullProcessedHtml"></component>
  </div>
  <div v-else>
    <div class="list-wrapper">
      <div class="list-wrapper__guiding-line" @click="guidingLineClick"></div>
      <component v-bind:is="sliceProcessedHtml"></component>
      <transition name="list">
        <div class="animated-list" v-show="isMoreVisible" ref="scrollTarget">
          <component v-bind:is="moreProcessedHtml"></component>
        </div>
      </transition>
    </div>

    <div
      v-if="!isMoreVisible"
      href="#"
      @click.prevent="toggleIsMoreVisible()"
      class="see-more-btn-wrapper"
    >
      <div class="see-more-btn">Show {{ lines.length - 6 }} more</div>
    </div>
    <div
      v-else
      href="#"
      @click.prevent="
        toggleIsMoreVisible();
        scrollBackUp();
      "
      class="see-more-btn-wrapper"
    >
      <div class="see-less-btn">Show less</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import langCodeFlags from "./LangCodeFlags.vue";
import linkifyHtml from 'linkify-html';

Vue.component("langCodeFlags", langCodeFlags);

export default {
  name: 'STRING',
   components: {
    langCodeFlags
  },
  props: ['value'],
  data() {
    const linkifyOptions = {
      validate: {
        url: (value) => /^https?:\/\//.test(value)
      }
    };
    const linkifiedValue = linkifyHtml(this.value, linkifyOptions);

    const regex = /\[[a-z]{2}\-[a-z]{2}\]|@[a-z]{2}\-[a-z]{2}|\[[a-z]{3}\]|@[a-z]{3}|\[[a-z]{2}\]|@[a-z]{2}/g;
    var lines = linkifiedValue.split(/(?:\r\n|\r|\n)/g);
      lines.forEach(function(part, index){
        var regexMatch = part.match(regex);
        if(regexMatch!=null) {
          regexMatch.forEach(function(match, indexMatch){
            var replacementLang = match
            .replace("[","")
            .replace("]","")
            .replace("@", "");
            var rep = part.replace(match, `<langCodeFlags iso="${replacementLang}" />`);
            lines[index] = rep;
            }, regexMatch);
        }
      }, lines);
    return {
      lines: lines,
      isShowMore: false,
      isMoreVisible: false,
    };
  },
  methods: {
    toggleIsMoreVisible() {
      this.isMoreVisible = !this.isMoreVisible;
    },
    scrollBackUp() {
      // only scroll back when element is higher
      const element = this.$refs.scrollTarget;
      const topOffset = element.getBoundingClientRect().top;
      if(topOffset < 0) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    guidingLineClick() {
      if(this.isMoreVisible)
        this.scrollBackUp();
      this.toggleIsMoreVisible();
    }
  },
  //need this and use as components to display flags
  computed: {
    fullProcessedHtml() {
      let html = this.lines.join("<br />");
      return {
        template: `<div>${html}</div>`,
      };
    },
    sliceProcessedHtml() {
      let html = this.lines.slice(0, 6).join("<br />");
      return {
        template: `<div>${html}</div>`,
      };
    },
    moreProcessedHtml() {
      let html = this.lines.slice(6).join("<br />");
      return {
        template: `<div>${html}</div>`,
      };
    },
  },

  mounted() {
    if (this.lines.length > 6) {
      // yes 6, first line is "title"
      this.isShowMore = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.see-more-btn-wrapper {
  padding-left: 15px;
  padding-bottom: 5px;
}
.list-wrapper {
  position: relative;
}
.list-wrapper__guiding-line {
  position: absolute;
  height: calc(100% - 30px);
  left: -15px;
  width: 5px;
  top: 25px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  &:hover {
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    &::after {
      left: -1px;
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
    cursor: pointer;
  }
  &::after {
    content: "";
    position: absolute;
    left: -1px;
    bottom: -40px;
    width: 15px;
    height: 40px;
    transition: border 0.2s;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
}

.animated-list {
  overflow: hidden;
  max-height: 60000px;
}
.list-leave-active {
  transition: max-height 1s cubic-bezier(0.075, 0.82, 0, 1), opacity 0.5s;
}
.list-enter-active {
  transition: max-height 1s cubic-bezier(0.92, 0.005, 0.98, 0.335), opacity 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
