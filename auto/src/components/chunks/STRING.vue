<template>
<div v-if="!isShowMore">
    <component v-bind:is="fullProcessedHtml"></component>
</div>
<div v-else>
    <component v-bind:is="sliceProcessedHtml">
    </component>
    <a href="#"
      v-show="!isMoreVisible"
      @click.prevent="isMoreVisible = !isMoreVisible">
        See more...
    </a>

    <div v-show="isMoreVisible">
        <component v-bind:is="moreProcessedHtml"></component>
        <a href="#"
          @click.prevent="isMoreVisible = !isMoreVisible">
            See less...
        </a>
    </div>
</div>
</template>

<script>
export default {
  name: 'STRING',
  props: ['value'],
  computed: {
    fullProcessedHtml() {
      const html = this.lines.join('<br />');
      return {
        template: `<div>${html}</div>`,
      };
    },
    sliceProcessedHtml() {
      const html = this.lines.slice(0, 6).join('<br />');
      return {
        template: `<div>${html}</div>`,
      };
    },
    moreProcessedHtml() {
      const html = this.lines.slice(6).join('<br />');
      return {
        template: `<div>${html}</div>`,
      };
    },
  },
  data() {
    const regexLang = /\[[a-z]{2}\]|@[a-z]{2}/;
    const lines = this.value.split(/(?:\r\n|\r|\n)/g);
    lines.forEach((part, index) => {
      const regexMatch = part.match(regexLang);
      if (regexMatch != null) {
        regexMatch.forEach((match) => {
          const replacementLang = match.replace('[', '').replace(']', '');
          let rep;
          if (replacementLang === 'sv') {
            // add Swedish lang support
            rep = part.replace(match, "<span class='flag-icon flag-icon-se'></span>"); // se
          } else {
            rep = part.replace(match, `<lang-flag iso="${replacementLang}" />`);
          }
          lines[index] = rep;
        }, regexMatch);
      }
    }, lines);
    return {
      lines,
      isShowMore: false,
      isMoreVisible: false,
    };
  },

  mounted() {
    if (this.lines.length > 6) { // yes 6, first line is "title"
      this.isShowMore = true;
    }
  },
};
</script>
