1<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>FIBO Data Dictionary</h1>

          <h2>About</h2>

          <p class="text">
            FIBO data dictionary (aka glossary) is downloadable in .csv and
            .xlsx. It contains a summary of each operational class in FIBO, with
            its properties, presented in the form of tables and fields for
            viewers familiar with relational data dictionaries.
          </p>
        </section>

        <section class="blank">
          <h1>Download</h1>

          <p>
            FIBO Data Dicionary is available for download in the EDMConnect FIBO
            Interest Community space.
          </p>

          <button
            class="normal-button"
            @click="
              visit(
                'https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-data-dict'
              )
            "
          >
            Download FIBO Data Dictionary
          </button>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import helpers from '../store/helpers.js';
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';
import { outboundClick, outboundLinkClick } from '../helpers/ga';
export default {
  extends: helpers,
  name: 'DataDictionaryView',
  components: { ScrollTopHandler },
  methods: {
    scrollTop() {
      this.$refs.scrollTopHandler.scrollBackUp();
    },
    visit(url) {
      this.outboundClick(url);
      const aElement = document.createElement('a');
      aElement.setAttribute('href', url);
      aElement.setAttribute('target', '_blank');
      aElement.style.display = 'none';
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    },
    outboundClick,
    outboundLinkClick,
  },
}
</script>

<style lang="scss" scoped>
</style>
