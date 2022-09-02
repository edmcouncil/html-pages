<template>
  <div>
    <h1 v-if="sectionItem.title">{{ sectionItem.title }}</h1>
    <div v-html="$md.render(sectionItem.text_content || '')"></div>
  </div>
</template>

<script>
export default {
  name: 'TextSection',
  props: [ 'sectionItem' ],
  computed: {
  }
}
</script>
