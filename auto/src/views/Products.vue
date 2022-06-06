<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section class="blank">
          <h1>Products</h1>

          <h2 v-if="serializations">Serializations of AUTO OWL</h2>

          <div v-if="serializations" class="table-container serializations">
            <div
              class="table-box"
              v-for="element in serializations"
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
import { mapState } from 'vuex';
import helpers from '../store/helpers.js';
import {
  outboundClick, outboundLinkClick
}
from '../helpers/ga';
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';

export default {
  extends: helpers,
  name: 'ProductsView',
  data() {
    return {
      baseUrl: 'https://spec.edmcouncil.org/auto/ontology',
      branch: 'master/latest',
    }
  },
  components: { ScrollTopHandler },
  computed: {
    ...mapState('OWL', {
      serializations: state => state.serializations,
    }),
  },
  methods: {
    outboundClick,
    outboundLinkClick,
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
  },
};
</script>

<style lang="scss" scoped>
.serializations {
  .table-box {
    padding: 15px 30px !important;
  }
  .downloads-container {
    width: 70%;
    display: flex;
    justify-content: space-evenly;
  }

  .table-box .table-box__column {
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
}

.deliverables .table-box .table-box__column {
  &.mobile-visit-btn {
    display: none;
  }

  &.title {
    flex: 30%;

    h2 {
      &:hover {
        cursor: pointer;
        text-decoration: underline;
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
    flex: 60%;
  }
}

@media (max-width: 991px) {
  .deliverables {
    .table-box .table-box__column {
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

  .serializations {
    .downloads-container {
      width: 100%;
    }
  }

  article.full-page .serializations .table-box .table-box__column {
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
  .serializations .downloads-container {
    flex-direction: column;
  }
}
</style>
