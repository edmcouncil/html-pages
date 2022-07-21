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

    <div
      v-if="!isMoreVisible"
      href="#"
      @click.prevent="toggleIsMoreVisible()"
    >
      <div class="see-more-btn">Show {{ lines.length - 6 }} more</div>
      <br />
    </div>
    <div v-else href="#" @click.prevent="toggleIsMoreVisible(); scrollBackUp()">
      <div class="see-less-btn">Show less</div>
      <br />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import customLink from "./link.vue";
import langCodeFlags from "./LangCodeFlags.vue";

Vue.component("customLink", customLink);
Vue.component("langCodeFlags", langCodeFlags);

export default {
  name: "AXIOM",
  components: {
    customLink,
    langCodeFlags,
  },
  props: ["value", "entityMaping"],
  data() {
    const regex = /\[[a-z]{2}\-[a-z]{2}\]|@[a-z]{2}\-[a-z]{2}|\[[a-z]{3}\]|@[a-z]{3}|\[[a-z]{2}\]|@[a-z]{2}/g;
    let html = this.value;
    let lines = html.split(/(?:\r\n|\r|\n)/g);
    if (lines.length == 1) {
      lines = html.split("<br />");
    }
    lines.forEach(function (part, index) {
      var regexMatch = part.match(regex);
      if (regexMatch != null) {
        regexMatch.forEach(function (match, indexMatch) {
          var replacementLang = match.replace("[", "").replace("]", "").replace("@", "");
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
  computed: {
    fullProcessedHtml() {
      let html = this.processedHtml(this.lines.join("<br />"));
      return {
        template: `<div>${html}</div>`,
      };
    },
    sliceProcessedHtml() {
      let html = this.processedHtml(this.lines.slice(0, 6).join("<br />"));
      return {
        template: `<div>${html}</div>`,
      };
    },
    moreProcessedHtml() {
      let html = this.processedHtml(this.lines.slice(6).join("<br />"));
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
    processedHtml(htmlInput) {
      let htmlResult = htmlInput;
      htmlResult = htmlResult.replace("/arg1/", "<b>/arg1/</b>");
      if (this.entityMaping) {
        Object.keys(this.entityMaping).forEach((name) => {
          const value = this.entityMaping[name];
          htmlResult = htmlResult.replace(
            name,
            `<customLink name="${value.label}" query="${value.iri}"></customLink>`
          );
        });
      }
      return htmlResult;
    },
  },
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
