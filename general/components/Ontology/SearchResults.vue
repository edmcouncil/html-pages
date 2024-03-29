<template>
  <div
    v-if="searchBox.selectedData && searchBox.selectedData.isSearch"
    class="search-section"
  >
    <div class="search-section__header">
      <h5>Search results for “{{ searchBox.selectedData.iri }}”</h5>
      <p v-if="searchBox.totalResultsCount > 0">
        {{ searchBox.fromCount }} -
        {{ searchBox.toCount }}
        of {{ searchBox.totalResultsCount }} total results
      </p>
      <p v-else>0 total results</p>
    </div>

    <div
      v-if="searchBox.pageResults && searchBox.pageResults.length"
      class="search-section__items"
    >
      <div
        v-for="(result, index) in searchBox.pageResults"
        :key="index + searchBox.selectedData.iri"
        class="search-item"
      >
        <div>
          <div class="search-item__title">
            <!-- <div
              class="search-item__icon"
              :class="{
                'maturity-provisional':
                  result.maturityLevel.icon === 'dev',
                'maturity-release':
                  result.maturityLevel.icon === 'prod',
                'maturity-mixed':
                  result.maturityLevel.icon === 'prod_and_dev_mixed',
              }"
            ></div> -->
            <customLink
              class="custom-link"
              :name="result.label"
              :query="result.iri"
            ></customLink>
          </div>

          <div class="search-item__iri">
            <customLink
              class="custom-link"
              :name="result.iri"
              :query="result.iri"
            ></customLink>
          </div>

          <div
            v-if="result.highlights.length > 0"
            class="search-item__description-wrapper"
          >
            <div
              v-for="(highlight, highlightIndex) in result.highlights"
              :key="highlightIndex + highlight.fieldIdentifier"
              class="search-item__description"
            >
              <span class="search-item__description__label">
                {{ getPropertyLabel(highlight.fieldIdentifier) }}
              </span>
              <span
                class="search-item__description__highlight"
                v-html="highlight.highlightedText"
              >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <article>
        <section class="blank">
          <h2>No results found</h2>
          <p class="muted">
            Consider adjusting search configuration or try changing search
            phrase.
          </p>
        </section>
      </article>
    </div>

    <div
      v-if="searchBox.totalResultsCount > 0"
      class="search-section__load-more"
    >
      <bs-pagination
        v-if="searchBox.totalResultsCount > searchBox.perPage"
        v-model="searchBox.page"
        :total-results="searchBox.totalResultsCount"
        :per-page="searchBox.perPage"
        @page-selected="paginationHandler()"
      ></bs-pagination>

      <p v-else>There is only one page.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  props: ['searchBox'],
  methods: {
    paginationHandler() {
      this.$router.push({
        path: '/ontology',
        query: {
          ...{ search: encodeURI(this.searchBox.lastSearchBQuery) },
          ...{ page: this.searchBox.page },
          ...(this.$route.query && this.$route.query.version
            ? { version: encodeURI(this.$route.query.version) }
            : null)
        }
      });
    },
    getPropertyLabel(identifier) {
      return this.searchBox.findPropertiesAll.find(
        (property) => property.identifier === identifier
      ).label;
    }
  }
};
</script>
