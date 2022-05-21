<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>IDMP Vocabulary</h1>

          <h2>About</h2>

          <p>
            The IDMP vocabulary is distributed using the Simple Knowledge
            Organization System (SKOS). SKOS is a W3C Recommendation that
            supports the use of knowledge organization systems (KOS) such as
            thesauri, classification schemes, subject heading lists, and
            taxonomies within the framework of the Semantic Web.
          </p>

          <p>
            The IDMP vocabulary is distributed as a machine-readable file in
            which the IDMP class hierarchy is rendered as a tree structure of
            broader and narrower terms. Properties in IDMP appear as properties
            in the IDMP vocabulary. Logical restrictions relating pairs of IDMP
            classes are rendered as simple relationships between corresponding
            concepts in IDMP Vocabulary. The IDMP Vocabulary, therefore, does
            not reflect the full richness of the IDMP Ontologies and is provided
            to support knowledge organization applications that do not require
            the full logic of IDMP.
          </p>

          <p>
            The IDMP Vocabulary machine-readable files are intended to provide
            input to a range of tools, usually characterized as Glossary or
            Vocabulary tools. These tools are generally used to provide further
            business-facing presentations of the content of these files.
          </p>
        </section>

        <section class="blank">
          <h1>Download</h1>

          <div class="table-container">
            <div
              class="table-box"
              v-for="element in VocabularySerializations"
              :key="element.name"
            >
              <div class="table-box__column title">
                <h3 @click="routerGoTo('/OWL')">{{ element.name }}</h3>
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
  name: 'VocabularyView',
  data() {
    return {
      baseUrl: 'https://spec.edmcouncil.org/idmp/vocabulary',
      branch: 'master/latest',
    }
  },
  components: { ScrollTopHandler },
  computed: {
    ...mapState('Vocabulary', {
      VocabularySerializations: state => state.VocabularySerializations,
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
    }
  }
}

@media (max-width: 646px) {
  .downloads-container {
    flex-direction: column;
  }
}
</style>
