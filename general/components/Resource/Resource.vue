<template>
  <div class="col-md-12 col-lg-12 px-0 ontology-item">
    <CompareBanner v-if="isComparing" />
    <div class="row">
      <ResourceHeader
        v-if="!isComparing"
        :data="data"
      />
      <ResourceHeaderCompare
        v-else
        :data="data"
      />

      <!-- paths -->
      <div
        class="ontology-item__paths col-md-12"
        v-if="!isComparing && data.taxonomy && data.taxonomy.value"
        ref="ontologyPaths"
      >
        <PathsSection :data="data" />
      </div>

      <!-- ontology download -->
      <div
        class="col-12 px-0"
        v-if="
          !isComparing &&
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
        :key="sectionName + (isComparing ? data.headerLeft.label : data.label)"
      >
        <ResourceSection
          :section="section"
          :sectionName="sectionName"
          :sectionIndex="sectionIndex"
          :isComparing="isComparing"
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
    'version',
    'data',
    'isComparing'
  ],
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      // configuration
      ontologyName: (state) => state.configuration.ontpubFamily,
      uriSpace: (state) => state.configuration.uriSpace,
    }),
    hasGraph() {
      return this.data?.graph?.nodes?.length > 1;
    },
  }
};
</script>

<style lang="scss">
.ontology-item {
  .row {
    margin: 0;
    padding: 0;
  }
  .card {
    padding-right: 60px;
    padding-left: 60px;
    background: white;
    border: none;
    color: black;

    h5 {
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 36px;
      padding: 0;
      margin: 0;

      margin-bottom: 40px;
    }

    .card-body {
      padding: 0;
    }

    .card-content {
      margin-bottom: 60px;
      border-radius: 2px;
    }
  }
  a {
    color: rgba(0, 0, 0, 0.8);

    &:hover {
      color: $link-hover-color;
    }

    &:active {
      color: $link-active-color;
    }
  }
  .section-content-wrapper {
    margin-bottom: 60px;
  }
  .ontology-item__paths {
    text-decoration: none;
    padding-right: 60px;
    padding-left: 60px;
  }
}

@media (max-width: 991px) {
  .ontology-item {
    .row {
      margin: 0;
      padding: 0;
    }

    a {
      color: rgba(0, 0, 0, 0.8);
    }

    .ontology-item__paths {
      padding-right: 30px;
      padding-left: 30px;
    }

    .card {
      padding-right: 30px;
      padding-left: 30px;
      h5 {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
}
</style>
