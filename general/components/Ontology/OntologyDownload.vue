<template>
  <div class="card">
    <div class="card-body">
      <h5
        class="card-title section-title"
        :class="{ 'section-collapse': collapsed }"
        @click="toggleCollapsed"
      >
        Download
      </h5>
      <div>
        <article>
          <section class="blank">
            <div class="table-container">
              <div class="table-box">
                <div class="table-box__column title-column">
                  <h3>{{ data.label }}</h3>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="download-imports-switch"
                      v-model="includeImports"
                      :disabled="!hasImports"
                    />
                    <label
                      class="custom-control-label"
                      for="download-imports-switch"
                    >
                      Include imports
                    </label>
                  </div>
                </div>
                <div class="table-box__column">
                  <div class="download-container">
                    <p class="title small">RDF/XML</p>
                    <button
                      type="button"
                      class="btn normal-button"
                      @click="download()"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OntologyDownload",
  props: ["data", "version"],
  data() {
    return {
      collapsed: false,
      includeImports: false,
      hasImports: false,
      filename: null,

      downloadUrl: null,
      downloadWithImportsUrl: null,
    };
  },
  async mounted() {
    // find download urls
    const resourceUrl = this.data.iri;
    const base = this.ontologyResourcesBaseUri;
    const name = this.ontologyName;

    const iriElements = resourceUrl.split("/");
    this.filename = iriElements[iriElements.length - 2] + ".rdf";
    this.filenameWithImports = iriElements[iriElements.length - 2] + "-Merged.rdf";

    this.downloadUrl = `/${name}/ontology/${
      this.version ? this.version + "/" : ""
    }${resourceUrl.replace(base, "").slice(0, -1)}`;

    this.downloadWithImportsUrl = `/${name}/ontology/${
      this.version ? this.version + "/" : ""
    }${resourceUrl.replace(base, "").slice(0, -1)}-Merged`;

    this.hasImports = await this.checkImportsExist();
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    download() {
      const link = this.includeImports ? this.downloadWithImportsUrl : this.downloadUrl;
      const filename = this.includeImports ? this.filenameWithImports : this.filename;

      const aElement = document.createElement("a");
      aElement.setAttribute("download", filename);
      aElement.setAttribute("href", link+".rdf");
      aElement.setAttribute("target", "_blank");
      aElement.style.display = "none";
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    },
    async checkImportsExist() {
      try {
        this.loader = true;
        return await fetch(this.downloadWithImportsUrl+"/", {
          method: "HEAD",
          headers: { Accept: "application/rdf+xml" },
        }).then((res) => {
          if (res.status != 200)
            throw new Error('Bad response from server');

          const contentType = res.headers.get("content-type");

          if (contentType.indexOf("application/rdf+xml") != -1)
            return true;

          return false;
        });
      } catch {
        return false;
      }
    },
  },
  computed: {
    ontologyName() {
      return this.$store.state.configuration.ontpubFamily.toLowerCase();
    },
    ontologyResourcesBaseUri() {
      return this.$store.state.configuration.uriSpace;
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  padding-top: 0;

  & section.blank {
    padding: 0;
    margin-bottom: 60px;
  }

  .table-box {
    justify-content: space-between;
  }

  .download-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-column {
    max-width: 60%;
  }
}

.custom-switch {
  padding-bottom: 0;
  padding-top: 15px;
}

.normal-button {
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 5px !important;
}

@media (max-width: 1220px) and (min-width: 991px) {
  .table-box {
    flex-direction: column;
    text-align: center;

    .title-column {
      width: auto;
      padding-bottom: 30px;
    }
  }
}

@media (max-width: 648px) {
  .table-box {
    flex-direction: column;
    padding: 30px 15px !important;
    text-align: center;

    .title-column {
      width: auto;
      padding-bottom: 30px;
    }
  }
}
</style>
