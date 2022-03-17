<template>
  <div class="container ontology-container">
    <div class="row">
      <!-- tree large -->
      <div class="col-lg-4 col-xl-3 d-none d-lg-block secondary-column">
        <div class="module-tree">
          <div
            class="
              secondary-column__how-to-use
              multiselect-xxl-container multiselect-container
              container
            "
          >
            <div class="row modules-header">
              <h5 class="fibo-title-modules">FIBO Viewer</h5>
              <div class="button-small">
                <router-link class="button-small-text" to="/ontology" @click="data=null">
                  How to use
                </router-link>
              </div>
            </div>
          </div>
          <div
            class="
              secondary-column__versions
              multiselect-xxl-container multiselect-container
              container
            "
          >
            <div class="menu-box">
              <div class="menu-box__label">Select FIBO version</div>
              <div class="menu-box__content-text">
                <multiselect
                  v-model="ontologyVersionsDropdownData.selectedData"
                  id="ontologyVersionsMultiselect"
                  label="@id"
                  track-by="url"
                  placeholder="Select..."
                  tagPlaceholder="Select..."
                  selectLabel=""
                  open-direction="bottom"
                  :options="ontologyVersionsDropdownData.data"
                  :multiple="false"
                  :searchable="false"
                  :loading="ontologyVersionsDropdownData.isLoading"
                  :internal-search="false"
                  :clear-on-select="false"
                  :close-on-select="true"
                  :max-height="600"
                  :preserve-search="true"
                  :show-no-results="false"
                  :hide-selected="true"
                  :taggable="true"
                  @select="ontologyVersions_optionSelected"
                >
                  <template slot="tag" slot-scope="{ option, remove }"
                    ><span class="custom__tag"
                      ><span>{{ option.label }}</span
                      ><span class="custom__remove" @click="remove(option)"
                        >❌</span
                      ></span
                    ></template
                  >
                  <!-- <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData"
                @mousedown.prevent.stop="clearAll(props.search)"></div>
              </template> -->
                  <span slot="noResult"
                    >Oops! No elements found. Consider changing the search
                    query.</span
                  >
                </multiselect>
              </div>

              <div class="menu-box__icons">
                <div class="menu-box__icons__icon icon-clock"></div>
              </div>
            </div>
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.selectedData }}</code></pre> -->
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.data }}</code></pre> -->
          </div>
          <div
            class="
              secondary-column__tree
              multiselect-xxl-container multiselect-container
              container
            "
          >
            <div class="menu-box">
              <div class="menu-box__label">Browse FIBO domains</div>
              <div class="menu-box__content-text">FIBO Domains</div>
              <div class="menu-box__icons">
                <div class="menu-box__icons__icon icon-directory"></div>
              </div>
            </div>
          </div>

          <!-- module tree --->
          <ul class="modules-list list-unstyled">
            <module-tree
              :item="item"
              v-for="item in modulesList"
              :location="data"
              :key="item.label"
            />
          </ul>
        </div>
      </div>

      <!-- main col -->
      <div class="col-12 col-lg-8 col-xl-9 main-column">
        <div class="container px-0">
          <!-- search box large -->
          <div class="search-box search-box--desktop card d-none d-lg-block">
            <div class="row">
              <div class="col-lg-12">
                <div class="multiselect-xxl-container multiselect-container">
                  <div class="menu-box">
                    <div class="menu-box__label">Search FIBO</div>
                    <div class="menu-box__content-text">
                      <multiselect
                        v-model="searchBox.selectedData"
                        id="ajax2"
                        label="labelForInternalSearch"
                        track-by="iri"
                        :placeholder="
                          searchBox.inputValue ||
                          'Find domains, ontologies, concepts...'
                        "
                        tagPlaceholder="Search..."
                        selectLabel="x"
                        open-direction="bottom"
                        ref="searchBoxInput2"
                        spellcheck="false"
                        :class="{
                          'multiselect--input-empty': !searchBox.inputValue,
                        }"
                        :options="searchBox.data"
                        :multiple="false"
                        :searchable="true"
                        :loading="searchBox.isLoading"
                        :internal-search="false"
                        :clear-on-select="false"
                        :close-on-select="true"
                        :options-limit="300"
                        :limit="3"
                        :limit-text="searchBox_limitText"
                        :max-height="600"
                        :preserve-search="true"
                        :show-no-results="false"
                        :hide-selected="true"
                        :taggable="true"
                        @select="searchBox_optionSelected"
                        @tag="searchBox_addTag"
                        @search-change="searchBox_asyncFind"
                        @open="searchBox.dropdownActive = true"
                        @close="searchBox.dropdownActive = false"
                      >
                        <template slot="clear" slot-scope="props">
                          <div
                            class="multiselect__clear"
                            v-if="searchBox.selectedData"
                            @mousedown.prevent.stop="clearAll(props.search)"
                          ></div>
                        </template>
                        <span slot="noResult">
                          Oops! No elements found. Consider changing the search
                          query.
                        </span>
                        <span slot="singleLabel">
                          {{
                            searchBox.inputValue ||
                            "Find domains, ontologies, concepts..."
                          }}
                        </span>
                      </multiselect>
                    </div>
                    <div
                      class="menu-box__icons"
                      :class="{
                        'menu-box__icons--inactive':
                          !searchBox.dropdownActive && !searchBox.inputValue,
                        'menu-box__icons--loading': searchBox.isLoading,
                      }"
                    >
                      <div
                        class="menu-box__icons__icon icon-search"
                        @click="searchBox_addTag(searchBox.inputValue)"
                      ></div>
                    </div>
                  </div>
                  <!-- <pre class="language-json"><code>{{ searchBox.selectedData }}</code></pre>
                  <pre class="language-json"><code>{{ searchBox.data }}</code></pre> -->
                </div>
              </div>
            </div>
            <div
              class="expand-advanced-btn"
              @click="
                searchBox.isAdvancedExpanded = !searchBox.isAdvancedExpanded
              "
            >
              <div v-if="!searchBox.isAdvancedExpanded">
                <div class="see-more-btn">search configuration</div>
              </div>

              <div v-else>
                <div class="see-less-btn">search configuration</div>
              </div>
            </div>
          </div>

          <div
            class="
              advanced-search-box advanced-search-box--desktop
              card
              d-none d-lg-block
            "
            v-if="searchBox.isAdvancedExpanded"
          >
            <div class="row">
              <div class="col-lg-12">
                <div class="multiselect-xxl-container multiselect-container">
                  <div class="menu-box">
                    <div class="menu-box__label">Search by properties</div>
                    <div class="menu-box__content-text">
                      <multiselect
                        v-model="searchBox.findProperties"
                        placeholder="Select properties..."
                        open-direction="bottom"
                        label="label"
                        track-by="identifier"
                        :searchable="false"
                        :options="searchBox.findPropertiesAll"
                        :close-on-select="false"
                        :multiple="true"
                        @input="encodeProperties"
                      >
                      </multiselect>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="custom-control custom-checkbox">
                    <input
                      v-model="searchBox.useHighlighting"
                      class="custom-control-input"
                      type="checkbox"
                      name="useHighlight"
                      id="useHighlight"
                      value="useHighlight"
                    />
                    <label class="custom-control-label" for="useHighlight">
                      Use highlighting
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container px-0">
          <a
            name="ontologyViewerTopOfContainer"
            id="ontologyViewerTopOfContainer"
          ></a>
        </div>

        <!-- mobile multiselects -->
        <div class="secondary-column--mobile container px-0 mb-2 d-lg-none">
          <div
            class="
              secondary-column__how-to-use secondary-column__how-to-use--mobile
              multiselect-container
              container
            "
          >
            <div class="row modules-header">
              <h5 class="fibo-title-modules">FIBO Viewer</h5>
              <div class="button-small">
                <router-link class="button-small-text" to="/ontology" @click="data=null">
                  How to use
                </router-link>
              </div>
            </div>
          </div>

          <div
            class="
              secondary-column__versions secondary-column__versions--mobile
              multiselect-container
              container
            "
          >
            <div class="menu-box">
              <div class="menu-box__label">Select FIBO version</div>
              <div class="menu-box__content-text">
                <multiselect
                  v-model="ontologyVersionsDropdownData.selectedData"
                  id="ontologyVersionsMultiselect2"
                  label="@id"
                  track-by="url"
                  placeholder="Search..."
                  tagPlaceholder="Search for..."
                  selectLabel=""
                  open-direction="bottom"
                  :options="ontologyVersionsDropdownData.data"
                  :multiple="false"
                  :searchable="false"
                  :loading="ontologyVersionsDropdownData.isLoading"
                  :internal-search="false"
                  :clear-on-select="false"
                  :close-on-select="true"
                  :max-height="600"
                  :preserve-search="true"
                  :show-no-results="false"
                  :hide-selected="true"
                  :taggable="true"
                  @select="ontologyVersions_optionSelected"
                >
                  <template slot="tag" slot-scope="{ option, remove }"
                    ><span class="custom__tag"
                      ><span>{{ option.label }}</span
                      ><span class="custom__remove" @click="remove(option)"
                        >❌</span
                      ></span
                    ></template
                  >
                  <!-- <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData"
                @mousedown.prevent.stop="clearAll(props.search)"></div>
              </template> -->
                  <span slot="noResult"
                    >Oops! No elements found. Consider changing the search
                    query.</span
                  >
                </multiselect>
              </div>

              <div class="menu-box__icons">
                <div class="menu-box__icons__icon icon-clock"></div>
              </div>
            </div>
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.selectedData }}</code></pre> -->
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.data }}</code></pre> -->
          </div>

          <div
            class="
              secondary-column__tree secondary-column__tree--mobile
              multiselect-container
              container
            "
          >
            <div class="menu-box" v-on:click="toggleModuleTree()">
              <div class="menu-box__label">Browse FIBO domains</div>
              <div class="menu-box__content-text">FIBO Domains</div>
              <div class="menu-box__icons">
                <div class="menu-box__icons__icon icon-directory"></div>
              </div>
            </div>
          </div>

          <ul v-if="display_modules" class="modules-list modules-list--mobile list-unstyled">
            <module-tree
              :item="item"
              v-for="item in modulesList"
              :location="data"
              :key="item.label"
            />
          </ul>

          <div class="search-box search-box--mobile multiselect-container">
            <div class="menu-box">
              <div class="menu-box__label">Search FIBO</div>
              <div class="menu-box__content-text">
                <multiselect
                  v-model="searchBox.selectedData"
                  id="ajax"
                  label="labelForInternalSearch"
                  track-by="iri"
                  :placeholder="searchBox.inputValue || 'Find...'"
                  tagPlaceholder="Search..."
                  selectLabel="x"
                  open-direction="bottom"
                  ref="searchBoxInput"
                  spellcheck="false"
                  :class="{ 'multiselect--input-empty': !searchBox.inputValue }"
                  :options="searchBox.data"
                  :multiple="false"
                  :searchable="true"
                  :loading="searchBox.isLoading"
                  :internal-search="false"
                  :clear-on-select="false"
                  :close-on-select="true"
                  :options-limit="300"
                  :limit="3"
                  :limit-text="searchBox_limitText"
                  :max-height="600"
                  :preserve-search="true"
                  :show-no-results="false"
                  :hide-selected="true"
                  :taggable="true"
                  @select="searchBox_optionSelected"
                  @tag="searchBox_addTag"
                  @search-change="searchBox_asyncFind"
                  @open="searchBox.dropdownActive = true"
                  @close="searchBox.dropdownActive = false"
                >
                  <template slot="clear" slot-scope="props">
                    <div
                      class="multiselect__clear"
                      v-if="searchBox.selectedData"
                      @mousedown.prevent.stop="clearAll(props.search)"
                    ></div>
                  </template>
                  <span slot="noResult">
                    Oops! No elements found. Consider changing the search query.
                  </span>
                  <span slot="singleLabel">
                    {{ searchBox.inputValue || "Find..." }}
                  </span>
                </multiselect>
              </div>
              <div
                class="menu-box__icons"
                :class="{
                  'menu-box__icons--inactive':
                    !searchBox.dropdownActive && !searchBox.inputValue,
                  'menu-box__icons--loading': searchBox.isLoading,
                }"
              >
                <div
                  class="menu-box__icons__icon icon-search"
                  @click="searchBox_addTag(searchBox.inputValue)"
                ></div>
              </div>
            </div>
            <div
              class="expand-advanced-btn"
              @click="
                searchBox.isAdvancedExpanded = !searchBox.isAdvancedExpanded
              "
            >
              <div v-if="!searchBox.isAdvancedExpanded">
                <div class="see-more-btn">search configuration</div>
              </div>

              <div v-else>
                <div class="see-less-btn">search configuration</div>
              </div>
            </div>
          </div>
          <div
            class="advanced-search-box advanced-search-box--mobile card"
            v-if="searchBox.isAdvancedExpanded"
          >
            <div class="row">
              <div class="col-lg-12">
                <div class="multiselect-xxl-container multiselect-container">
                  <div class="menu-box">
                    <div class="menu-box__label">Search by properties</div>
                    <div class="menu-box__content-text">
                      <multiselect
                        v-model="searchBox.findProperties"
                        placeholder="Select properties..."
                        open-direction="bottom"
                        label="label"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        track-by="identifier"
                        :searchable="false"
                        :options="searchBox.findPropertiesAll"
                        :close-on-select="false"
                        :multiple="true"
                        @input="encodeProperties"
                      >
                      </multiselect>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="custom-control custom-checkbox">
                    <input
                      v-model="searchBox.useHighlighting"
                      class="custom-control-input"
                      type="checkbox"
                      name="useHighlight"
                      id="useHighlight"
                      value="useHighlight"
                    />
                    <label class="custom-control-label" for="useHighlight">
                      Use highlighting
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="text-center mt-5"
          v-if="
            !error && (loader || searchBox.isLoadingResults || !modulesList)
          "
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div style="margin-bottom: 100vh"></div>
        </div>

        <!-- search results -->
        <div
          class="search-section"
          v-if="searchBox.selectedData && searchBox.selectedData.isSearch"
        >
          <div class="search-section__header">
            <h5>Search results for “{{ searchBox.selectedData.iri }}”</h5>
            <p>{{ searchBox.totalResultsCount }} results</p>
          </div>

          <div
            v-if="searchBox.totalResults && searchBox.totalResults.length"
            class="search-section__items"
          >
            <div
              v-for="(result, index) in searchBox.displayedResults"
              :key="index + searchBox.selectedData.iri"
              class="search-item"
            >
              <div>
                <div class="search-item__title">
                  <div
                    class="search-item__icon"
                    :class="{
                      'maturity-provisional':
                        result.maturityLevel.icon === 'develop',
                      'maturity-release':
                        result.maturityLevel.icon === 'release',
                      'maturity-mixed': result.maturityLevel.icon === 'mixed',
                    }"
                  ></div>
                  <customLink
                    class="custom-link"
                    :name="result.label"
                    :query="result.iri"
                    :customLinkOnClick="searchResultClicked"
                  ></customLink>
                </div>

                <div class="search-item__iri">
                  <customLink
                    class="custom-link"
                    :name="result.iri"
                    :query="result.iri"
                    :customLinkOnClick="searchResultClicked"
                  ></customLink>
                </div>

                <div
                  class="search-item__description-wrapper"
                  v-if="result.highlights.length > 0"
                >
                  <div
                    class="search-item__description"
                    v-for="(highlight, index) in result.highlights"
                    :key="index + highlight.fieldIdentifier"
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
            <!-- No results -->
          </div>

          <div
            class="search-section__load-more"
            v-if="searchBox.totalResultsCount > 0"
          >
            <p>
              1 -
              {{ searchBox.displayedResults.length }}
              of {{ searchBox.totalResultsCount }} results
            </p>

            <button
              type="button"
              class="btn normal-button search-section__load-more__button"
              @click="loadMoreResults()"
              v-if="
                searchBox.totalResultsCount > searchBox.displayedResults.length
              "
            >
              Load next
              {{
                searchBox.totalResultsCount - searchBox.displayedResultsCount <
                searchBox.perPage
                  ? searchBox.totalResultsCount -
                    searchBox.displayedResultsCount
                  : searchBox.perPage
              }}
              results
            </button>

            <button
              disabled
              type="button"
              class="btn normal-button search-section__load-more__button"
              v-else
            >
              No more results to load
            </button>
          </div>
        </div>

        <!-- error -->
        <div class="row" v-if="error || searchBox.searchError">
          <div class="col-12">
            <div class="alert alert-danger alert-error" role="alert">
              <strong>Error!</strong> Cannot fetch data, please try later.
            </div>
          </div>
        </div>

        <div
          class="container"
          v-if="!searchBox.selectedData || !searchBox.selectedData.isSearch"
        >
          <div class="row">
            <!-- SHOW ITEM -->
            <div class="col-md-12 col-lg-12 px-0 ontology-item" v-if="data">
              <div class="row">
                <!--  MATURITY / TITLE  -->
                <div class="col-md-12 ontology-item__header">
                  <!-- TITLE -->
                  <div class="card">
                    <div class="card-body">
                      <!-- report a problem -->
                      <a
                        v-if="
                          !data.iri.startsWith('http://') &&
                          !(this.$route.query && this.$route.query.version)
                        "
                        class="btn-report-a-problem"
                        target="_blank"
                        :href="
                          `https://github.com/edmcouncil/fibo/issues/new` +
                          `?labels=${encodeURI(
                            githubNewIssueDetails().label
                          )}` +
                          `&template=issue.md` +
                          `&title=${encodeURI(githubNewIssueDetails().title)}` +
                          `&body=${encodeURI(githubNewIssueDetails().body)}`
                        "
                        >Report a problem</a
                      >
                      <!-- maturity alert -->
                      <div class="ontology-item__header__status">
                        <div
                          class="alert alert-error alert-deprecated"
                          role="alert"
                          v-if="data.deprecated"
                        >
                          This resource is deprecated and may be removed shortly.
                        </div>
                        <div
                          class="alert alert-primary alert-maturity"
                          role="alert"
                          v-if="
                            data.maturityLevel.label !== 'release' &&
                            data.maturityLevel.label !== ''
                          "
                        >
                          This resource has maturity level
                          {{ this.data.maturityLevel.label }}.

                          <customLink
                            class="custom-link"
                            :name="'Read more'"
                            :query="data.maturityLevel.iri"
                          ></customLink>
                        </div>
                      </div>

                      <div
                        v-if="
                          (data.maturityLevel.label !== 'release' &&
                          data.maturityLevel.label !== '') ||
                          data.deprecated
                        "
                        class="clearfix"
                      ></div>

                      <!-- header item title -->
                      <h5
                        class="card-title"
                        :class="{
                          'maturity-provisional':
                            (this.data.maturityLevel.label !== 'release' &&
                              this.data.maturityLevel.label != '') ||
                            (this.data.maturityLevel.icon &&
                              this.data.maturityLevel.icon === 'develop'),
                          'maturity-production':
                            this.data.maturityLevel.label === 'release' ||
                            (this.data.maturityLevel.icon &&
                              this.data.maturityLevel.icon === 'release'),
                          'maturity-mixed':
                            this.data.maturityLevel.icon &&
                            this.data.maturityLevel.icon === 'mixed',
                        }"
                      >
                        {{ data.label }}
                      </h5>

                      <div class="clearfix"></div>

                      <h6
                        class="card-subtitle mb-2 text-muted data-iri"
                        v-if="data.iri"
                      >
                        {{ data.iri }}
                      </h6>
                      <div class="url-buttons-container">
                        <button
                          v-clipboard="data.iri"
                          type="button"
                          class="btn-copy-url"
                        >
                          Copy URL
                        </button>

                        <button
                          v-if="this.$route.query && this.$route.query.version"
                          v-clipboard="
                            data.iri +
                            '?version=' +
                            encodeURI(this.$route.query.version)
                          "
                          type="button"
                          class="btn-copy-url btn-copy-iri"
                        >
                          Copy versioned IRI
                        </button>
                      </div>

                      <h6
                        class="card-subtitle mb-2 text-muted qname"
                        v-if="data.qName && data.qName !== ''"
                      >
                        {{ data.qName }}
                      </h6>

                      <div class="url-buttons-container">
                        <button
                          v-clipboard="data.qName.replace('QName: ', '')"
                          type="button"
                          class="btn-copy-url"
                          v-if="data.qName && data.qName !== ''"
                        >
                          Copy QName
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- paths -->
                <div
                  class="ontology-item__paths col-md-12"
                  v-if="data.taxonomy && data.taxonomy.value"
                  ref="ontologyPaths"
                >
                  <h5
                    class="section-title"
                    @click="
                      $refs.ontologyPaths
                        .querySelector('h5')
                        .classList.toggle('section-collapse')
                    "
                  >
                    Path(s)
                  </h5>
                  <div class="section-content-wrapper">
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="paths-switch"
                        v-model="pathsSection.isTreeView"
                      />
                      <label class="custom-control-label-prev" for="paths-switch">
                        Paths
                      </label>
                      <label class="custom-control-label" for="paths-switch">
                        Tree
                      </label>
                    </div>

                    <transition @enter="checkPathsOverflow" name="fade" mode="out-in">
                      <div key="path-view" class="ontology-item__paths__path-view" v-if="!pathsSection.isTreeView">
                        <span>
                          <!-- when isPathsMoreVisible is false the v-for works on array slice from 0 to 2,
                            when isPathsMoreVisible is true the v-for works on the whole array -->
                          <div
                            v-for="(
                              taxonomy, tIndex
                            ) in data.taxonomy.value.slice(
                              0,
                              2 +
                                pathsSection.isPathsMoreVisible *
                                  (data.taxonomy.value.length - 2)
                            )"
                            :key="'taxonomyParagraph' + tIndex"
                            class="ontology-item__paths__taxonomy collapsed"
                            ref="taxonomyItems"
                          >
                            <div class="taxonomy-wrapper">
                              <span
                                v-for="(element, index) in taxonomy"
                                :key="'taxonomyEl' + tIndex + element.iri"
                              >
                                <customLink
                                  :name="element.label"
                                  :query="element.iri"
                                ></customLink>
                                <span
                                  class="card-subtitle mb-2 text-muted"
                                  v-if="index != Object.keys(taxonomy).length - 1"
                                >
                                  /
                                </span>
                              </span>
                            </div>

                            <div
                              class="collapseButtons"
                              v-if="pathsSection.hasOverflow[tIndex]"
                              @click.prevent="togglePathCollapsed(tIndex)"
                            >
                              <div>
                                <div class="see-more-btn">Show full path</div>
                              </div>

                              <div>
                                <div class="see-less-btn">Hide full path</div>
                              </div>
                            </div>
                          </div>
                        </span>

                        <div
                          v-show="
                            !pathsSection.isPathsMoreVisible &&
                            data.taxonomy.value.length > 2
                          "
                          @click.prevent="
                            pathsSection.isPathsMoreVisible =
                              !pathsSection.isPathsMoreVisible;
                            checkPathsOverflow();
                          "
                        >
                          <div class="see-more-btn">
                            Show {{ data.taxonomy.value.length - 2 }} more
                            {{
                              data.taxonomy.value.length - 2 > 1
                                ? "paths"
                                : "path"
                            }}
                          </div>
                        </div>

                        <div
                          v-show="
                            pathsSection.isPathsMoreVisible &&
                            data.taxonomy.value.length > 2
                          "
                          @click.prevent="
                            pathsSection.isPathsMoreVisible =
                              !pathsSection.isPathsMoreVisible;
                            checkPathsOverflow();
                          "
                        >
                          <div class="see-less-btn">Show less paths</div>
                        </div>
                      </div>
                      <div key="tree-view" class="ontology-item__paths__tree-view" v-else>
                        <ul class="ontology-item__paths__tree-view__root">
                          <paths-tree
                            v-for="(child, index) in pathsSection.treeView"
                            :key="child.label"
                            :item="child"
                            :isLast="index == pathsSection.treeView.length-1"
                            :isOnly="pathsSection.treeView.length === 1"
                            :isRoot="true"
                          />
                        </ul>
                      </div>
                    </transition>

                  </div>
                </div>

                <!-- sections -->
                <div
                  class="col-md-12 px-0"
                  v-for="(
                    section, sectionName, sectionIndex
                  ) in data.properties"
                  :key="sectionName"
                  ref="sections"
                >
                  <div class="card">
                    <div class="card-body">
                      <h5
                        class="card-title section-title"
                        @click="
                          $refs.sections[sectionIndex]
                            .querySelector('h5')
                            .classList.toggle('section-collapse')
                        "
                      >
                        {{ sectionName }}
                      </h5>
                      <div class="card-content">
                        <dl
                          class="row"
                          v-for="(property, name, propertyIndex) in data
                            .properties[sectionName]"
                          :key="name"
                        >
                          <dt class="col-sm-12">{{ name }}</dt>
                          <dd class="col-sm-12">
                            <ul v-if="property.length > 1">
                              <li
                                v-for="field in property.slice(0, 5)"
                                :key="field.id"
                              >
                                <component
                                  :is="field.type"
                                  :value="field.value"
                                  :entityMaping="field.entityMaping"
                                  v-bind="field"
                                />
                              </li>

                              {{
                                (() => {
                                  if (
                                    sectionsVisibilitySettings[sectionIndex] ===
                                    undefined
                                  ) {
                                    sectionsVisibilitySettings[sectionIndex] =
                                      [];
                                  }
                                  if (
                                    sectionsVisibilitySettings[sectionIndex][
                                      propertyIndex
                                    ] === undefined
                                  ) {
                                    sectionsVisibilitySettings[sectionIndex][
                                      propertyIndex
                                    ] = false;
                                  }
                                })()
                              }}

                              <li
                                v-for="field in property.slice(5)"
                                v-show="
                                  sectionsVisibilitySettings[sectionIndex][
                                    propertyIndex
                                  ]
                                "
                                :key="field.id"
                              >
                                <component
                                  :is="field.type"
                                  :value="field.value"
                                  :entityMaping="field.entityMaping"
                                  v-bind="field"
                                />
                              </li>
                            </ul>
                            <component
                              v-else
                              v-for="field in property"
                              :key="field.id"
                              :is="field.type"
                              :value="field.value"
                              :entityMaping="field.entityMaping"
                              v-bind="field"
                            ></component>
                            <div
                              v-if="property.length > 5"
                              :class="
                                'see-more-btn ' +
                                'see-more-btn_' +
                                sectionIndex +
                                '_' +
                                propertyIndex
                              "
                              v-show="
                                !sectionsVisibilitySettings[sectionIndex][
                                  propertyIndex
                                ]
                              "
                              href="#"
                              @click.prevent="
                                toggleSectionsVisibility(
                                  sectionIndex,
                                  propertyIndex
                                )
                              "
                            >
                              <div>Show more</div>
                            </div>
                            <div
                              v-if="property.length > 5"
                              :class="
                                'see-less-btn ' +
                                'see-more-btn_' +
                                sectionIndex +
                                '_' +
                                propertyIndex
                              "
                              v-show="
                                sectionsVisibilitySettings[sectionIndex][
                                  propertyIndex
                                ]
                              "
                              href="#"
                              @click.prevent="
                                toggleSectionsVisibility(
                                  sectionIndex,
                                  propertyIndex
                                )
                              "
                            >
                              <div>Show less</div>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DATA GRAPH -->
              <div class="row" v-if="data && data.graph">
                <div class="col-12 px-0">
                  <div class="card">
                    <div class="card-body" ref="dataGraph">
                      <h5
                        class="card-title section-title"
                        @click="
                          $refs.dataGraph
                            .querySelector('h5')
                            .classList.toggle('section-collapse')
                        "
                      >
                        Data model for {{ data.label }}
                      </h5>
                      <div class="section-content-wrapper">
                        <vis-network :data="data.graph" :title="data.label" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- NO DATA (HOW TO USE) -->
            <div
              class="col-md-12 col-xxl-12 how-to-article"
              v-else-if="!loader && !searchBox.isLoadingResults"
            >
              <main class="">
                <div class="col-md-12 how-to-article__header">
                  <h5>How to use FIBO Viewer</h5>
                  <p class="text">
                    To start using FIBO Viewer, search for interesting concepts
                    by walking through the FIBO directory structure on the
                    left-hand side or use the full-text search function.
                  </p>
                </div>

                <article class="how-to-article__content">
                  <img src="@/assets/img/clock.svg" />

                  <h5>FIBO Versions</h5>
                  <p class="text">
                    FIBO Viewer allows for browsing the past versions of FIBO.
                  </p>

                  <p class="post-description">
                    It also helps developers to see the changes proposed to FIBO
                    in pull requests before their approval. To see the content
                    of the past FIBO releases or recent pull requests, choose
                    them from the drop-down list.
                  </p>

                  <img
                    class="padding-top40-bottom-10"
                    src="@/assets/img/directory.svg"
                  />

                  <h5>FIBO structure</h5>

                  <p class="text">
                    FIBO is a set of ontologies. It is organized in a
                    hierarchical directory structure.
                  </p>

                  <p class="post-description padding-top30">
                    Top-level directories are called domains; beneath that may
                    be one or two levels of sub-domain and then modules and
                    dozens of ontologies at the bottom level, e.g.:
                  </p>
                  <p class="post-description padding-top30">
                    On the left-hand side, there is a list of eleven FIBO
                    Domains, starting with the Business Entities at the top and
                    ending with Securities at the bottom.
                  </p>

                  <img
                    class="padding-top40-bottom-10"
                    src="@/assets/img/maturity.svg"
                  />

                  <h5>FIBO maturity levels</h5>
                  <p class="text">
                    Each FIBO ontology has one of three levels of maturity.
                  </p>

                  <p class="post-description padding-top30">
                    <strong>Release</strong>
                  </p>
                  <p class="post-description">
                    Release ontologies are ones that are considered to be stable
                    and mature from a development perspective.
                  </p>

                  <p class="post-description padding-top30">
                    <strong>Provisional</strong>
                  </p>
                  <p class="post-description">
                    Provisional ontologies are ones that are considered to be
                    under development.
                  </p>

                  <p class="post-description padding-top30">
                    <strong>Informative</strong>
                  </p>
                  <p class="post-description">
                    Provisional ontologies are ones that are considered
                    deprecated but included for informational purposes because
                    they are referenced by some provisional concept.
                  </p>

                  <h5>Colours</h5>
                  <p class="text">
                    FIBO Viewer uses colours to indicate the status of an
                    ontology. Each ontology is either green or yellow.
                  </p>

                  <img
                    class="post-description padding-top30"
                    src="@/assets/icons/production-maturity.svg"
                  />
                  <p class="post-description">
                    The green square icon indicates that an ontology has a
                    "release" maturity level. Domains or modules are green if
                    they contain only green ontologies.
                  </p>

                  <img
                    class="post-description padding-top30"
                    src="@/assets/icons/provisional-maturity.svg"
                  />
                  <p class="post-description">
                    Yellow square icon means that it provisional or informative.
                    Domains or modules are yellow if they contain only yellow
                    ontologies.
                  </p>

                  <img
                    class="post-description padding-top30"
                    src="@/assets/icons/mixed-maturity.svg"
                  />
                  <p class="post-description">
                    Mixed, green-yellow icon means domains or modules include
                    both green and yellow ontologies.
                  </p>

                  <p class="post-description padding-top30">
                    <strong>About FIBO Viewer</strong>
                  </p>
                  <p class="post-description">
                    FIBO Viewer is a JAVA application that is specifically
                    designed to access both the FIBO structure and its content
                    in the easiest possible way. It can serve both as a web
                    application and REST API. FIBO Viewer is an open-source
                    project that EDM Council hosts. See
                    https://github.com/edmcouncil/fibo-viewer for details.
                  </p>
                </article>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import { getOntology, getModules, getOntologyVersions, getFindSearch, getFindProperties } from "../api/ontology";

export default {
  components: {
    AXIOM: () => import(/* webpackChunkName: "AXIOM" */ "../components/chunks/AXIOM"),
    STRING: () => import(/* webpackChunkName: "STRING" */ "../components/chunks/STRING"),
    DIRECT_SUBCLASSES: () =>
      import(// eslint-disable-next-line comma-dangle
      /* webpackChunkName: "DIRECT_SUBCLASSES" */ "../components/chunks/DIRECT_SUBCLASSES"),
    MODULES: () => import(/* webpackChunkName: "MODULES" */ "../components/chunks/MODULES"),
    IRI: () => import(/* webpackChunkName: "IRI" */ "../components/chunks/IRI"),
    INSTANCES: () =>
      import(// eslint-disable-next-line comma-dangle
      /* webpackChunkName: "INSTANCES" */ "../components/chunks/INSTANCES"),
    ANY_URI: () => import(/* webpackChunkName: "ANY_URI" */ "../components/chunks/ANY_URI"),
    VisNetwork: () => import(/* webpackChunkName: "ANY_URI" */ "../components/VisNetwork"),
    PathsTree: () => import(/* webpackChunkName: "PathsTree" */ "../components/PathsTree"),
    Multiselect,
    Paginate
  },
  props: ["ontology"],
  data() {
    return {
      display_modules: false,
      pathsSection: {
        treeView: [],
        isTreeView: false,
        isPathsMoreVisible: false,
        hasOverflow: []
      },
      sectionsVisibilitySettings: [],
      mountedTimestamp: null,
      loader: false,
      data: null,
      query: "",
      ontologyServer: null,
      modulesServer: null,
      hintServer: null,
      searchServer: null,
      hintDefaultDomain: "/fibo/ontology/{version}api/find/",
      version: null,
      versionDefaultSelectedData: {
        "@id": "stable",
        url: ""
      },
      modulesList: null,
      error: false,
      searchBox: {
        inputValue: '',
        selectedData: null,
        data: [], // search box hints
        totalResultsCount: 0,
        displayedResultsCount: 0,
        totalResults: [], // results: all fetched results
        displayedResults: [], // results: currently displayed
        isLoading: false,
        searchError: false,
        isAdvancedExpanded: false,
        lastSearchBQuery: null, // contains last searchBQuery used
        perPage: 10,
        findPropertiesAll: [],
        findProperties: [],
        encodedProperties: '',
        useHighlighting: true,
        dropdownActive: false,
      },
      ontologyVersionsDropdownData: {
        selectedData: null,
        data: [],
        isLoading: false
      },
      scrollToOntologyViewerTopOfContainer() {
        const element = document.getElementById("ontologyViewerTopOfContainer");

        const rect = element.getBoundingClientRect();
        const scrollTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);

        window.scrollTo(0, scrollTop);
        this.$root.ontologyRouteIsUpdating = false;
      },
      githubNewIssueDetails() {
        const ontologyQuery = this.data.iri.replace("https://spec.edmcouncil.org/fibo/ontology/", "");
        const label = ontologyQuery.substring(0, ontologyQuery.indexOf("/"));
        return {
          label,
          title: `Problem with ${this.data.label.toUpperCase()}`,
          body: `Resource URL:\n${this.data.iri}`
        };
      }
    };
  },
  mounted() {
    let queryParam = "";
    this.mountedTimestamp = Math.floor(Date.now() / 1000);

    if (this.$route.params && this.$route.params[1]) {
      const ontologyQuery = window.location.pathname.replace("/fibo/ontology/", "");
      queryParam = `https://spec.edmcouncil.org/fibo/ontology/${ontologyQuery}`;
      // this.githubNewIssue.title = this.githubNewIssue.titleTemplate.replace('<LABEL>', this.githubNewIssue.label);
    } else if (this.$route.query && this.$route.query.query) {
      queryParam = this.$route.query.query || "";
    }

    // check for taxonomy paths overflow in mobile view with debounce
    let timeoutCheckPathsOverflow = false;
    window.addEventListener("resize", () => {
      clearTimeout(timeoutCheckPathsOverflow);
      timeoutCheckPathsOverflow = setTimeout(this.checkPathsOverflow, 300);
    });

    if (localStorage.isTreeView && localStorage.isTreeView === 'true') {
        this.pathsSection.isTreeView = true;
    }

    this.updateServers();

    this.query = queryParam;
    this.fetchData(this.query);
    this.fetchModules();
    this.fetchSearchProperties();
  },
  methods: {
    toggleModuleTree() {
      this.display_modules = !this.display_modules;
    },
    updateServers(to) {
      let internalRoute = this.$route;
      if (to !== undefined) {
        internalRoute = to;
      }
      if (internalRoute.query && internalRoute.query.domain) {
        this.ontologyServer = internalRoute.query.domain;
      } else {
        this.ontologyServer = this.ontologyDefaultDomain;
      }

      if (internalRoute.query && internalRoute.query.domain) {
        this.searchServer = internalRoute.query.domain;
      } else {
        this.searchServer = this.searchDefaultDomain;
      }

      if (internalRoute.query && internalRoute.query.modules) {
        this.modulesServer = internalRoute.query.modules;
      } else {
        this.modulesServer = this.modulesDefaultDomain;
      }

      if (internalRoute.query && internalRoute.query.version) {
        this.ontologyServer = this.ontologyServer.replace("{version}", `${internalRoute.query.version}/`);
        this.searchServer = this.searchServer.replace("{version}", `${internalRoute.query.version}/`);
        this.modulesServer = this.modulesServer.replace("{version}", `${internalRoute.query.version}/`);
        this.hintServer = this.hintDefaultDomain.replace("{version}", `${internalRoute.query.version}/`);
        this.version = internalRoute.query.version;
      } else {
        this.ontologyServer = this.ontologyServer.replace("{version}", "");
        this.searchServer = this.searchServer.replace("{version}", "");
        this.modulesServer = this.modulesServer.replace("{version}", "");
        this.hintServer = this.hintDefaultDomain.replace("{version}", "");
        this.version = null;
      }
    },
    async fetchData(query) {
      if (query) {
        this.loader = true;
        try {
          const result = await getOntology(query, this.ontologyServer);
          const body = await result.json();
          if (body.type !== "details") {
            console.error(`body.type: ${body.type}, expected: details`);
          }
          // check if resource is deprecated
          if (body.result.properties['Ontological characteristic'] &&
          body.result.properties['Ontological characteristic'].deprecated &&
          body.result.properties['Ontological characteristic'].deprecated[0].value === 'true') {
            body.result.deprecated = true;
            delete body.result.properties['Ontological characteristic'].deprecated;
            if(Object.keys(body.result.properties['Ontological characteristic']).length === 0) {
              delete body.result.properties['Ontological characteristic'];
            }
          } else {
            body.result.deprecated = false;
          }

          this.data = body.result;

          if(this.data.taxonomy && this.data.taxonomy.value) {
            this.pathsSection.treeView = [];
            let tempTaxonomy = JSON.parse(JSON.stringify(this.data.taxonomy.value));
            tempTaxonomy.forEach((element)=>{
              this.getTreeFromList(element, this.pathsSection.treeView);
            });
          }

          this.error = false;
          this.searchBox.searchError = false;
        } catch (err) {
          console.error(err);
          this.data = null;
          this.error = true;
        }
        this.pathsSection.hasOverflow = [];
        this.loader = false;
        this.isPathsMoreVisible = false;
      }

      try {
        const result = await getOntologyVersions();
        const ontologyVersions = await result.json();
        this.ontologyVersionsDropdownData.data = ontologyVersions;
        ontologyVersions.unshift(this.versionDefaultSelectedData); // add default at the beginning

        if (this.version !== null) {
          this.ontologyVersionsDropdownData.selectedData = ontologyVersions.find(val => {
            if (val["@id"] === this.version) {
              return true;
            }
            return false;
          });
        } else {
          this.ontologyVersionsDropdownData.selectedData = this.versionDefaultSelectedData;
        }
        this.error = false;
      } catch (err) {
        console.error(err);
        this.error = true;
      } finally {
        if (this.data && this.data.taxonomy && this.data.taxonomy.value.length > 0) {
            this.checkPathsOverflow();
        }
        this.sectionsVisibilitySettings = [];
      }
    },
    async fetchModules() {
      try {
        const result = await getModules(this.modulesServer);
        this.modulesList = await result.json();
      } catch (err) {
        console.error(err);
        this.error = true;
      }
    },
    async fetchSearchProperties() {
      try {
        const result = await getFindProperties(this.searchServer+'/properties');
        this.searchBox.findPropertiesAll = await result.json();

        if (this.searchBox.findPropertiesAll.length > 0) {
          this.searchBox.findProperties.push(
            this.searchBox.findPropertiesAll.find(
              property => property.identifier === 'rdfs_label'
            )
          );
        }

        this.encodeProperties();

      } catch (err) {
        console.error(err);
        this.error = true;
      }
    },
    // vue-multiselect ontologyVersions
    ontologyVersions_optionSelected(selectedOntologyVersion /* , id */) {
      if (selectedOntologyVersion["@id"] === this.versionDefaultSelectedData["@id"]) {
        // default selected
        const { version, ...rest } = this.$route.query; // get rid of version
        this.$router.push({ query: rest });
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            ...{
              version: encodeURI(selectedOntologyVersion["@id"])
            }
          }
        });
      }

      // clear search results after changing version
      this.clearSearchResults();
    },
    // vue-multiselect
    searchBox_limitText(count) {
      return `and ${count} other results`;
    },
    searchBox_optionSelected(selectedOption /* , id */) {
      let destRoute = selectedOption.iri;
      if (destRoute.startsWith("https://spec.edmcouncil.org/fibo")) {
        // internal ontology
        destRoute = destRoute.replace("https://spec.edmcouncil.org/fibo", "");
        this.$router.push({
          path: destRoute,
          query: {
            ...(this.$route.query && this.$route.query.version ? { version: encodeURI(this.$route.query.version) } : null)
          }
        });
      } else {
        // external ontology
        this.$router.push({
          path: "/ontology",
          query: {
            ...{ query: encodeURI(destRoute) },
            ...(this.$route.query && this.$route.query.version ? { version: encodeURI(this.$route.query.version) } : null)
          }
        });
      }
      this.$nextTick(()=>{
        this.scrollToOntologyViewerTopOfContainer();
      });

    },
    async searchBox_addTag(newTag) {
      if(newTag != '') {
        this.$router.push({
          path: "/ontology",
          query: {
            ...{ searchBoxQuery: encodeURI(newTag) },
            ...(this.$route.query && this.$route.query.version ? { version: encodeURI(this.$route.query.version) } : null)
          }
        });
      }
    },
    async handleSearchBoxQuery(searchBQuery) {
      try {
        this.searchBox.isLoadingResults = true;
        const isHighlighting = this.searchBox.useHighlighting;

        // wait for properties to be loaded if they arent
        while(this.searchBox.findPropertiesAll.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        if(this.searchBox.findProperties.length > 0) {
          // eslint-disable-next-line max-len
          let domain = encodeURI(`${this.searchServer}?term=${searchBQuery}&mode=advance&useHighlighting=${isHighlighting}&findProperties=${this.searchBox.encodedProperties}`);

          const result = await getFindSearch(domain);
          const body = await result.json();

          // eslint-disable-next-line no-restricted-syntax
          for (const res of body) {
            if (res.maturityLevel === undefined || res.maturityLevel.icon === undefined) {
              res.maturityLevel = {};
              res.maturityLevel.icon = "";
            }
          }

          this.searchBox.totalResults = body;
          this.searchBox.displayedResults = body.slice(0, this.searchBox.perPage);
        }
        else {
          this.searchBox.totalResults = [];
          this.searchBox.displayedResults = [];
        }

        this.searchBox.lastSearchBQuery = searchBQuery;

        this.searchBox.displayedResultsCount = this.searchBox.displayedResults.length;
        this.searchBox.totalResultsCount = this.searchBox.totalResults.length;

        this.error = false;
        this.searchBox.isLoadingResults = false;
        this.searchBox.searchError = false;
      } catch (err) {
        console.error(err);
        this.error = true;
        this.searchBox.searchError = true;
        this.searchBox.isLoadingResults = false;
      }

      const tag = {
        isSearch: true,
        iri: searchBQuery,
        label: searchBQuery,
        labelForInternalSearch: searchBQuery
      };
      this.searchBox.selectedData = tag;
    },
    async searchBox_asyncFind(query) {
      this.searchBox.inputValue = query;

      if (query.trim().length === 0) {
        this.searchBox.data = [];
        return;
      }

      this.searchBox.isLoading = true;
      try {
        // eslint-disable-next-line max-len
        let domain = encodeURI(`${this.searchServer}?term=${query}&mode=advance&useHighlighting=false&findProperties=${this.searchBox.encodedProperties}`);

        const result = await getFindSearch(domain);
        const hints = await result.json();
        hints.forEach(el => {
          // eslint-disable-next-line no-param-reassign
          el.labelForInternalSearch = `${el.label} `; // this is hacky to make it possible to search text (add tag) the same as the label in hint results
        });
        this.searchBox.data = hints;
        this.error = false;
      } catch (err) {
        console.error(err);
        this.error = true;
      }
      this.searchBox.isLoading = false;
    },
    clearAll() {
      this.searchBox.selectedData = null;
      this.searchBox.inputValue = '';
      this.$refs.searchBoxInput2.search = '';
      this.$refs.searchBoxInput.search = '';
    },
    searchResultClicked() {
      this.$root.ontologyRouteIsUpdating = true;
    },
    paginateClickCallback(pageIndex) {
      this.handleSearchBoxQuery(this.searchBox.lastSearchBQuery, pageIndex);
    },
    toggleSectionsVisibility(sectionIndex, propertyIndex) {
      // make a copy of the "row"
      const newRow = this.sectionsVisibilitySettings[sectionIndex].slice(0);
      // update the value
      newRow[propertyIndex] = !this.sectionsVisibilitySettings[sectionIndex][propertyIndex];
      // update it in the sectionsVisibilitySettings
      this.$set(this.sectionsVisibilitySettings, sectionIndex, newRow);
    },
    togglePathCollapsed(tIndex) {
      this.$refs.taxonomyItems[tIndex].classList.toggle("collapsed");
    },
    checkPathsOverflow() {
      // go through displayed paths and call checkPathOverflow for them
      if (this.$refs.taxonomyItems
        && this.$refs.ontologyPaths
        && this.data
        && this.data.taxonomy
        && !this.pathsSection.isTreeView) {
        for (
          let i = 0;
          i <
          Math.min(
            2 + this.pathsSection.isPathsMoreVisible * (this.data.taxonomy.value.length - 2),
            this.data.taxonomy.value.length
          );
          i += 1
        ) {
          this.checkPathOverflow(i);
        }
      }
    },
    checkPathOverflow(tIndex) {
      this.$nextTick(() => {
        if (!this.$refs.ontologyPaths.querySelector("h5").classList.contains("section-collapse")) {
          // collapse for overlap test purposes
          const wasCollapsed = this.$refs.taxonomyItems[tIndex].classList.contains("collapsed");
          if (!wasCollapsed) {
            this.$refs.taxonomyItems[tIndex].classList.toggle("collapsed");
          }
          const el = this.$refs.taxonomyItems[tIndex].firstChild;
          const curOverf = el.style.overflow;
          if (!curOverf || curOverf === "visible") el.style.overflow = "hidden";
          const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
          el.style.overflow = curOverf;

          if (!wasCollapsed) {
            this.$refs.taxonomyItems[tIndex].classList.toggle("collapsed");
          }
          // set array value making use of Vue reactivity
          this.$set(this.pathsSection.hasOverflow, tIndex, isOverflowing);
        }
      });
    },
    loadMoreResults() {
      this.searchBox.displayedResultsCount += this.searchBox.perPage;
      this.searchBox.displayedResults = this.searchBox.totalResults.slice(0, this.searchBox.displayedResultsCount);
    },
    clearSearchResults() {
      this.searchBox = {
        inputValue: this.searchBox.inputValue,
        selectedData: null,
        data: [],
        totalResultsCount: 0,
        displayedResultsCount: 0,
        totalResults: [],
        displayedResults: [],
        encodedProperties: this.searchBox.encodedProperties,
        isLoading: false,
        isSearchError: false,
        isAdvancedExpanded: this.searchBox.isAdvancedExpanded,
        lastSearchBQuery: null,
        perPage: this.searchBox.perPage,
        findPropertiesAll: this.searchBox.findPropertiesAll,
        findProperties: this.searchBox.findProperties,
        useHighlighting: this.searchBox.useHighlighting
      };
    },
    getPropertyLabel(identifier) {
      return this.searchBox.findPropertiesAll.find(
        property => property.identifier === identifier
      ).label;
    },
    encodeProperties() {
      this.searchBox.encodedProperties = '';
      for(const [index, property] of this.searchBox.findProperties.entries()) {
        this.searchBox.encodedProperties += property.identifier;
        if(index < this.searchBox.findProperties.length-1) {
          this.searchBox.encodedProperties += '.';
        }
      }
    },
    getTreeFromList(parts,treeNode) {
      if(parts.length === 0)
      {
        return;
      }

      for(let i = 0 ; i < treeNode.length; i++)
      {
        if(parts[0].label === treeNode[i].value.label)
        {
          this.getTreeFromList(parts.splice(1,parts.length), treeNode[i].children);
          return;
        }
      }

      let newNode = {'value': parts[0] ,'children':[]};
      treeNode.push(newNode);
      this.getTreeFromList(parts.splice(1,parts.length), newNode.children);
    }
  },
  computed: {
    ...mapState({
      searchDefaultDomain: state => state.searchDefaultDomain,
      ontologyDefaultDomain: state => state.ontologyDefaultDomain,
      modulesDefaultDomain: state => state.modulesDefaultDomain
    })
  },
  watch: {
    "$route.query.query": query => {
      this.fetchData(query);
    },
    // eslint-disable-next-line no-unused-vars
    "$route.query.version": version => {
      this.updateServers();

      this.fetchData(this.query);
      this.fetchModules();

      // clear search results after changing version
      this.clearSearchResults();
    },
    "pathsSection.isTreeView": newValue => {
      localStorage.isTreeView = newValue;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.updateServers(to);
    this.$root.ontologyRouteIsUpdating = true;
    if (to !== from) {
      let queryParam = "";

      if (to.query && to.query.query) {
        queryParam = to.query.query || "";
      } else {
        queryParam = `https://spec.edmcouncil.org/fibo${to.path}`;
      }
      this.query = queryParam;
      if (this.query === "https://spec.edmcouncil.org/fibo/ontology") {
        this.query = "";
        this.data = null;
      }
      this.$nextTick(async function() {
        this.fetchData(this.query);
      });
    }
    if (!to.query.searchBoxQuery) {
      this.clearSearchResults();
      this.clearAll();
      this.searchBox.isAdvancedExpanded = false;
    }
    next();
  },
  updated() {
    // scrollTo: ontologyViewerTopOfContainer
    if (this.$root.ontologyRouteIsUpdating || this.$route.query.scrollToTop === "true") {
      this.searchBox.selectedData = null; // to hide search results after rerouting on ontology page
      this.$nextTick(()=>{
        this.scrollToOntologyViewerTopOfContainer();
      });
    }

    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // if (this.mountedTimestamp + 2 >= currentTimestamp) {
    // //  this IF makes trick to execute only on page load
    //  this.scrollToOntologyViewerTopOfContainer();
    // }

    if (this.$route.query.searchBoxQuery && this.$route.query.searchBoxQuery_isExecuted !== true) {
      this.clearSearchResults();
      const searchQuery = decodeURI(this.$route.query.searchBoxQuery);
      this.searchBox.inputValue=searchQuery;
      this.$refs.searchBoxInput2.search=searchQuery;
      this.$refs.searchBoxInput.search=searchQuery;
      this.handleSearchBoxQuery(searchQuery);
      this.$nextTick(()=>{
        this.scrollToOntologyViewerTopOfContainer();
      });
      this.$route.query.searchBoxQuery_isExecuted = true;
    }

    // disable input autocomplete in multiselect
    document.getElementById("ajax2").autocomplete = "off";
    document.getElementById("ajax").autocomplete = "off";
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/styles/views/Ontology.scss" lang="scss"></style>
