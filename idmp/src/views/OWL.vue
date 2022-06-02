<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>IDMP OWL</h1>

          <h2>About</h2>

          <p>
            IDMP OWL is available in a number of RDF formats. These are
            available for offline use (i.e., download all of IDMP as a zip), or
            online use. Each IDMP ontology file is available for "follow your
            nose" treatment, a general description of which is available here.
          </p>

          <div class="spacing-45"></div>

          <h2>Releases</h2>
          <p>IDMP OWL is published in two releases:</p>
          <ul>
            <li>
              <p>
                <b>IDMP Production</b>
                is published at the end of each calendar quarter and has been
                vetted by SMEs and passed standard industry hygiene tests for
                OWL.
              </p>
            </li>
            <li>
              <p>
                <b>IDMP Development</b>
                is published in real-time as changes are incorporated by the
                IDMP Community and consists of a draft as well-vetted content.
              </p>
            </li>
          </ul>
        </section>

        <section class="blank">
          <h1>Download</h1>

          <div class="table-container">
            <div
              class="table-box"
              v-for="element in OWLSerializations"
              :key="element.name"
            >
              <div class="table-box__column title">
                <h3>{{ element.name }}</h3>
              </div>
              <div class="downloads-container">
                <div class="table-box__column download">
                  <p>RDF-XML</p>
                  <button
                    v-for="Link in element.xml"
                    :key="Link.name"
                    type="button"
                    class="btn normal-button"
                    @click="download(Link.name)"
                  >
                    {{ Link.name }}
                  </button>
                  <button
                    v-if="!element.xml || element.xml.length === 0"
                    disabled
                    type="button"
                    class="btn normal-button"
                  >
                    N/A
                  </button>
                </div>
                <div class="table-box__column download">
                  <p>TTL</p>
                  <button
                    v-for="Link in element.ttl"
                    :key="Link.name"
                    type="button"
                    class="btn normal-button"
                    @click="download(Link.name)"
                  >
                    {{ Link.name }}
                  </button>
                  <button
                    v-if="!element.ttl || element.ttl.length === 0"
                    disabled
                    type="button"
                    class="btn normal-button"
                  >
                    N/A
                  </button>
                </div>
                <div class="table-box__column download">
                  <p>JSON-LD</p>
                  <button
                    v-for="Link in element.json"
                    :key="Link.name"
                    type="button"
                    class="btn normal-button"
                    @click="download(Link.name)"
                  >
                    {{ Link.name }}
                  </button>
                  <button
                    v-if="!element.json || element.json.length === 0"
                    disabled
                    type="button"
                    class="btn normal-button"
                  >
                    N/A
                  </button>
                </div>
                <div class="table-box__column download">
                  <p>NQ/NT</p>
                  <button
                    v-for="Link in element.nq"
                    :key="Link.name"
                    type="button"
                    class="btn normal-button"
                    @click="download(Link.name)"
                  >
                    {{ Link.name }}
                  </button>
                  <button
                    v-if="!element.nq || element.nq.length === 0"
                    disabled
                    type="button"
                    class="btn normal-button"
                  >
                    N/A
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';
import { outboundClick, outboundLinkClick } from '../helpers/ga';
import { mapState } from 'vuex';

export default {
  name: 'OWLView',
  data() {
    return {
      baseUrl: 'https://spec.edmcouncil.org/idmp/ontology',
      branch: 'master/latest',
    }
  },
  components: { ScrollTopHandler },
  computed: {
    ...mapState('OWL', {
      OWLSerializations: state => state.OWLSerializations,
    }),
  },
  methods: {
    scrollTop() {
      this.$refs.scrollTopHandler.scrollBackUp();
    },
    download(name) {
      const link = `${this.baseUrl}/${this.branch}/${name}`
      const aElement = document.createElement('a');
      aElement.setAttribute('download', name);
      aElement.setAttribute('href', link);
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
.downloads-container {
  width: 70%;
  display: flex;
  justify-content: space-evenly;
}

article.full-page .table-container .table-box {
  padding: 15px 30px;
}

.table-container .table-box .table-box__column {
  margin: 15px 0px;

  &.title {
    width: 30%;
  }

  &.download {
    flex: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      text-align: center;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
    }

    button {
      padding: 5px 10px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      margin: 5px !important;
    }
  }
}

@media (max-width: 991px) {
  .downloads-container {
    width: 100%;
  }

  article.full-page .table-container .table-box .table-box__column {
    &.title {
      text-align: center;
      width: 100%;
    }

    &.download {
      margin: 2px;
      p {
        font-weight: 400;
      }
    }
  }
}

@media (max-width: 646px) {
  .downloads-container {
    flex-direction: column;
  }
}
</style>
