<template>
  <div class="article-scroll-top" id="article-top-element"></div>
</template>

<script>
export default {
  name: 'ScrollTopHandler',
  mounted() {
    this.scrollBackUp();
  },
  methods: {
    scrollBackUp() {
      const element = document.getElementById('article-top-element');
      element.scrollIntoView({
          behavior: "smooth"
      });
    }
  }
}
</script>
