<template>
  <div class="download-section">
    <h1 v-if="sectionItem.title">{{ sectionItem.title }}</h1>
    <div v-html="$md.render(sectionItem.text_content || '')"></div>
    <button
      class="normal-button"
      @click="visit(sectionItem.download_button_url)"
    >
      {{ sectionItem.download_button_text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'DownloadSection',
  props: ['sectionItem'],
  computed: {},
  methods: {
    visit(url) {
      const aElement = document.createElement('a');
      aElement.setAttribute('href', url);
      aElement.setAttribute('target', '_blank');
      aElement.style.display = 'none';
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    }
  }
};
</script>

<style scoped lang="scss">
.download-section {
  max-width: 800px;
}
.normal-button {
  margin-top: 30px;
}
</style>
