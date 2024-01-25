<template>
  <dt class="title-name-change col-md-2 col-sm-12">
    <div
      class="content-item__title isComparing sticky-top"
    >
      <ComparedDiff :line="line" :changeType="'changed'" />
    </div>
  </dt>
</template>

<script>
import DiffMatchPatch from 'diff-match-patch';

export default {
  name: 'TitleNameChange',
  props: ['currentTitle', 'titleNameChanges'],
  data() {
    return {
      line: []
    };
  },
  mounted() {
    const dmp = new DiffMatchPatch();

    const original = this.currentTitle;
    const compared = this.getOldTitle(original);

    this.line = dmp.diff_main(original, compared);
    dmp.diff_cleanupSemantic(this.line);
  },
  methods: {
    getOldTitle(title) {
      return this.titleNameChanges.find(i => i.newName === title).oldName;
    },
  },
};
</script>

<style lang="scss">
.title-name-change {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
