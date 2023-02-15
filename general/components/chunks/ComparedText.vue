<template>
  <div v-if="!isShowMore">
    <div v-html="lines[0]"></div>
    <ul
      v-if="processedList.length > 0"
      :class="{ 'string-list': type === 'STRING' }"
    >
      <li
        v-for="(item, index) in lines.slice(1)"
        :key="`${processedTitle}_${item}_${index}`"
        :class="{ 'string-item': type === 'STRING' }"
      >
        <div v-html="item"></div>
      </li>
    </ul>
  </div>
  <div v-else>
    <div v-html="lines[0]"></div>
    <ul :class="{ 'string-list': type === 'STRING' }">
      <li
        v-for="(item, index) in lines.slice(1, 6)"
        :key="`${processedTitle}_${item}_${index}`"
        :class="{ 'string-item': type === 'STRING' }"
      >
        <div v-html="item"></div>
      </li>
    </ul>
    <b-collapse :id="`${identifier}-collapse`" v-model="isMoreVisible">
      <transition name="list">
        <ul
          class="animated-list"
          :class="{ 'string-list': type === 'STRING' }"
          v-show="isMoreVisible"
          ref="scrollTarget"
        >
          <li
            v-for="(item, index) in lines.slice(6)"
            :key="`${processedTitle}_${item}_${index}`"
            :class="{ 'string-item': type === 'STRING' }"
          >
            <div v-html="item"></div>
          </li>
        </ul>
      </transition>
    </b-collapse>

    <div v-if="!isMoreVisible" href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-more-btn">Show {{ lines.length - 6 }} more</div>
    </div>
    <div v-else href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-less-btn">Show less</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComparedText",
  props: ["currentItem", "comparedItem", "identifier"],
  data() {
    return {
      lines: [],
      type: null,
      isShowMore: false,
      isMoreVisible: false,
    };
  },
  computed: {
    processedTitle() {
      return { template: `<div></div>` };
    },
    processedList() {
      return this.lines.slice(1).map(item => (
        { template: `` }
      ));
    },
    processedListSlice() {
      return this.lines.slice(1, 6).map(item => (
        { template: `` }
      ));
    },
    processedListMore() {
      return this.lines.slice(6).map(item => (
        { template: `` }
      ));
    },
  },
  mounted() {
    const lines1 = this.getLinesFromItem(this.currentItem);
    const lines2 = this.getLinesFromItem(this.comparedItem);

    this.compareLines(lines1, lines2);
    this.type = this.currentItem.type;

    if (this.lines.length > 6) {
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
    getLinesFromItem(item) {
      if (item.type === "AXIOM") {
        const lines =  item.fullRenderedString.split("<br />");
        for (let i = 0; i < lines.length; i++) {
          if(lines[i].startsWith('- '))
            lines[i] = lines[i].substring(2);
        }
        return lines;
      }
      else if (item.type === "STRING") {
        return item.value.split("\n");
      }
      else if (item.type === "DIRECT_SUBCLASSES") {
        return [ item.value.label ];
      }
      else if (item.type === "INSTANCES") {
        return [ item.value.label ];
      }
      else if (item.type === "IRI") {
        return [ item.value.label ];
      }
      else if (item.type === "MODULES") {
        return [ item.value.label ];
      }
      else {
        return [ item.value ];
      }
    },
    compareLines(linesOriginal, linesCompared) {
      const n = Math.max(linesOriginal.length, linesCompared.length);

      for (let i = 0; i < n; i++) {
        this.lines.push(`<div>${linesOriginal[i]}</div>` || "");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.animated-list {
  overflow: hidden;
}
</style>
