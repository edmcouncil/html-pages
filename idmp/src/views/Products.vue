<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>IDMP Products</h1>

          <h2>About</h2>

          <p>
            IDMP is intended for a range of uses, including in its simplest form
            as an English language glossary or a bank or regulator's data
            dictionary. In its most complex form, IDMP in its native Web
            Ontology Language (OWL), could be used as a bank's operational
            ontology.
          </p>

          <p>
            IDMP is also available as derived products. All IDMP products are
            generated or derived with an automated process from the IDMP OWL.
            Thus all changes in the IDMP OWL will be reflected in all other
            products. There are also external uses of IDMP, such as
            IDMP.schema.org, which use IDMP as a reference for search indexing
            of specific information on the Internet.
          </p>

          <h2>IDMP OWL</h2>
          <p>
            Although IDMP can be seen as a "product family", it is primarily an
            OWL ontology. IDMP OWL, both in its Production and Development
            versions, is available
            <router-link :to="{ path: '/OWL' }">here</router-link>.
          </p>

          <h2>IDMP derived products</h2>
          <p>
            IDMP is also available as derived products. All IDMP products are
            generated or derived with an automated process from the
            <router-link :to="{ path: '/OWL' }">IDMP OWL</router-link>. Thus all
            changes in the IDMP OWL will be reflected in all other products.
          </p>
        </section>

        <section class="blank">
          <h1>Products list</h1>

          <div class="table-container">
            <div class="table-box">
              <div class="table-box__column title">
                <h2 @click="routerGoTo('/OWL')">IDMP OWL</h2>
                <div class="short-description">
                  <p>Official version of IDMP</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p>Includes various serialisations of IDMP OWL</p>
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
                  IDMP Vocabulary
                </h2>
                <div class="short-description">
                  <p>The IDMP Vocabulary in SKOS</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p>
                  IDMP rendered using the W3C
                  <a
                    href="https://www.w3.org/2004/02/skos/intro"
                    v-on:click="
                      outboundLinkClick('https://www.w3.org/2004/02/skos/intro')
                    "
                    >SKOS</a
                  >
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
                  IDMP Data Dictionary
                </h2>
                <div class="short-description">
                  <p>Web searchable, downloadable in .csv and .xlsx</p>
                </div>
              </div>

              <div class="table-box__column long-description">
                <p>
                  A summary of each operational class in IDMP, with its
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
          </div>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';
import { outboundClick, outboundLinkClick } from '../helpers/ga';

export default {
  name: 'ProductsView',
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
    downloadLink(link) {
      this.outboundClick(link);
      const newWindow = window.open();
      newWindow.location = link;
    },
  },
}
</script>

<style lang="scss" scoped>
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
