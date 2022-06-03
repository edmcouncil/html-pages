<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>FIBO Vocabulary</h1>

          <h2>About</h2>

          <p>
            The FIBO vocabulary is distributed using the Simple Knowledge
            Organization System (<a
              href="https://www.w3.org/2004/02/skos/"
              v-on:click="outboundLinkClick('https://www.w3.org/2004/02/skos/')"
              >SKOS</a
            >). SKOS is a W3C Recommendation that supports the use of knowledge
            organization systems (KOS) such as thesauri, classification schemes,
            subject heading lists, and taxonomies within the framework of the
            Semantic Web.
          </p>

          <p>
            The FIBO vocabulary is distributed as a machine-readable file in
            which the FIBO class hierarchy is rendered as a tree structure of
            broader and narrower terms. Properties in FIBO appear as properties
            in the FIBO vocabulary. Logical restrictions relating pairs of FIBO
            classes are rendered as simple relationships between corresponding
            concepts in FIBO Vocabulary. The FIBO Vocabulary, therefore, does
            not reflect the full richness of the FIBO Ontologies and is provided
            to support knowledge organization applications that do not require
            the full logic of FIBO.
          </p>

          <p>
            The FIBO Vocabulary machine-readable files are intended to provide
            input to a range of tools, usually characterized as Glossary or
            Vocabulary tools. These tools are generally used to provide further
            business-facing presentations of the content of these files.
          </p>
        </section>

        <section class="blank">
          <h1>Download</h1>

          <p>
            FIBO Vocabulary is available for download in the EDMConnect FIBO
            Interest Community space.
          </p>

          <button
            class="normal-button"
            @click="
              visit(
                'https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-voc'
              )
            "
          >
            Download FIBO Vocabulary
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
  name: 'VocabularyView',
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
