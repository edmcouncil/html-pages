<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>

        <h1>
          FIBO Community
        </h1>

        <p>
        FIBO Community is and has always been the most important pillar of FIBO.
        We should never forget that ontology - as defined by Nicola Guarino - is a formal specification of a
        <b>shared conceptualization</b>. Creating functional/good financial ontology always means finding consensus
        between parties that agree to share the way they see and talk about the financial domain.
        </p>

        <p>
          FIBO evolved out of concerns that arose during the 2008 financial crisis among individuals who had
          been working together in data governance and management. The most pressing issue at the time was that
          they needed to have a shared, common vocabulary that they could use within their institutions.
        </p>

        <p>After 11 years of FIBO development, the FIBO community has grown significantly. Currently, it has

        <ul>
          <li>over 420 members on
            <a
              href="https://github.com/edmcouncil/fibo/"
              v-on:click="outboundClick('https://github.com/edmcouncil/fibo/')"
            >
              GitHub
            </a> and
          </li>
          <li>over 4800 members on
            <a
              href="https://edmconnect.edmcouncil.org/fibointerestgroup/home"
              v-on:click="outboundClick('https://edmconnect.edmcouncil.org/fibointerestgroup/home')"
            >
              EDMConnect platform
            </a>
          </li>
        </ul>
        </p>

        <p>
          FIBO community is part of a larger EDMC Open Knowledge Graph (OKG) community.
          The OKG community is organized as follows.
          <!-- FIBO development process is organized by two groups: the <strong>FIBO Steering Group</strong>
            and the <strong>FIBO Community Group</strong>. -->
        </p>


        <h2>OKG Steering Committee</h2>

        <p>
        On the top of the OKG community, we've got
        <b>OKG Steering Committee</b>
        that is responsible for the strategic orientation of FIBO (and any other EDMC ontology)
        evolution. It is also responsible for reviewing and approving new releases.</p>

        <!-- <br>
        <p>
          The FIBO Steering Group (FSG) is responsible for
        </p>

        <ul>
          <li>
            the strategic orientation of the FIBO evolution
          </li>
          <li>
            review and approval of new releases
          </li>
          <li>
            changes in the FSG membership
          </li>
        </ul> -->


        <p>
        The OKG Steering Committee is constituted by the representatives of the companies and the experienced senior
        experts interested in supporting the development of FIBO.
        </p>

        <p>
        The OKG Steering Committee is chaired by <b>John Bottega</b>, who acts in this capacity on behalf of the EDMC.
        </p>

        <h2>OKG Interest Groups</h2>

        <p>
        Day-to-day ontology development is carried out by the
        <b>OKG Interest Groups</b>. The Interest Groups are always ontology-specific.
        Currently, we have got two EDMC Interest Groups: FIBO and AUTO.
        Each of them proposes, discusses, and prepares changes to their ontologies.
        </p>

        <h2>OKG Work Groups</h2>
        <p>
        Inside the FIBO and AUTO Interest Groups, we have smaller
        <b>OKG Working Groups</b> that focus on developing a chosen ontology part.
        In FIBO, the working groups are called FIBO Content Teams (FCTs).
        Currently, we have three active FCTs that focus on DER, SEC, and IND. Soon,
        we are planning to restart FIBO LOAN CT meetings.
        </p>

        <!-- <p>
        Later in this webinar, Elisa Kendall will introduce us to the FCTs. We will learn how FCTs are organized and how
        they operate. And, what's the most important, how to join existing FCTs, or even how to organize your own working group.
        </p> -->


        <p>
        The FIBO Working Groups are open to any interested individuals, groups, and organizations that have agreed to
        <a
        href="https://github.com/edmcouncil/fibo/blob/master/README.md#developer-certificate-of-origin-dco">
        the Developer's Certificate of Origin 1.1
        </a>.
        </p>

        <!-- <p>
        The FCG role is to propose, discuss and prepare changes to FIBO.
        </p> -->

        <p>
        Every proposed FIBO extension should strictly follow the rigorous and well-defined
        <a href="https://github.com/edmcouncil/fibo/blob/master/CONTRIBUTING.md">rules and principles</a>,
        including the
        <a href="https://github.com/edmcouncil/fibo/blob/INFRA-489/ONTOLOGY_GUIDE.md">principles of best practices for FIBO</a>.
        FIBO project also adheres to the Contributor Covenant
        <a href="https://github.com/edmcouncil/fibo/blob/master/CODE_OF_CONDUCT.md">code of conduct</a>.
        </p>

        <!-- <p>
        The FCG chair will be announced soon.
        </p> -->


        <h2>FIBO Community spaces</h2>
        <p>
        Since January 2020
        <ul>
        <li>the
        <a
        href="https://github.com/edmcouncil/fibo"
        v-on:click="outboundLinkClick('https://github.com/edmcouncil/fibo')"
        >
        FIBO GitHub repository
        </a>
        is the main FIBO development space and the space where all the official FIBO materials are located, and
        </li>
        <li>
        the
        <a
        href="https://edmconnect.edmcouncil.org/fibointerestgroup/home"
        v-on:click="outboundLinkClick('https://edmconnect.edmcouncil.org/fibointerestgroup/home')"
        >
        EDMConnect platform
        </a>
        is an official discussion forum for the FIBO Community.
        </li>
        </ul>

        </p>


        <!--         <h1>
          <span>How To Contribute</span>
        </h1>


        <p>
          Since January 2020, FIBO has been developed by an open community process.
          Official documentation of the FIBO project is located in its Github repository.
          The following files are important for any FIBO contributors:
        </p>

        <ul>
          <li>
                <a href="https://github.com/edmcouncil/fibo/blob/master/LICENSE"
                    v-on:click="outboundClick('https://github.com/edmcouncil/fibo/blob/master/LICENSE')">
                    LICENSE</a>: FIBO is made available under MIT License.
          </li>
          <li>

                <a href="https://github.com/edmcouncil/fibo/blob/master/DCO"
                    v-on:click="outboundClick('https://github.com/edmcouncil/fibo/blob/master/DCO')">DCO</a>:
                    We enforce the Developer Certificate of Origin (DCO) on Pull Requests.
                    It requires all commit messages to contain the Signed-off-by line with an email address that
                    matches the commit author. Contributors sign-off that they adhere to these requirements by
                    adding a "Signed-off-by" line to commit messages.

          </li>
          <li>
                <a href="https://github.com/edmcouncil/fibo/blob/master/README.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/fibo/blob/master/README.md')">
                    READ.md</a>: The README is the instruction manual. It explains how to get started.

          </li>
          <li>
                <a href="https://github.com/edmcouncil/fibo/blob/master/CONTRIBUTING.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/fibo/blob/master/CONTRIBUTING.md')">
                    CONTRIBUTING.md</a> and <a href="https://github.com/edmcouncil/fibo/blob/master/ONTOLOGY_GUIDE.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/fibo/blob/master/ONTOLOGY_GUIDE.md')">
                    ONTOLOGY_GUIDE.md</a>: These contributing documents explain what types of contributions are needed
                    and how the process works.

          </li>
          <li>

                <a href="https://github.com/edmcouncil/fibo/blob/master/CODE_OF_CONDUCT.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/fibo/blob/master/CODE_OF_CONDUCT.md')">
                    CODE_OF_CONDUCT.md</a>: The code of conduct sets ground rules for participants’
                    behavior associated and helps to facilitate a friendly, welcoming environment.
                    The FIBO project adheres to the Contributor Covenant code of conduct.
                    By participating, you are expected to uphold this code.
          </li>
        </ul> -->
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';
import helpers from '../store/helpers.js';
import { outboundClick, outboundLinkClick } from '../helpers/ga';

export default {
  extends: helpers,
  name: 'FIBOCommunities',
  components: { ScrollTopHandler },
  methods: {
    outboundClick,
    outboundLinkClick,
  },
};
</script>
