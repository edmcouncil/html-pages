<template>
  <div v-if="!isShowMore">
    <component v-bind:is="fullProcessedHtml"></component>
  </div>
  <div v-else>
    <component v-bind:is="sliceProcessedHtml"> </component>
    <div href="#" 
      v-show="!isMoreVisible" 
      @click.prevent="isMoreVisible = !isMoreVisible">
        <div class="see-more-btn-string">
          Show more
          </div>
      <br />
    </div>

    <div v-show="isMoreVisible">
      <component v-bind:is="moreProcessedHtml"></component>
      <div href="#" 
          @click.prevent="isMoreVisible = !isMoreVisible">
            <div class="see-less-btn-string">
              Show less
            </div>
        <br />
      </div>
    </div>
  </div>


</template>

<script>
import Vue from "vue";
import langCodeFlags from "./LangCodeFlags.vue"

Vue.component("langCodeFlags", langCodeFlags);

export default {
  name: 'STRING',
   components: {
    langCodeFlags
  },
  props: ['value'],
  data() {
     const regex = /\[[a-z]{2}\-[a-z]{2}\]|@[a-z]{2}\-[a-z]{2}|\[[a-z]{3}\]|@[a-z]{3}|\[[a-z]{2}\]|@[a-z]{2}/g;
      var lines = this.value.split(/(?:\r\n|\r|\n)/g);
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
.see-more-btn-string {
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 30px;
  cursor: pointer;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 25px;

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
.see-less-btn-string {
  cursor: pointer;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 25px;
  font-size: 18px;
  line-height: 30px;
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
  .see-more-btn-string {
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
  .see-less-btn-string {
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
