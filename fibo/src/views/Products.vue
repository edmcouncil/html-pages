<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1><span>FIBO Products</span></h1>

          <h2>About</h2>

          <p>
            FIBO is intended for a range of uses, including in its simplest form
            as an English language glossary or a bank or regulator's data
            dictionary. In its most complex form,
            <router-link :to="{ path: router('OWL') }"
              >FIBO in its native Web Ontology Language (OWL)</router-link
            >, could be used as a bank's operational ontology.
          </p>

          <p>
            FIBO is also available as derived products. All FIBO products are
            generated or derived with an automated process from the
            <router-link :to="{ path: router('OWL') }">FIBO OWL</router-link>.
            Thus all changes in the FIBO OWL will be reflected in all other
            products. There are also external uses of FIBO, such as
            FIBO.schema.org, which use FIBO as a reference for search indexing
            of specific information on the Internet.<br />
          </p>
        </section>

        <section class="blank">
          <h1>Product list</h1>

          <div class="table-container">
            <div class="table-box">
              <div class="table-box__column title">
                <h2 @click="routerGoTo('/OWL')">FIBO OWL</h2>
                <div class="short-description">
                  <p>Official version of FIBO</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p>Includes various serialisations of FIBO OWL</p>
              </div>
              <div class="table-box__column mobile-visit-btn">
                <button
                  type="button"
                  class="btn normal-button"
                  @click="routerGoTo('/OWL')"
                >
                  Learn more
                </button>
              </div>
            </div>
            <div class="table-box">
              <div class="table-box__column title">
                <h2 @click="routerGoTo('/vocabulary')">
                  FIBO Vocabulary (SKOS)
                </h2>
                <div class="short-description">
                  <p>SKOS version of FIBO</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p>
                  FIBO rendered using the W3C
                  <a
                    href="https://www.w3.org/2004/02/skos/intro"
                    v-on:click="
                      outboundLinkClick('https://www.w3.org/2004/02/skos/intro')
                    "
                  >
                    SKOS
                  </a>
                  standard, using extensions to represent IDMP relationships.
                </p>
              </div>
              <div class="table-box__column mobile-visit-btn">
                <button
                  type="button"
                  class="btn normal-button"
                  @click="routerGoTo('/vocabulary')"
                >
                  Learn more
                </button>
              </div>
            </div>
            <div class="table-box">
              <div class="table-box__column title">
                <h2 @click="routerGoTo('/data-dictionary')">
                  FIBO Data Dictionary
                </h2>
                <div class="short-description">
                  <p>
                    FIBO as a data dictionary downloadable in .csv and .xlsx
                    formats
                  </p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p>
                  A summary of each operational class in FIBO, with its
                  properties, presented in the form of tables and fields for
                  viewers familiar with relational data dictionaries.
                </p>
              </div>
              <div class="table-box__column mobile-visit-btn">
                <button
                  type="button"
                  class="btn normal-button"
                  @click="routerGoTo('/data-dictionary')"
                >
                  Learn more
                </button>
              </div>
            </div>
            <div class="table-box">
              <div class="table-box__column title">
                <h2 @click="routerGoTo('/schema')">
                  FIBO extension to schema.org
                </h2>
                <div class="short-description">
                  <p>The FIBO schema.org files</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p>
                  This page provides background information on the use of
                  <a
                    href="https://schema.org/"
                    v-on:click="
                      outboundLinkClick('https://schema.org/')
                    "
                  >
                    schema.org
                  </a> for marking up banks and their products.
                </p>
              </div>
              <div class="table-box__column mobile-visit-btn">
                <button
                  type="button"
                  class="btn normal-button"
                  @click="routerGoTo('/data-dictionary')"
                >
                  Learn more
                </button>
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
import helpers from "../store/helpers.js";
import { outboundClick, outboundLinkClick } from "../helpers/ga";

export default {
  extends: helpers,
  name: "products-view",
  components: { ScrollTopHandler },
  methods: {
    scrollTop() {
      this.$refs.scrollTopHandler.scrollBackUp();
    },
    routerGoTo(target) {
      this.$router.push(target);
    },
    outboundClick,
    outboundLinkClick,
  },
};
</script>

<style lang="scss" scoped>
.table-box {
  min-height: 150px;
}

.table-container .table-box .table-box__column {
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
  .table-container .table-box .table-box__column {
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
</style>

