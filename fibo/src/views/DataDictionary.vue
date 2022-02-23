1<template>
  <div class="container">
    <main>
      <article>
        <h1>
          <span>FIBO data dictionary</span>
        </h1>

        <p class="text">
          FIBO data dictionary (aka glossary) is downloadable in .csv and .xlsx.
          It contains a summary of each operational class in FIBO, with its
          properties, presented in the form of tables and fields for viewers
          familiar with relational data dictionaries.
        </p>

        <p class="text">
          FIBO Data Dicionary is available for download in the EDMConnect FIBO
          Interest Community space.
        </p>

        <h3>
          <a
            href="https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-data-dict"
            v-on:click="
              outboundClick(
                'https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-data-dict'
              )
            "
            >Download FIBO Data Dictionary</a
          >
        </h3>
      </article>
    </main>
  </div>
</template>


<script>
import helpers from '../store/helpers.js';
import { outboundClick } from '../helpers/ga';

export default {
  extends: helpers,
  name: 'glossary',
  components: {},
  methods: {
    outboundClick,
  },
};
</script>

<style lang="scss" scoped>
</style>
