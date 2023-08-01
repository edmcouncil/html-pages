<template>
  <div class="ontology-viewer-header">
    <div class="ontology-viewer-header__text">
      <span class="text-display">{{ ontologyNameUppercase }} Viewer</span>
      <p class="big">Access both the {{ ontologyNameUppercase }} structure and its content in the easiest possible way.</p>
    </div>
    <button
      class="btn normal-button small"
      @click="howToUseHandler()"
    >
      How to use
    </button>
  </div>
</template>

<script>
export default {
  name: 'HowToUseTopBanner',
  props: ['ontologyNameUppercase', 'howToUseHandler'],
};
</script>

<style lang="scss">
.ontology-viewer-header {
  display: flex;
  padding: 60px;
  margin-bottom: 60px;
  justify-content: space-between;
  align-items: flex-end;
  background: var(--black-5, rgba(0, 0, 0, 0.05));

  .ontology-viewer-header__text {
    max-width: 800px;

    p {
      margin-top: 30px;
    }
  }
}
</style>
