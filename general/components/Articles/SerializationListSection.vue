<template>
  <div>
    <h1 v-if="sectionItem.title">{{ sectionItem.title }}</h1>

    <div class="table-container">
      <div
        class="table-box"
        v-for="element in serialization"
        :key="element.name"
      >
        <div class="table-box__column title">
          <h3>{{ element.name }}</h3>
        </div>
        <div v-if="!element.csv" class="downloads-container">
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
        <div v-else class="downloads-container">
          <div class="table-box__column download">
            <p>CSV</p>
            <button
              v-for="Link in element.csv"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.csv || element.csv.length === 0"
              disabled
              type="button"
              class="btn normal-button"
            >
              N/A
            </button>
          </div>
          <div class="table-box__column download">
            <p>XLSX</p>
            <button
              v-for="Link in element.xlsx"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.xlsx || element.xlsx.length === 0"
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
  </div>
</template>

<script>
export default {
  name: 'SerializationListSection',
  props: [ 'sectionItem' ],
  data() {
    return {
      serialization: null,
    }
  },
  async mounted() {
    this.serialization = this.sectionItem.serialization;
  },
  methods: {
    download(name) {
      const baseUrl = `https://spec.edmcouncil.org/${this.ontologyName}/ontology`;
      const branch = 'master/latest';
      const link = `${baseUrl}/${branch}/${name}`;
      const aElement = document.createElement('a');
      aElement.setAttribute('download', name);
      aElement.setAttribute('href', link);
      aElement.setAttribute('target', '_blank');
      aElement.style.display = 'none';
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    },
  },
  computed: {
    ontologyName() {
      return process.env.ontologyName.toLowerCase();
    },
  }
}
</script>

<style scoped lang="scss">
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

@media (max-width: 1024px) {
  .downloads-container {
    width: 100%;
  }

  .table-container .table-box {
    flex-direction: column!important;
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
