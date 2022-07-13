<template>
  <div class="container">
    <main>
      <article class="full-page">
        <section>
          <h1>About FIBO</h1>

          <div class="subsection">
            <h2>The Financial Industry Business Ontology</h2>
            <img
              src="../assets/img/FIBO with tagline.png"
              class="transparent-image"
            />
            <p>
              The Financial Industry Business Ontology (FIBO) defines the sets
              of things that are of interest in financial business applications
              and the ways that those things can relate to one another. In this
              way, FIBO can give meaning to any data (e.g., spreadsheets,
              relational databases, XML documents) that describe the business of
              finance.
            </p>
            <p>
              FIBO is hosted and sponsored by the Enterprise Data Management
              Council (EDMC) and is published in a number of formats for
              operating use and business definitions. FIBO is a trademark of EDM
              Council, Inc. It is also standardized by the Object Management
              Group (OMG).
            </p>
            <p>
              FIBO is developed as an ontology in the Web Ontology Language
              (OWL). The language is codified by the World Wide Web Consortium
              (W3C), and it is based on Description Logic. The use of logic
              ensures that each FIBO concept is framed in a way that is
              unambiguous and that is readable both by humans and machines.
            </p>
            <div class="clearfix"></div>
          </div>

          <div class="subsection">
            <h2>EDM Council</h2>
            <img
              src="../assets/img/EDM-council-RGB.png"
              class="transparent-image"
            />

            <p>
              FIBO concepts have been reviewed by
              <a href="https://edmcouncil.org/page/listofmembersreview">
                EDMC member firms
              </a>
              over the years and represent a consensus of the common concepts as
              understood in the industry and as reflected in industry data
              models and message standards.
            </p>
            <p>
              A number of companies and people have made substantial
              contributions to FIBO over the years. These include 88 Solutions,
              Adaptive, Inc., BIAN, Bloomberg LP, Bureau of Economic Analysis
              (BEA, US Department of Commerce), Bureau of Labor Statistics (BLS,
              US Department of Commerce), Census Bureau (US Department of
              Commerce), Citigroup, Commodities Futures Trading Commission
              (CFTC), Credit Suisse, Deutsche Bank, Exprentis, Federal Reserve
              Bank of Kansas City, Goldman Sachs, HP Enterprise / Mphasis,
              MakoLab, Mizuho, NoMagic, Nordea Bank AB, Office of Financial
              Research (US Dept of the Treasury), Pinnacle Bank (Morgan Hill,
              California), Quarule, State Street Bank and Trust, Statistics
              Canada, Tahoe Blue Ltd, Thematix Partners LLC, Wells Fargo, and
              Working Ontologist.
            </p>
            <div class="clearfix"></div>
          </div>

          <div class="subsection">
            <h2>Mission</h2>
            <img
              src="../assets/img/target-3535310_640.jpg"
              class="filled-image"
            />
            <p>
              Since January 2020, EDMC FIBO has been developed by an open
              community process with a mission to develop, maintain, and promote
              global platform-independent, machine-readable and unambiguous data
              standard that enables understanding of the financial terminology,
              cross-system federation and aggregation of data to improve
              effectiveness of decisions, to improve efficiency in regulatory
              reporting and to fast-track the adoption of advanced analytical
              capabilities for financial services.
            </p>
            <div class="clearfix"></div>
          </div>

          <div class="subsection">
            <h2>How to contribute</h2>
            <img
              src="../assets/img/connect-316638_640.jpg"
              class="filled-image"
            />

            <p>
              The FIBO development process follows rigorous and well-defined
              <router-link :to="{ path: router('how-to-contribute') }">
                rules and principles </router-link
              >.
            </p>
            <p>
              FIBO activities and development process are organized via two
              groups:
              <router-link :to="{ path: router('FIBO-Groups') }"
                >the FIBO Steering Group and the FIBO Community
                Group</router-link
              >.
            </p>
            <p>
              Since January 2020, the FIBO
              <a
                href="https://github.com/edmcouncil/fibo"
                v-on:click="
                  outboundLinkClick('https://github.com/edmcouncil/fibo')
                "
              >
                GitHub repository
              </a>
              is the main platform for the FIBO Community Group discussion.
              Please read
              <a
                href="https://github.com/edmcouncil/fibo/blob/master/README.md"
                v-on:click="
                  outboundClick(
                    'https://github.com/edmcouncil/fibo/blob/master/README.md'
                  )
                "
              >
                READ.md
              </a>
              for details.
            </p>
            <div class="clearfix"></div>
          </div>
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
section {
  overflow: auto;
  margin-bottom: 10px;

  .subsection {
    margin-bottom: 60px;
    text-align: justify;
  }

  .subsection:last-child {
    margin-bottom: 0;
  }
}

.transparent-image {
  float: left;
  margin: 30px;
  width: calc(100% - 60px);
  max-width: 400px;
}

.filled-image {
  float: left;
  margin: 0px 30px 30px 30px;
  width: calc(100% - 60px);
  max-width: 400px;
  box-shadow: 0px 0px 60px 60px white;
}
</style>
