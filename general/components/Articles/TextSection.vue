<template>
  <div class="text-section">
    <h1 v-if="sectionItem.title">{{ sectionItem.title }}</h1>
    <div v-html="$md.render(sectionItem.text_content || '')"></div>
  </div>
</template>

<script>
export default {
  name: 'TextSection',
  props: ['sectionItem'],
  computed: {}
};
</script>

<style scoped>
.text-section {
  max-width: 800px;
}
</style>
