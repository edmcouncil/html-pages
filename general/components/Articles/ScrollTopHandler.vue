<template>
  <div id="article-top-element" class="article-scroll-top"></div>
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
        behavior: 'smooth'
      });
    }
  }
};
</script>
