<template>
  <div id="app">
    <!-- Google Tag Manager (noscript) -->
    <noscript v-html="noscriptContent"></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <HeaderComponent></HeaderComponent>
    <Nuxt></Nuxt>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noscriptContent:
        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N7GL2D5" height="0" width="0" style="display: none; visibility: hidden"></iframe>',
    };
  },
};
</script>
