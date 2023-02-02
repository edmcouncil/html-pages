<template>
  <div class="col-md-12 col-lg-12 px-0 ontology-item">
    <div class="row">
      <div class="col-md-12 ontology-item__header">
        <div class="card">
          <div class="card-body">
            <!-- report a problem -->
            <button
              type="button"
              class="btn normal-button btn-report-a-problem"
              v-if="
                data.iri.startsWith(uriSpace) &&
                !(this.$route.query && this.$route.query.version)
              "
              @click="githubNewIssue()"
            >
              Report a problem
            </button>

            <!-- maturity alert -->
            <div class="ontology-item__header__status">
              <div
                class="alert alert-error alert-deprecated"
                role="alert"
                v-if="data.deprecated"
              >
                This resource is deprecated and may be removed
                shortly.
              </div>
              <div
                class="alert alert-primary alert-maturity"
                :class="{
                  informative:
                    data.maturityLevel.label === 'Informative',
                }"
                role="alert"
                v-if="
                  data.maturityLevel.label === 'Informative' ||
                  data.maturityLevel.label === 'Provisional' ||
                  data.maturityLevel.label === 'Preliminary'
                "
              >
                This resource has maturity level
                {{ this.data.maturityLevel.label.toLowerCase() }}.

                <customLink
                  class="custom-link"
                  :name="'Read more'"
                  :query="data.maturityLevel.iri"
                ></customLink>
              </div>
            </div>

            <div
              v-if="
                data.maturityLevel.label === 'Informative' ||
                data.maturityLevel.label === 'Provisional' ||
                data.maturityLevel.label === 'Preliminary' ||
                data.deprecated
              "
              class="clearfix"
            ></div>

            <!-- header item title -->
            <h5
              class="card-title"
              :class="{
                'maturity-provisional':
                  this.data.maturityLevel.label ===
                    'Provisional' ||
                  this.data.maturityLevel.label === 'Preliminary',
                'maturity-informative':
                  this.data.maturityLevel.label === 'Informative',
                'maturity-production':
                  this.data.maturityLevel.label === 'Release',
                'maturity-mixed':
                  this.data.maturityLevel.label === 'Mixed',
              }"
            >
              {{ data.label }}
            </h5>

            <div class="clearfix"></div>

            <h6 class="card-subtitle data-iri" v-if="data.iri">
              {{ data.iri }}
            </h6>
            <div class="url-buttons-container">
              <CopyButton
                :copyContent="data.iri"
                :text="'Copy IRI'"
              />
            </div>
            <h6
              class="card-subtitle data-iri"
              v-if="
                this.$route.query &&
                this.$route.query.version &&
                data.iri &&
                data.iri.startsWith(uriSpace)
              "
            >
              {{
                this.uriSpace +
                this.$route.query.version +
                "/" +
                data.iri.replace(this.uriSpace, "")
              }}
            </h6>
            <div
              class="url-buttons-container"
              v-if="
                this.$route.query &&
                this.$route.query.version &&
                data.iri.startsWith(uriSpace)
              "
            >
              <CopyButton
                :copyContent="
                  this.uriSpace +
                  this.$route.query.version +
                  '/' +
                  data.iri.replace(this.uriSpace, '')
                "
                :text="'Copy versioned IRI'"
                class="btn-copy-iri"
              />
            </div>

            <h6
              class="card-subtitle qname"
              v-if="data.qName && data.qName !== ''"
            >
              {{ data.qName }}
            </h6>

            <div class="url-buttons-container">
              <CopyButton
                v-if="data.qName && data.qName !== ''"
                :copyContent="data.qName.replace('QName: ', '')"
                :text="'Copy QName'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- paths -->
      <div
        class="ontology-item__paths col-md-12"
        v-if="data.taxonomy && data.taxonomy.value"
        ref="ontologyPaths"
      >
        <PathsSection :data="data" />
      </div>

      <!-- ontology download -->
      <div
        class="col-12 px-0"
        v-if="
          data.iri.slice(-1) === '/' &&
          data.iri.startsWith(this.uriSpace)
        "
      >
        <OntologyDownload :data="data" :version="version" />
      </div>

      <!-- sections -->
      <div
        class="col-md-12 px-0"
        v-for="(
          section, sectionName, sectionIndex
        ) in data.properties"
        :key="sectionName"
      >
        <ResourceSection
          :section="section"
          :sectionName="sectionName"
          :sectionIndex="sectionIndex"
        />
      </div>
    </div>

    <!-- DATA GRAPH -->
    <div class="row" v-if="hasGraph">
      <div class="col-12 px-0">
        <div class="card">
          <div class="card-body" ref="dataGraph" v-if="hasGraph">
            <h5
              class="card-title section-title"
              @click="
                $refs.dataGraph
                  .querySelector('h5')
                  .classList.toggle('section-collapse')
              "
            >
              Data model for {{ data.label }}
            </h5>
            <div class="section-content-wrapper">
              <GraphVisualization :data="data" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Resource',
  props: [
    'data',
  ],
  data() {
    return {

    }
  },
  methods: {
    githubNewIssue() {
      const ontologyQuery = this.data.iri.replace(this.uriSpace, "");
      const label = ontologyQuery.substring(0, ontologyQuery.indexOf("/"));
      const details = {
        label,
        title: `Problem with ${this.data.label.toUpperCase()}`,
        body: `Resource URL:\n${this.data.iri}`,
      };
      const url =
        `${this.ontologyRepositoryUrl}/issues/new` +
        `?labels=${encodeURI(details.label)}` +
        `&template=issue.md` +
        `&title=${encodeURI(details.title)}` +
        `&body=${encodeURI(details.body)}`;

      window.open(url, "_blank");
    },
  },
  computed: {
    ...mapState({
      // configuration
      ontologyName: (state) => state.configuration.ontpubFamily,
      ontologyRepositoryUrl: (state) =>
        state.configuration.ontologyRepositoryUrl,
      uriSpace: (state) => state.configuration.uriSpace,
    }),
    hasGraph() {
      return this.data?.graph?.nodes?.length > 1;
    },
  }
};
</script>

<style lang="scss">

</style>
