<template>
  <div class="col-md-12 col-lg-12 px-0 ontology-item">
    <CompareBanner v-if="isComparing" />
    <div class="row">
      <ResourceHeader v-if="!isComparing" :data="data" />
      <ResourceHeaderCompare v-else :data="data" />

      <!-- history -->
      <div class="col-md-12 px-0">
        <ResourceHistory
          v-if="!isComparing && ontologyVersions.isGrouped"
          :ontology-versions="ontologyVersions"
          :data="data"
          @version-changed="handleVersionChanged"
        />
      </div>

      <!-- paths -->
      <div
        v-if="!isComparing && data.taxonomy && data.taxonomy.value"
        ref="ontologyPaths"
        class="ontology-item__paths col-md-12"
      >
        <PathsSection :data="data" />
      </div>

      <!-- ontology download -->
      <div
        v-if="
          !isComparing &&
          data.iri.slice(-1) === '/' &&
          data.iri.startsWith(uriSpace)
        "
        class="col-12 px-0"
      >
        <OntologyDownload :data="data" :version="version" />
      </div>

      <!-- sections -->
      <div
        v-for="(section, sectionName, sectionIndex) in data.properties"
        :key="sectionName + (isComparing ? data.headerLeft.label : data.label)"
        class="col-md-12 px-0"
      >
        <ResourceSection
          :section="section"
          :section-name="sectionName"
          :section-index="sectionIndex"
          :is-comparing="isComparing"
          :title-name-changes="data.titleNameChanges"
        />
      </div>
    </div>

    <!-- DATA GRAPH -->
    <div v-if="hasGraph" class="row">
      <div class="col-12 px-0">
        <div class="card">
          <div v-if="hasGraph" ref="dataGraph" class="card-body">
            <h5
              class="card-title section-title"
              @click="
                $refs.dataGraph
                  .querySelector('h5')
                  .classList.toggle('section-collapse')
              "
              @keydown="
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
import { mapState } from 'pinia';
import { useConfigurationStore } from '@/stores/configuration';

export default {
  name: 'Resource',
  props: ['version', 'data', 'isComparing', 'ontologyVersions'],
  emits: ['versionChanged'],
  computed: {
    ...mapState(useConfigurationStore, {
      ontologyName: (store) => store.config.ontpubFamily,
      uriSpace: (store) => store.config.uriSpace
    }),
    hasGraph() {
      return this.data?.graph?.nodes?.length > 1;
    }
  },
  methods: {
    handleVersionChanged(version) {
      this.$emit('versionChanged', version);
    },
    getTitleNameChanges() {
      if (this.data) return this.data.titleNameChanges;
      return null;
    }
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
