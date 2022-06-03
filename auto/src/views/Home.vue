<template>
  <div class="container">
    <main>
      <article class="full-page">
        <section>
          <h1>What is Automotive Ontology (AUTO)</h1>
          <img
            src="../assets/img/aowg_logo.png"
            class="automotive-logo img-fluid"
          />

          <p>
            The Automotive Ontology (AUTO) defines the shared conceptual
            structures in the automotive industry. It is an OWL ontology. It is
            build upon the
            <a
              href="https://schema.org/docs/automotive.html"
              v-on:click="
                outboundLinkClick('https://schema.org/docs/automotive.html')
              "
            >
              auto schema.org extension
            </a>
            created by the
            <a
              href="https://www.w3.org/community/gao/"
              v-on:click="
                outboundLinkClick('https://www.w3.org/community/gao/')
              "
            >
              W3C Automotive Ontology Community Group</a
            >
            and it refers to the essential real-world objects related to popular
            vehicles like cars, buses (coaches), and motorcycles.
          </p>
          <br />

          <p>
            The
            <a
              href="https://schema.org/docs/automotive.html"
              v-on:click="
                outboundLinkClick('https://schema.org/docs/automotive.html')
              "
            >
              auto schema.org extension </a
            >authors were motivated by the principles of simplicity and
            practicality. ‘Simplicity’ led to an extremely small set of terms,
            resulting in a lean ontology, whilst ‘practicality’ limited the
            scope of terms to reflect the most important objects, as seen from
            the automotive market perspective. The principle of ‘Occam’s Razor’
            dictated the focus on terms, reflecting general consumer preferences
            observed from the perspective of their searches and typical digital
            activities related to automobiles. Thanks to such an approach, the
            ontology has immediate application for the vehicle description in
            the carmakers and the dealers’ websites, informational and
            e-commerce alike.
          </p>

          <br />
          <p>
            However, this is just a beginning. It is our intention to develop it
            into truly foundational ontology for the automotive industry, that
            can help in creation of Knowledge Graphs, can add power to the
            Machine Learning algorithms and much more.
          </p>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import helpers from '../store/helpers.js';
import {
    outboundClick, outboundLinkClick
}
from '../helpers/ga';

export default {
  extends: helpers,
  name: 'HomeView',
  components: {},
  methods: {
    outboundClick,
    outboundLinkClick,
  },
};
</script>

<style lang="scss" scoped>
.automotive-logo {
  float: left;
  width: 400px;
  padding: 15px;
  margin: 15px;
}
</style>
