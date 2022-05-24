<template>
  <div v-if="!isShowMore">
    <component v-bind:is="fullProcessedHtml"></component>
  </div>
  <div v-else>
    <component v-bind:is="sliceProcessedHtml"></component>
    <transition name="list">
      <div class="animated-list" v-show="isMoreVisible" ref="scrollTarget">
        <component v-bind:is="moreProcessedHtml"></component>
      </div>
    </transition>

    <div v-if="!isMoreVisible" href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-more-btn">Show {{ lines.length - 6 }} more</div>
      <br />
    </div>
    <div
      v-else
      href="#"
      @click.prevent="
        toggleIsMoreVisible();
        scrollBackUp();
      "
    >
      <div class="see-less-btn">Show less</div>
      <br />
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
