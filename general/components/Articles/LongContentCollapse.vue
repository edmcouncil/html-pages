<template>
  <div class="long-content-container">
    <div v-if="isExpanded">
      <slot></slot>
    </div>
    <div class="button-container">
      <button class="btn normal-button" @click="toggleExpanded()">
        <span v-if="isExpanded">{{ expandedText || "Show less" }}</span>
        <span v-else>{{ collapsedText || "Show more" }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LongContentCollapse',
  props: ['expandedText', 'collapsedText'],
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    expand() {
      this.isExpanded = true;
    },
  },
};
</script>

<style scoped lang="scss">
.long-content-container {
  margin-bottom: 60px;

  .button-container {
    display: flex;
    justify-content: space-around;
    margin-top: 60px;
  }
}
</style>
