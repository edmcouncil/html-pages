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
                    disabled
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
</template>

<script>
export default {
  name: 'DownloadSection',
  props: [ 'data', 'version' ],
  data() {
    return {
      collapsed: false,
      includeImports: false,
      baseUrl: 'https://spec.edmcouncil.org/idmp/ontology/',
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    download() {
      // get file name from iri
      const iriElements = this.data.iri.split('/');
      const filename = iriElements[iriElements.length - 2] + '.rdf';

      // get file path from iri
      const filepath = this.data.iri.replace('https://spec.pistoiaalliance.org/idmp/ontology/', '').slice(0, -1)+'.rdf';

      const link = `${this.baseUrl}${this.version ? this.version+'/' : ''}${filepath}`;
      const aElement = document.createElement('a');
      aElement.setAttribute('download', filename);
      aElement.setAttribute('href', link);
      aElement.setAttribute('target', '_blank');
      aElement.style.display = 'none';
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    }
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
  padding-top: 5px;

  .custom-control-label {
    font-size: 14px;
  }
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
