<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section class="blank">
          <!--
            <h1>
                <span> webinar: Knowledge Graph in Action</span>
            </h1>
            <a href="https://register.gotowebinar.com/register/3618900380478224">
            <img style='width: 70%; object-fit: contain;  display: block;margin-left:
            auto;margin-right: auto;' src="../assets/img/OKGWebinar.png" alt="REGISTER" />
            </a><br>
          -->
          <h1>EDMC Open Knowledge Graph specifications</h1>

          <h2>OKG Community spaces</h2>
          <div class="community-spaces-container">
            <div class="communities-list">
              <div class="communities-list__item">
                <div>
                  <h3>EDMC GitHub</h3>
                  <p class="small">
                    The
                    <a
                      href="https://github.com/edmcouncil/"
                      @click="
                        outboundLinkClick('https://github.com/edmcouncil/fibo')
                      "
                    >EDMC GitHub space</a>
                    is the main EDMC development space and the space where all
                    the official dev materials are located.
                  </p>
                </div>
                <div>
                  <button
                    @click="visit('https://github.com/edmcouncil/', true, true)"
                    class="btn normal-button small-button">
                    Open
                  </button>
                </div>
              </div>
              <div class="communities-list__item">
                <div>
                  <h3>EDMConnect</h3>
                  <p class="small">
                    The
                    <a
                      href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-interest-community"
                      @click="
                        outboundLinkClick(
                          'https://edmconnect.edmcouncil.org/fibointerestgroup/home'
                        )
                      "
                    >EDMConnect platform</a>
                    is an official discussion forum for the OKG Community.
                  </p>
                </div>
                <div>
                  <button
                    @click="visit('https://edmconnect.edmcouncil.org/okginterestcommunity/okg-interest-community', true)"
                    class="btn normal-button small-button">
                    Open
                  </button>
                </div>
              </div>
            </div>
            <div class="image-container">
              <img
                src="../assets/img/Open Knowledge Graph logo.png"
                alt="OKG Logo"
              />
            </div>
          </div>

          <div class="clearfix"></div>

          <h2>Quick access</h2>

          <p>
            EDMC actively supports the development of the following ontologies:
          </p>
          <div class="table-container">
            <div class="table-box">
              <div class="table-box__column title">
                <h2><a href="https://spec.edmcouncil.org/fibo/">FIBO</a></h2>
                <div class="short-description">
                  <p>Financial Industry Business Ontology</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p class="small">
                  The Financial Industry Business Ontology (FIBO) defines the
                  sets of things that are of interest in financial business
                  applications and the ways that those things can relate to one
                  another. In this way, FIBO can give meaning to any data (e.g.,
                  spreadsheets, relational databases, XML documents) that
                  describe the business of finance.
                </p>
              </div>
              <div class="table-box__column mobile-visit-btn">
                <button
                  type="button"
                  class="btn normal-button"
                  @click="visit('https://spec.edmcouncil.org/fibo/', false)"
                >
                  Launch
                </button>
              </div>
            </div>
            <div class="table-box">
              <div class="table-box__column title">
                <h2><a href="https://spec.edmcouncil.org/auto/">AUTO</a></h2>
                <div class="short-description">
                  <p>Automotive Ontology</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p class="small">
                  The Automotive Ontology (AUTO) defines the shared conceptual
                  structures in the automotive industry. It is an OWL ontology.
                  It is build upon the auto schema.org extension created by the
                  W3C Automotive Ontology Community Group and it refers to the
                  essential real-world objects related to popular vehicles like
                  cars, buses (coaches), and motorcycles.
                </p>
              </div>
              <div class="table-box__column mobile-visit-btn">
                <button
                  type="button"
                  class="btn normal-button"
                  @click="visit('https://spec.edmcouncil.org/auto/', false)"
                >
                  Launch
                </button>
              </div>
            </div>
          </div>

          <h2 class="more-coming-soon">... more to come soon</h2>

          <!-- <ul>
            <li><a href="https://spec.edmcouncil.org/fibo/">FIBO Home</a></li>
            <li><a href="https://spec.edmcouncil.org/auto/">AUTO Home</a></li>
            <li>... more to come soon</li>
          </ul> -->

          <h2>OKG Innovation Lab</h2>

          <p>
            EDMC recognizes the urgent need to bring this new architecture and
            approach to its members and beyond. In consultations with various
            members, analysts, and software vendors, we have launched the Open
            Knowledge Graph Lab. You can be in touch with its activities by
            joining
            <a
              href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-interest-community"
            >OKG Interest Community</a>.
          </p>

          <h2>OKG Training</h2>
          <p>
            EDMC currently offers the introductory course in Knowledge Graph
            technology - it is available as a
            <a href="https://edmcouncil.org/page/OKGVirtualTraining">
              virtual class</a
            >.
          </p>

          <div style="clear: both"></div>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';
import helpers from '../store/helpers';
import { outboundClick, outboundLinkClick } from '../helpers/ga';

export default {
  extends: helpers,
  name: 'HomeView',
  components: { ScrollTopHandler },
  methods: {
    outboundClick,
    outboundLinkClick,
    visit(url, outbound) {
      if (outbound) {
        this.outboundClick(url);
      }
      const aElement = document.createElement('a');
      aElement.setAttribute('href', url);
      if (outbound) {
        aElement.setAttribute('target', '_blank');
      } else {
        aElement.setAttribute('target', '_self');
      }
      aElement.style.display = 'none';
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    },
    scrollTop() {
      this.$refs.scrollTopHandler.scrollBackUp();
    },
    navigationHandler(to) {
      if (to === '/') {
        this.scrollTop();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.more-coming-soon {
  color: rgba(0, 0, 0, 0.2);
  margin-left: 30px;
  margin-bottom: 75px;
}

button.small-button {
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 5px !important;
}

.community-spaces-container {
  display: flex;
  justify-content: space-between;
  align-content: center;

  .communities-list {
    display: flex;
    max-width: 70%;

    .communities-list__item {
      box-shadow: 0px 5px 20px #07539526;
      margin: 30px 30px 30px 0;
      padding: 30px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      width: 300px;
      max-width: 50%;

      p {
        text-align: justify;
      }
    }
  }

  .image-container {
    flex: 1;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 500px;
      max-width: 100%;
      object-fit: contain;
    }
  }
}

@media (max-width: 768px) {
  .community-spaces-container {
    flex-direction: column-reverse;
    align-items: center;
    .image-container {
      margin: 30px 0;
      width: 60%;
    }
    .communities-list {
      max-width: 100%;

      .communities-list__item {
        margin: 15px;
      }
    }
  }
}

@media (max-width: 480px) {
  .more-coming-soon {
    text-align: center;
  }
  .community-spaces-container {
    .communities-list {
      flex-direction: column;
        .communities-list__item {
        width: 100%;
        max-width: unset;
        margin: 15px 0 15px 0;
        p {
          text-align: justify;
        }
      }
    }
  }
}

// customized table

.table-container .table-box .table-box__column {
  &.title {
    flex: 10%;

    h2 {
      a {
        text-decoration: none;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }

    .short-description {
      p {
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  &.long-description {
    flex: 40%;
    text-align: justify;
    margin-right: 60px;
  }
}

@media (max-width: 991px) {
  .table-container .table-box .table-box__column {
    &.mobile-visit-btn {
      display: block;
    }

    &.title {
      h2 {
        text-align: center;
      }
      .short-description {
        text-align: center;
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }

    &.long-description {
      text-align: justify;
    }
  }
}
</style>
