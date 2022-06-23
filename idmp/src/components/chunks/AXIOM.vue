<template>
  <div v-if="!isShowMore">
    <component :is="processedTitle"></component>
    <ul>
      <li
        v-for="(item, index) in processedList"
        :key="`${processedTitle}_${item}_${index}`"
      >
        <component :is="item"></component>
      </li>
    </ul>
  </div>
  <div v-else>
    <div ref="scrollTarget"></div>
    <component :is="processedTitle"></component>
    <div class="list-wrapper">
      <div class="list-wrapper__guiding-line" @click="guidingLineClick"></div>
      <ul>
        <li
          v-for="(item, index) in processedListSlice"
          :key="`${processedTitle}_${item}_${index}`"
        >
          <component :is="item"></component>
        </li>
      </ul>
      <transition name="list">
        <ul class="animated-list" v-show="isMoreVisible">
          <li
            v-for="(item, index) in processedListMore"
            :key="`${processedTitle}_${item}_${index}`"
          >
            <component :is="item"></component>
          </li>
        </ul>
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
    processedTitle() {
      const html = this.processedHtml(this.lines[0]);
      return { template: `<div>${html}</div>` };
    },
    processedList() {
      return this.lines.slice(1).map(item => (
        { template: `<div>${this.processedHtml(item)}</div>` }
      ));
    },
    processedListSlice() {
      return this.lines.slice(1, 6).map(item => (
        { template: `<div>${this.processedHtml(item)}</div>` }
      ));
    },
    processedListMore() {
      return this.lines.slice(6).map(item => (
        { template: `<div>${this.processedHtml(item)}</div>` }
      ));
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
      if(htmlResult.startsWith('- '))
        htmlResult = htmlResult.substring(2);
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
    guidingLineClick() {
      if(this.isMoreVisible)
        this.scrollBackUp();
      this.toggleIsMoreVisible();
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
  height: 100%;
  left: -15px;
  width: 15px;
  top: 0;
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
ul {
  list-style-type: disc;
  padding-left: 20px;
}
li::marker {
  color: rgba(0, 0, 0, 0.2);
}
li {
  margin: 0;
  padding: 2px 0;
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
