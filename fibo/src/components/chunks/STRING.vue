<template>
  <div>
    <div
      v-if="!isShowMore"
      v-html="lines.join('<br />')"
    />

    <div
      v-else
    >
      <div
        v-html="lines.slice(0, 6).join('<br />')"
      />
      <a
        href="#"
        v-show="!isMoreVisible"
        @click.prevent="isMoreVisible = !isMoreVisible"
      >
        See more...
      </a>

      

      <div
        v-show="isMoreVisible"
        v-html="lines.slice(6).join('<br />')"
      />

      <a
        href="#"
        v-show="isMoreVisible"
        @click.prevent="isMoreVisible = !isMoreVisible"
      >
        See less...
      </a>

    </div>
  </div>
</template>
<script>
export default {
  name: 'STRING',
  props: ['value'],

  data() {
    return {
      lines: this.value.split(/(?:\r\n|\r|\n)/g),
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
