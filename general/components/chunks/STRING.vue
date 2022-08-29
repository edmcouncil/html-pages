<template>
  <div v-if="!isShowMore">
    <component v-bind:is="fullProcessedHtml"></component>
  </div>
  <div v-else>
    <component v-bind:is="sliceProcessedHtml"></component>
    <b-collapse :id="`${identifier}-collapse`" v-model="isMoreVisible">
      <transition name="list">
        <div class="animated-list" v-show="isMoreVisible" ref="scrollTarget">
          <component v-bind:is="moreProcessedHtml"></component>
        </div>
      </transition>
    </b-collapse>

    <div v-if="!isMoreVisible" href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-more-btn">Show {{ lines.length - 6 }} more</div>
    </div>
    <div
      v-else
      href="#"
      @click.prevent="toggleIsMoreVisible();"
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
  props: ['value', "identifier"],
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
