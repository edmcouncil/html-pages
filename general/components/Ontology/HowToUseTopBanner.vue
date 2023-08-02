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
  justify-content: space-between;
  align-items: flex-end;
  background: var(--black-5, rgba(0, 0, 0, 0.05));

  .ontology-viewer-header__text {
    max-width: 800px;

    p {
      margin-top: 30px;
    }
  }

  .btn.normal-button.small {
    white-space: nowrap;
  }
}

@media (max-width: 991px) {
  .ontology-viewer-header {
    margin: 40px 15px 0 15px;
    padding: 40px 30px;
    flex-direction: column;

    .ontology-viewer-header__text p {
        margin-top: 20px;
        font-size: 16px;
        line-height: 24px;
    }

    .btn.normal-button.small {
      margin-top: 30px;
    }
  }
}
</style>
