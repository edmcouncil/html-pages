<template>
  <div class="container">
    <main>
      <article class="full-page">
        <section class="blank">
          <h1>
            Open Knowledge Graph Lab
          </h1>

          <p class="big muted">We deliver Graph Powered Agile Intelligence</p>

          <h2>OKGL Mission, Participants</h2>
          <img
            style="
              width: 35%;
              object-fit: contain;
              display: block;
              margin-left: auto;
              margin-right: auto;
              max-width: 600px;
            "
            src="../assets/img/gpi.png"
            alt="Open FIBO"
            align="right"
          />

          <p>
            EDMC recognizes the urgent need to bring this new architecture and
            approach to its members and beyond. In consultations with various
            members, analysts, and software vendors, we have launched the Open
            Knowledge Graph Lab (OKGL). OKGL mission is to:
          </p>
          <ol>
            <li>
              Establish and grow a global community of Knowledge Graph
              Consumers, makers of technology, enablers such as management
              consultancies and Systems Integrators and industry standards
              bodies to promote enterprise-wide adoption of this technology.
            </li>
            <li>
              Develop open-source, re-usable, Plug and Play knowledge Graphs
              of high mutualized value via a Cloud marketplace with Sandbox to
              test drive use-cases in an accelerated manner.
            </li>
            <li>
              Provide training and mentorship to participants on Knowledge
              Graph architectures, supporting Ontology development while
              promoting the adoption of relevant industry standards.
            </li>
            <li>
              Develop and provide industry benchmarks to demonstrate
              adoption across various industries.
            </li>
          </ol>

          <h2>OKGL roll-out</h2>

          <p class="title muted">
            Q3, 2020: Phase 1 – Training, Ontology Reviews, POV on Graph
            Architectures and Awareness
          </p>
          <p class="small muted">
            OKGL is already serving early-adopter customers with Knowledge Graph
            training, Ontology reviews, and ability to refine domain-specific
            Ontologies further. Where applicable, OKGL is also leveraging its
            FIBO Ontology for broader Fraud and Risk use cases.
          </p>

          <p class="title muted">
            Q3-4, 2020: Phase 2 – Mutualized value Knowledge Graph Development
            and Socialization
          </p>
          <p class="small muted">
            Establish a working group to identify and develop 1st mutualized
            value Knowledge Graph use case. Early candidates include AML, Fraud
            leveraging FIBO standards. This working group will also develop the
            prototype to demonstrate how AML Knowledge Graph will help address
            the challenges in this space more efficiently than current
            techniques.
          </p>

          <p class="title muted">
            Q4, 2020-Q1, 2021: Phase 3 – Additional Knowledge Graphs, Cloud
            Sandbox availability
          </p>
          <p class="small muted">
            Due to intense focus on the Covid-19 crisis, 2nd working group will
            focus on developing the Covid-19 Knowledge Graph. Additional
            workgroups on use cases such as supply-chain and workplace and
            worker safety are some additional candidates.
          </p>

          <h2>Cloud Sandbox</h2>
          <p class="small">
            OKGL will host a Cloud Sandbox that will serve as a testbed for
            Consumers to develop prototypes and performance metrics rapidly.
            This capability will be enabled by technology vendors and
            consultancies.
          </p>

          <h2>Partnership</h2>
          <p class="small">
            OKGL will also establish partnerships with other ecosystems such as
            R3 and hashgraph to integrate the power of Blockchain and Hashgraph
            architectures and techniques to further enhance the value of
            Knowledge Graph powered Insights.
          </p>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import helpers from '../store/helpers';
import { outboundClick, outboundLinkClick } from '../helpers/ga';

export default {
  extends: helpers,
  name: 'OKGLView',
  components: {},
  methods: {
    outboundClick,
    outboundLinkClick,
  },
};
</script>

<style lang="scss" scoped>
</style>
