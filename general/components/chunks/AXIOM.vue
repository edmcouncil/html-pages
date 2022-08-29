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
    <component :is="processedTitle"></component>
    <ul>
      <li
        v-for="(item, index) in processedListSlice"
        :key="`${processedTitle}_${item}_${index}`"
      >
        <component :is="item"></component>
      </li>
    </ul>
    <b-collapse :id="`${identifier}-collapse`" v-model="isMoreVisible">
      <transition name="list">
        <ul class="animated-list" v-show="isMoreVisible" ref="scrollTarget">
          <li
            v-for="(item, index) in processedListMore"
            :key="`${processedTitle}_${item}_${index}`"
          >
            <component :is="item"></component>
          </li>
        </ul>
      </transition>
    </b-collapse>

    <div
      v-if="!isMoreVisible"
      href="#"
      @click.prevent="toggleIsMoreVisible()"
    >
      <div class="see-more-btn">Show {{ lines.length - 6 }} more</div>
    </div>
    <div v-else href="#" @click.prevent="toggleIsMoreVisible()">
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
  props: ["value", "entityMaping", "identifier"],
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
      const element = this.$refs.scrollTarget;
      const topOffset = element.getBoundingClientRect().top;

      if (!this.isMoreVisible) {
        this.isMoreVisible = !this.isMoreVisible;
      } else if(topOffset < 0) {
        element.scrollIntoView({
          behavior: "smooth"
        });
        setTimeout(()=>{
          this.isMoreVisible = !this.isMoreVisible;
        }, 500)
      }
      else {
        this.isMoreVisible = !this.isMoreVisible;
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
  },
};
</script>

<style lang="scss" scoped>
.animated-list {
  overflow: hidden;
}
.list-leave-active {
  transition: opacity 0.3s ease-out;
}
.list-enter-active {
  transition: opacity 0.3s ease-in;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}

.see-more-btn, .see-less-btn {
  margin-left: -6px;
}
</style>
