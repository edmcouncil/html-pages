<template>
  <div
    v-if="!isShowMore"
    :class="{
      'text-changed': changeType == 'changed',
      'text-added': changeType == 'added',
      'text-removed': changeType == 'removed',
    }"
  >
    <ComparedDiff :line="lines[0]" :changeType="changeType" />
    <ul :class="{ 'string-list': type === 'STRING' }">
      <li
        v-for="(item, index) in lines.slice(1)"
        :key="`${item}_${index}`"
        :class="{ 'string-item': type === 'STRING' }"
      >
        <ComparedDiff :line="item" :changeType="changeType" />
      </li>
    </ul>
  </div>
  <div
    v-else
    :class="{
      'text-changed': changeType == 'changed',
      'text-added': changeType == 'added',
      'text-removed': changeType == 'removed',
    }"
  >
    <ComparedDiff :line="lines[0]" :changeType="changeType" />
    <ul :class="{ 'string-list': type === 'STRING' }">
      <li
        v-for="(item, index) in lines.slice(1, 6)"
        :key="`${item}_${index}`"
        :class="{ 'string-item': type === 'STRING' }"
      >
        <ComparedDiff :line="item" :changeType="changeType" />
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
            :key="`${item}_${index}`"
            :class="{ 'string-item': type === 'STRING' }"
          >
            <ComparedDiff :line="item" :changeType="changeType" />
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
import DiffMatchPatch from "diff-match-patch";

export default {
  name: "ComparedText",
  props: ["currentItem", "comparedItem", "changeType", "identifier"],
  data() {
    return {
      lines: [],
      type: null,
      isShowMore: false,
      isMoreVisible: false,
    };
  },
  mounted() {
    const lines1 = this.getLinesFromItem(this.currentItem);
    const lines2 = this.getLinesFromItem(this.comparedItem);

    this.compareLines(lines1, lines2);
    this.type = this.currentItem.type === "EMPTY" ? this.comparedItem.type : this.currentItem.type;

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
      } else if (topOffset < 0) {
        element.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => {
          this.isMoreVisible = !this.isMoreVisible;
        }, 500);
      } else {
        this.isMoreVisible = !this.isMoreVisible;
      }
    },
    getLinesFromItem(item) {
      if (item.value && Array.isArray(item.value) && item.type !== "OWL_LABELED_MULTI_AXIOM") return item.value;
      if (item.type === "AXIOM") {
        let lines = item.fullRenderedString.split("<br />");
        lines = lines.map(item => item.trim());
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith("- ")) lines[i] = lines[i].substring(2);
        }
        return lines;
      } else if (item.type === "OWL_LABELED_MULTI_AXIOM") {
        if (typeof item.value[0] === 'string' || item.value[0] instanceof String) return item.value;
        const linesFromValue = item.value.map(item => item.fullRenderedString);
        const lines = [item.entityLabel.label, ...linesFromValue];
        return lines;
      } else if (item.type === "STRING") {
        return item.value.split("\n");
      } else if (item.type === "DIRECT_SUBCLASSES") {
        return [item.value.label];
      } else if (item.type === "INSTANCES") {
        return [item.value.label];
      } else if (item.type === "IRI") {
        return [item.value.label];
      } else if (item.type === "MODULES") {
        return [item.value.label];
      } else {
        return [item.value];
      }
    },
    compareLines(linesOriginal, linesCompared) {
      const n = Math.max(linesOriginal.length, linesCompared.length);
      const dmp = new DiffMatchPatch();
      if (this.changeType == "changed") {
        for (let i = 0; i < n; i++) {
          let diff = [];
          if (linesCompared[i][0] == ' ') {
            diff = dmp.diff_main(
              linesCompared[i][1] || "",
              linesCompared[i][1] || ""
            );
          }
          if (linesCompared[i][0] == '-') {
            diff = dmp.diff_main(
              linesCompared[i][1] || "",
              ""
            );
          }
          if (linesCompared[i][0] == '+') {
            diff = dmp.diff_main(
              "",
              linesCompared[i][1] || "",
            );
          }
          if (linesCompared[i][0] == '~') {
            diff = dmp.diff_main(
              linesCompared[i][1].__old || "",
              linesCompared[i][1].__new || "",
            );
          }
          dmp.diff_cleanupSemantic(diff);

          this.lines.push(diff);
        }
      } else {
        for (let i = 0; i < n; i++) {
          let diff = dmp.diff_main(
            linesOriginal[i] || "",
            linesCompared[i] || ""
          );
          dmp.diff_cleanupSemantic(diff);

          this.lines.push(diff);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.animated-list {
  overflow: hidden;
}

.text-changed {
  background-color: rgba(0, 0, 0, 0.05);
}

.text-added {
  background-color: rgba(137, 194, 163, 0.447);
}

.text-removed {
  background-color: rgba(228, 145, 143, 0.384);
}
</style>
