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
  methods: {
    getImageUrl(item) {
      const strapiUrl = process.env.strapiBaseUri;
      const location = item?.image?.data?.attributes?.url
      return strapiUrl + location;
    }
  },
  computed: {
  }
}
</script>
