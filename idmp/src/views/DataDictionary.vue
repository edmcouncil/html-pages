<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>IDMP Data Dictionary</h1>

          <h2>About</h2>

          <p>
            IDMP data dictionary (aka glossary) is downloadable in .csv and
            .xlsx. It contains a summary of each operational class in IDMP, with
            its properties, presented in the form of tables and fields for
            viewers familiar with relational data dictionaries.
          </p>
        </section>

        <section class="blank">
          <h1>Download</h1>

          <div class="table-container">
            <div
              class="table-box"
              v-for="element in DataDictionarySerializations"
              :key="element.name"
            >
              <div class="table-box__column title">
                <h3 @click="routerGoTo('/OWL')">{{ element.name }}</h3>
              </div>
              <div class="downloads-container">
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
  name: 'DataDictionaryView',
  data() {
    return {
      baseUrl: 'https://spec.edmcouncil.org/idmp/datadictionary',
      branch: 'master/latest',
    }
  },
  components: { ScrollTopHandler },
  computed: {
    ...mapState('DataDictionary', {
      DataDictionarySerializations: state => state.DataDictionarySerializations,
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
