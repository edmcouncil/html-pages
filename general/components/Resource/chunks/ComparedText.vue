<template>
  <div
    v-if="!isShowMore"
    :class="{
      'text-changed': changeType == 'changed',
      'text-added': changeType == 'added',
      'text-removed': changeType == 'removed'
    }"
  >
    <ComparedDiff :line="lines[0]" :change-type="changeType" />
    <ul :class="{ 'string-list': type === 'STRING' }">
      <li
        v-for="(item, index) in lines.slice(1)"
        :key="`${item}_${index}`"
        :class="{ 'string-item': type === 'STRING' }"
      >
        <ComparedDiff :line="item" :change-type="changeType" />
      </li>
    </ul>
  </div>
  <div
    v-else
    :class="{
      'text-changed': changeType == 'changed',
      'text-added': changeType == 'added',
      'text-removed': changeType == 'removed'
    }"
  >
    <ComparedDiff :line="lines[0]" :change-type="changeType" />
    <ul :class="{ 'string-list': type === 'STRING' }">
      <li
        v-for="(item, index) in lines.slice(1, 6)"
        :key="`${item}_${index}`"
        :class="{ 'string-item': type === 'STRING' }"
      >
        <ComparedDiff :line="item" :change-type="changeType" />
      </li>
    </ul>
    <bs-collapse :id="identifier" :open="isMoreVisible">
      <transition name="list">
        <ul
          v-show="isMoreVisible"
          ref="scrollTarget"
          class="animated-list"
          :class="{ 'string-list': type === 'STRING' }"
        >
          <li
            v-for="(item, index) in lines.slice(6)"
            :key="`${item}_${index}`"
            :class="{ 'string-item': type === 'STRING' }"
          >
            <ComparedDiff :line="item" :change-type="changeType" />
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
import DiffMatchPatch from 'diff-match-patch';

export default {
  name: 'ComparedText',
  props: ['currentItem', 'comparedItem', 'changeType', 'identifier'],
  data() {
    return {
      lines: [],
      type: null,
      isShowMore: false,
      isMoreVisible: false
    };
  },
  mounted() {
    const lines1 = this.getLinesFromItem(this.currentItem);
    const lines2 = this.comparedItem?.lines || [];

    this.compareLines(lines1, lines2);
    this.type =
      this.currentItem.type === 'EMPTY'
        ? this.comparedItem.type
        : this.currentItem.type;

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
          behavior: 'smooth'
        });
        setTimeout(() => {
          this.isMoreVisible = !this.isMoreVisible;
        }, 500);
      } else {
        this.isMoreVisible = !this.isMoreVisible;
      }
    },
    getLinesFromItem(item) {
      if (!item || !item.value) return [];

      if (
        Array.isArray(item.value) &&
        item.type !== 'OWL_LABELED_MULTI_AXIOM'
      ) {
        return item.value;
      }

      if (item.type === 'AXIOM') {
        let lines = item.fullRenderedString
          ? item.fullRenderedString.split('<br />')
          : [];
        lines = lines.map((line) => line.trim());
        lines = lines.map((line) =>
          line.startsWith('- ') ? line.substring(2) : line
        );
        return lines;
      }

      if (item.type === 'OWL_LABELED_MULTI_AXIOM') {
        if (Array.isArray(item.value[0])) {
          return item.value.map((tuple) => {
            const changeType = tuple[0];
            const content = tuple[1];

            switch (changeType) {
              case ' ':
                return [' ', content];
              case '~':
                return ['~', content];
              case '-':
                return [' ', content];
              case '+':
                return ['+', content];
              default:
                return '';
            }
          });
        }

        if (
          typeof item.value[0] === 'string' ||
          item.value[0] instanceof String
        ) {
          return item.value;
        }

        const entityLabel =
          item.entityLabel && item.entityLabel.label
            ? item.entityLabel.label
            : '';
        const linesFromValue = item.value.map(
          (val) => val.fullRenderedString || ''
        );
        return [entityLabel, ...linesFromValue];
      }

      if (item.type === 'STRING') {
        return item.value.split('\n');
      }

      if (
        ['DIRECT_SUBCLASSES', 'INSTANCES', 'IRI', 'MODULES'].includes(item.type)
      ) {
        return [item.value.label || ''];
      }

      return [item.value || ''];
    },
    compareLines(linesOriginal, linesCompared) {
      const n = Math.max(linesOriginal.length, linesCompared.length);
      const dmp = new DiffMatchPatch();

      for (let i = 0; i < n; i++) {
        let diff = [];

        const originalLine = linesOriginal[i] || '';
        const comparedLine = linesCompared[i] || '';

        if (this.changeType === 'changed') {
          const lineType = linesCompared[i]?.[0] || ' ';
          const lineContent = linesCompared[i]?.[1] || '';

          if (lineType === ' ') {
            diff = dmp.diff_main(originalLine, lineContent);
          } else if (lineType === '-') {
            diff = dmp.diff_main(lineContent, '');
          } else if (lineType === '+') {
            diff = dmp.diff_main('', lineContent);
          } else if (lineType === '~') {
            const oldContent = lineContent.__old || '';
            const newContent = lineContent.__new || '';
            diff = dmp.diff_main(oldContent, newContent);
          }
        } else {
          diff = dmp.diff_main(originalLine, comparedLine);
        }

        dmp.diff_cleanupSemantic(diff);
        this.lines.push(diff);
      }
    }
  }
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
