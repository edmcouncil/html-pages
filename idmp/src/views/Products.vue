<template>
  <div class="container">
    <main>
      <article>
        <h1><span>FIBO Products</span></h1>

        <h2>
          <strong>FIBO</strong> is intended for a range of uses, including in
          its simplest form as an English language glossary or a bank or
          regulator's data dictionary. In its most complex form,
          <router-link :to="{ path: router('OWL') }"
            >FIBO in its native Web Ontology Language (OWL)</router-link
          >, could be used as a bank's operational ontology.
        </h2>

        <p>
          FIBO is also available as derived products. All FIBO products are
          generated or derived with an automated process from the
          <router-link :to="{ path: router('OWL') }">FIBO OWL</router-link>.
          Thus all changes in the FIBO OWL will be reflected in all other
          products. There are also external uses of FIBO, such as FIBO.schema.org, which use FIBO as a reference for search indexing of specific information on the Internet.<br>
        </p>

        <div class="table-responsive">
          <table class="table table-style-grey">
            <tr>
              <td>
                <router-link :to="{ path: router('OWL') }"
                  >FIBO OWL</router-link
                >
              </td>
              <td>Official version of FIBO</td>
              <td>
                Includes various serialisations of FIBO OWL
              </td>
            </tr>
            <tr>
              <td>
                <router-link :to="{ path: router('datadictionary') }"
                  >FIBO Data Dictionary</router-link
                >
              </td>
              <td>FIBO as a data dictionary downloadable in .csv and .xlsx formats</td>
              <td>
                A summary of each operational class in FIBO, with its
                properties, presented in the form of tables and fields for
                viewers familiar with relational data dictionaries.
              </td>
            </tr>

            <tr>
              <td>
                <router-link :to="{ path: router('vocabulary') }"
                  >FIBO Vocabulary (SKOS)</router-link
                >
              </td>
              <td>SKOS version of FIBO</td>
              <td>
                FIBO rendered using the W3C
                <a
                  href="https://www.w3.org/2004/02/skos/intro"
                  v-on:click="
                    outboundLinkClick('https://www.w3.org/2004/02/skos/intro')
                  "
                  >SKOS</a
                >
                standard, using extensions to represent FIBO relationships.
              </td>
            </tr>

            <tr>
              <td>
                <router-link :to="{ path: router('schema') }"
                  >FIBO extension to schema.org</router-link
                >
              </td>
              <td>The FIBO schema.org files</td>
              <td>
                This page provides background information on the use of
                <a
                  href="http://schema.org/"
                  v-on:click="outboundLinkClick('http://schema.org/')"
                  >schema.org</a
                >
                for marking up banks and their products.
              </td>
            </tr>
          </table>
        </div>
      </article>
    </main>
  </div>
</template>


<script>
import helpers from '../store/helpers.js';
import { outboundClick, outboundLinkClick } from '../helpers/ga';

export default {
  extends: helpers,
  name: 'products',
  components: {},
  methods: {
    outboundClick,
    outboundLinkClick,
  },
};
</script>

<style lang="scss" scoped>
</style>
