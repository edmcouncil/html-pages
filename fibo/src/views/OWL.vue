<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>FIBO OWL</h1>

          <h2>About</h2>

          <p>
            FIBO OWL is available in a number of RDF formats. These are
            available for offline use (i.e., download all of FIBO as a zip), or
            online use. Each FIBO ontology file is available for "follow your
            nose" treatment, a general description of which is available here.
          </p>

          <h2>Releases</h2>

          <p>FIBO OWL is published in two releases:</p>
          <ul class="space-at-top">
            <li>
              <p>
                <b>FIBO Production</b> is published at the end of each calendar
                quarter and has been vetted by SMEs and passed standard industry
                <i>hygiene</i> tests for OWL.
              </p>
            </li>
            <li>
              <p>
                <b>FIBO Development</b> is published in real-time as changes are
                incorporated by the FIBO Community and consists of a draft as
                well-vetted content.
              </p>
            </li>
          </ul>
        </section>

        <section class="blank">
          <h1>Download</h1>

          <p>
            FIBO OWL is available for download in the EDMConnect FIBO Interest
            Community space.
          </p>

          <button
            class="normal-button"
            @click="
              visit(
                'https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-owl'
              )
            "
          >
            Download FIBO OWL
          </button>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';
import { outboundClick, outboundLinkClick } from '../helpers/ga';
export default {
  name: 'OWLView',
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
.inline {
  display: inline-block;
}
</style>
