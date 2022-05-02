<template>
  <div class="container">
    <main>
      <article>
        <h1><span>IDMP Products</span></h1>

        <h2>
          <strong class="under-construction">SITE IS UNDER CONSTRUCTION</strong>
        </h2>

      </article>
    </main>
  </div>
</template>


<script>
import helpers from '../store/helpers.js';
import { outboundClick, outboundLinkClick } from '../helpers/ga';

export default {
  extends: helpers,
  name: 'ProductsView',
  components: {},
  methods: {
    outboundClick,
    outboundLinkClick,
  },
};
</script>

<style lang="scss" scoped>
.under-construction {
  font-size: 25px;
  letter-spacing: 1px;
  word-spacing: 1px;
  font-weight: 700;
}
</style>
