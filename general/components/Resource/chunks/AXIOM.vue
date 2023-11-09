<template>
  <div v-if="!isShowMore">
    <span :class="{ 'restriction-inferable': inferable }">
      <VRuntimeTemplate :template="processedTitle"></VRuntimeTemplate>
    </span>

    <TooltipInline v-if="inferable" :text="tooltips.inferable" />
    <ul v-if="processedList.length > 0">
      <li
        v-for="(item, index) in processedList"
        :key="`${processedTitle}_${item}_${index}`"
      >
        <VRuntimeTemplate :template="item"></VRuntimeTemplate>
      </li>
    </ul>
  </div>
  <div v-else>
    <span :class="{ 'restriction-inferable': inferable }">
      <VRuntimeTemplate :template="processedTitle"></VRuntimeTemplate>
    </span>

    <TooltipInline v-if="inferable" :text="tooltips.inferable" />
    <ul>
      <li
        v-for="(item, index) in processedListSlice"
        :key="`${processedTitle}_${item}_${index}`"
      >
        <VRuntimeTemplate :template="item"></VRuntimeTemplate>
      </li>
    </ul>
    <bs-collapse :id="identifier" :open="isMoreVisible">
      <transition name="list">
        <ul class="animated-list" v-show="isMoreVisible" ref="scrollTarget">
          <li
            v-for="(item, index) in processedListMore"
            :key="`${processedTitle}_${item}_${index}`"
          >
            <VRuntimeTemplate :template="item"></VRuntimeTemplate>
          </li>
        </ul>
      </transition>
    </bs-collapse>

    <div v-if="!isMoreVisible" href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-more-btn">Show {{ lines.length - 6 }} more</div>
    </div>
    <div v-else href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-less-btn">Show less</div>
    </div>
  </div>
</template>

<script>
import tooltips from '~/constants/tooltips';

export default {
  name: 'AXIOM',
  props: ['value', 'entityMaping', 'identifier', 'inferable'],
  data() {
    const regex = /\[[a-z]{2}\-[a-z]{2}\]|@[a-z]{2}\-[a-z]{2}|\[[a-z]{3}\]|@[a-z]{3}|\[[a-z]{2}\]|@[a-z]{2}/g;
    const html = this.value;
    let lines = html.split(/(?:\r\n|\r|\n)/g);
    if (lines.length == 1) {
      lines = html.split('<br />');
    }
    lines.forEach((part, index) => {
      const regexMatch = part.match(regex);
      if (regexMatch != null) {
        regexMatch.forEach((match, indexMatch) => {
          const replacementLang = match
            .replace('[', '')
            .replace(']', '')
            .replace('@', '');
          const rep = part.replace(
            match,
            `<langCodeFlags iso="${replacementLang}" />`,
          );
          lines[index] = rep;
        }, regexMatch);
      }
    }, lines);
    return {
      lines,
      isShowMore: false,
      isMoreVisible: false,
      tooltips,
    };
  },
  computed: {
    processedTitle() {
      const html = this.processedHtml(this.lines[0]);
      return `<span>${html}</span>`;
    },
    processedList() {
      return this.lines.slice(1).map((item) => (`<span>${this.processedHtml(item)}</span>`));
    },
    processedListSlice() {
      return this.lines.slice(1, 6).map((item) => (`<span>${this.processedHtml(item)}</span>`));
    },
    processedListMore() {
      return this.lines.slice(6).map((item) => (`<span>${this.processedHtml(item)}</span>`));
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
      } else if (topOffset < 0) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
        setTimeout(() => {
          this.isMoreVisible = !this.isMoreVisible;
        }, 500);
      } else {
        this.isMoreVisible = !this.isMoreVisible;
      }
    },
    processedHtml(htmlInput) {
      let htmlResult = htmlInput;
      if (htmlResult.startsWith('- ')) htmlResult = htmlResult.substring(2);
      htmlResult = htmlResult.replace('/arg1/', '<b>/arg1/</b>');
      if (this.entityMaping) {
        Object.keys(this.entityMaping).forEach((name) => {
          const value = this.entityMaping[name];
          htmlResult = htmlResult.replace(
            name,
            `<customLink name="${value.label}" query="${value.iri}" isDeprecated="${value.deprecated}"></customLink>`,
          );
        });
      }
      return htmlResult;
    },
  },
};
</script>

<style lang="scss">
span.restriction-inferable {
  color: rgba(0, 0, 0, 0.6);

  a {
    color: rgba(0, 0, 0, 0.6);
  }
}
.animated-list {
  overflow: hidden;
}
</style>
