<template>
  <div v-if="!isShowMore">
    <component v-bind:is="fullProcessedHtml"></component>
  </div>
  <div v-else>
    <component v-bind:is="sliceProcessedHtml"> </component>
    <div href="#" v-show="!isMoreVisible" @click.prevent="isMoreVisible = !isMoreVisible">
      <div class="see-more-btn-axiom">Show more</div>
      <br />
    </div>

    <div v-show="isMoreVisible">
      <component v-bind:is="moreProcessedHtml"></component>
      <div href="#" @click.prevent="isMoreVisible = !isMoreVisible">
        <div class="see-less-btn-axiom">Show less</div>
        <br />
      </div>
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
.see-more-btn-axiom {
  font-size: 18px;
  line-height: 30px;
  display: flex;
  align-items: center;

  cursor: pointer;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 20px;

  &::before {
    content: "";
    background-image: url("../../assets/icons/search.svg");
    background-repeat: no-repeat;
    background-size: 24px 24px;

    display: block;
    width: 24px;
    height: 24px;

    margin-right: 6px;
  }
}
.see-less-btn-axiom {
  cursor: pointer;
  font-size: 18px;
  line-height: 30px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 20px;

  display: flex;
  align-items: center;

  &::before {
    content: "";
    background-image: url("../../assets/icons/search.svg");
    background-repeat: no-repeat;
    background-size: 24px 24px;

    display: block;
    width: 24px;
    height: 24px;

    margin-right: 6px;
  }
}

@media (max-width: 768px) {
  .see-more-btn-axiom {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    margin-top: 20px;
    &::before {
      content: "";
      background-image: url("../../assets/icons/search.svg");
      background-repeat: no-repeat;
      background-size: 24px 24px;

      display: block;
      width: 24px;
      height: 24px;
    }
  }
  .see-less-btn-axiom {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    margin-top: 20px;
    &::before {
      content: "";
      background-image: url("../../assets/icons/search.svg");
      background-repeat: no-repeat;
      background-size: 24px 24px;

      display: block;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
