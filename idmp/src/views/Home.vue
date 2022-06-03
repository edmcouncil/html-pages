<template>
  <div class="container">
    <main>
      <article class="full-page">
        <section>
          <h1>About IDMP</h1>
          <h2>IDMP Common Core Ontology</h2>
          <p>
            A well-defined common core ontology that bridges between regional
            and functional perspectives on common substance-related data objects
            and global and scientifically objective representations is required.
          </p>
          <p>
            The goal of our project is to build an IDMP Common Core Ontology
            that enables deep, semantic interoperability based on FAIR
            principles to enhance and augment the existing ISO IDMP standards.
          </p>

          <h2>Why is this important?</h2>
          <p>
            The European Medicines Agency (EMA) will be the first health agency
            to mandate compliance with ISO IDMP (Q1, 2023), with the FDA not far
            behind. Governance of essential IDMP standards and implementations
            is not assigned to a specific, overarching governing body.
          </p>
          <p>
            Diverging implementations of IDMP across geographical regions and
            jurisdictional domains are already causing inconsistencies in the
            interpretation across implementing organizations. Given that there
            is no semantic alignment between regulatory bodies, there exists a
            risk that regulatory compliance needs will lead to large integration
            and interoperability costs and that the benefits from IDMP in drug
            safety, innovation, and other areas will not be fully realized.
          </p>
          <p>
            Rather than concentrating on the discovery of new medicines,
            organizations will be struggling with data issues, e.g., the need to
            map product data across the organization, throughout the product
            lifecycle.
          </p>
          <p>
            Source of description
            <a
              href="https://www.pistoiaalliance.org/projects/current-projects/idmp-common-core-ontology/"
              >IDMP Common Core Ontology</a
            >
          </p>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import helpers from "../store/helpers.js";
import { outboundClick, outboundLinkClick } from "../helpers/ga";

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

<style lang="scss" scoped></style>
