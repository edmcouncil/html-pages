<template>
  <div>
    <div class="container ontology-container">
      <div ref="article-top-element"></div>
      <div class="row">
        <!-- secondary column -->
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
                <h5 class="fibo-title-modules">
                  {{ ontologyNameUppercase }} Viewer
                </h5>
                <button
                  type="button"
                  class="btn normal-button button-small"
                  @click="howToUseHandler()"
                >
                  How to use
                </button>
              </div>
            </div>
            <transition
              name="slowfade"
            >
              <div
                v-if="hasVersions"
                class="
                  secondary-column__versions
                  multiselect-xxl-container multiselect-container
                  container
                "
              >
                <div class="menu-box">
                  <div class="menu-box__label">
                    Select {{ ontologyNameUppercase }} version
                  </div>
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
                      <template v-slot:tag="{ option, remove }">
                        <span class="custom__tag">
                          <span>{{ option.label }}</span>
                          <span class="custom__remove" @click="remove(option)">
                            ❌
                          </span>
                        </span>
                      </template>
                      <!-- <template slot="clear" slot-scope="props">
                    <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData"
                    @mousedown.prevent.stop="clearAll(props.search)"></div>
                    </template> -->
                      <template v-slot:noResult>
                        <span>
                          Oops! No elements found. Consider changing the search
                          query.
                        </span>
                      </template>
                    </multiselect>
                  </div>

                  <div class="menu-box__icons">
                    <div class="menu-box__icons__icon icon-clock"></div>
                  </div>
                </div>
                <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.selectedData }}</code></pre> -->
                <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.data }}</code></pre> -->
              </div>
            </transition>
            <transition
              name="slowfade"
            >
              <div
                v-show="modulesList"
                class="
                  secondary-column__tree
                  multiselect-xxl-container multiselect-container
                  container
                "
              >
                <div class="menu-box">
                  <div class="menu-box__label">
                    Browse {{ ontologyNameUppercase }} domains
                  </div>
                  <div class="menu-box__content-text">
                    {{ ontologyNameUppercase }} Domains
                  </div>
                  <div class="menu-box__icons">
                    <div class="menu-box__icons__icon icon-directory"></div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- module tree --->
            <transition
              name="slowfade"
            >
              <ul v-show="modulesList" class="modules-list list-unstyled">
                <module-tree
                  :item="item"
                  v-for="item in modulesList"
                  :location="data"
                  :key="item.label"
                />
              </ul>
            </transition>

            <transition
              name="slowfade"
            >
              <StatsComponent
                v-if="statsServer && missingImportsServer"
                :statsServer="statsServer"
                :missingImportsServer="missingImportsServer"
              />
            </transition>
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
                      <div class="menu-box__label">Search</div>
                      <div class="menu-box__content-text">
                        <multiselect
                          v-model="searchBox.selectedData"
                          label="labelForInternalSearch"
                          track-by="iri"
                          :placeholder="
                            searchBox.inputValue ||
                            'Find domains, ontologies, concepts...'
                          "
                          tagPlaceholder="Search..."
                          selectLabel="x"
                          open-direction="bottom"
                          ref="searchBoxInputDesktop"
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
                          :options-limit="50"
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
                          <template v-slot:clear="props">
                            <div
                              class="multiselect__clear"
                              v-if="searchBox.selectedData"
                              @mousedown.prevent.stop="clearAll(props.search)"
                            ></div>
                          </template>
                          <template v-slot:noResult>
                            <span>
                              Oops! No elements found. Consider changing the
                              search query.
                            </span>
                          </template>
                          <template v-slot:singleLabel>
                            <span>
                              {{
                                searchBox.inputValue ||
                                "Find domains, ontologies, concepts..."
                              }}
                            </span>
                          </template>
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
                  <div class="see-more-btn">Search configuration</div>
                </div>

                <div v-else>
                  <div class="see-less-btn">Search configuration</div>
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
                      <div class="menu-box__label">Select search properties</div>
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
                          @input="onPropertiesChanged"
                        >
                          <template v-slot:option="props">
                            <div class="custom-control custom-checkbox">
                              <input
                                class="custom-control-input"
                                type="checkbox"
                                :name="props.option.identifier"
                                :checked="props.option.selected"
                              />
                              <label class="custom-control-label" :for="props.option.identifier">
                                {{ props.option.label }}
                              </label>
                            </div>
                          </template>
                        </multiselect>
                      </div>
                    </div>
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="useHighlight"
                        v-model="searchBox.useHighlighting"
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

          <!-- mobile multiselects -->
          <div class="secondary-column--mobile container px-0 mb-2 d-lg-none">
            <div
              class="
                secondary-column__how-to-use
                secondary-column__how-to-use--mobile
                multiselect-container
                container
              "
            >
              <div class="row modules-header">
                <h5 class="fibo-title-modules">
                  {{ ontologyNameUppercase }} Viewer
                </h5>
                <button
                  type="button"
                  class="btn normal-button button-small"
                  @click="howToUseHandler()"
                >
                  How to use
                </button>
              </div>
            </div>

            <div
              v-if="hasVersions"
              class="
                secondary-column__versions secondary-column__versions--mobile
                multiselect-container
                container
              "
            >
              <div class="menu-box">
                <div class="menu-box__label">Select version</div>
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
                    <template v-slot:tag="{ option, remove }">
                      <span class="custom__tag">
                        <span>{{ option.label }}</span>
                        <span class="custom__remove" @click="remove(option)"
                          >❌</span
                        >
                      </span>
                    </template>
                    <!-- <template slot="clear" slot-scope="props">
                  <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData"
                  @mousedown.prevent.stop="clearAll(props.search)"></div>
                  </template> -->
                    <template v-slot:noResult>
                      <span>
                        Oops! No elements found. Consider changing the search
                        query.
                      </span>
                    </template>
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
                <div class="menu-box__label">
                  Browse {{ ontologyNameUppercase }} domains
                </div>
                <div class="menu-box__content-text">
                  {{ ontologyNameUppercase }} Domains
                </div>
                <div class="menu-box__icons">
                  <div class="menu-box__icons__icon icon-directory"></div>
                </div>
              </div>
            </div>

            <ul
              v-if="display_modules"
              class="modules-list modules-list--mobile list-unstyled"
            >
              <module-tree
                :item="item"
                v-for="item in modulesList"
                :location="data"
                :key="item.label"
              />
            </ul>

            <div class="search-box search-box--mobile multiselect-container">
              <div class="menu-box">
                <div class="menu-box__label">
                  Search {{ ontologyNameUppercase }}
                </div>
                <div class="menu-box__content-text">
                  <multiselect
                    v-model="searchBox.selectedData"
                    label="labelForInternalSearch"
                    track-by="iri"
                    :placeholder="searchBox.inputValue || 'Find...'"
                    tagPlaceholder="Search..."
                    selectLabel="x"
                    open-direction="bottom"
                    ref="searchBoxInputMobile"
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
                    :options-limit="60"
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
                    <template v-slot:clear="props">
                      <div
                        class="multiselect__clear"
                        v-if="searchBox.selectedData"
                        @mousedown.prevent.stop="clearAll(props.search)"
                      ></div>
                    </template>
                    <template v-slot:noResult>
                      <span>
                        Oops! No elements found. Consider changing the search
                        query.
                      </span>
                    </template>
                    <template v-slot:singleLabel>
                      <span>
                        {{ searchBox.inputValue || "Find..." }}
                      </span>
                    </template>
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
                          @input="onPropertiesChanged"
                        >
                        </multiselect>
                      </div>
                    </div>
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
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
                          result.maturityLevel.icon === 'dev',
                        'maturity-release':
                          result.maturityLevel.icon === 'prod',
                        'maturity-mixed':
                          result.maturityLevel.icon === 'prod_and_dev_mixed',
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
                  searchBox.totalResultsCount >
                  searchBox.displayedResults.length
                "
              >
                Load next
                {{
                  searchBox.totalResultsCount -
                    searchBox.displayedResultsCount <
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
              <transition
                name="fade"
                mode="out-in"
              >
                <!-- SHOW ITEM -->
                <div class="col-md-12 col-lg-12 px-0 ontology-item" v-if="data">
                  <div class="row">
                    <div class="col-md-12 ontology-item__header">
                      <div class="card">
                        <div class="card-body">
                          <!-- report a problem -->
                          <button
                            type="button"
                            class="btn normal-button btn-report-a-problem"
                            v-if="
                              data.iri.startsWith(
                                ontologyResourcesBaseUri
                              ) &&
                              !(this.$route.query && this.$route.query.version)
                            "
                            @click="githubNewIssue()"
                          >
                            Report a problem
                          </button>

                          <!-- maturity alert -->
                          <div class="ontology-item__header__status">
                            <div
                              class="alert alert-error alert-deprecated"
                              role="alert"
                              v-if="data.deprecated"
                            >
                              This resource is deprecated and may be removed
                              shortly.
                            </div>
                            <div
                              class="alert alert-primary alert-maturity"
                              :class="{informative: data.maturityLevel.label === 'INFORMATIVE'}"
                              role="alert"
                              v-if="
                                data.maturityLevel.label === 'INFORMATIVE' ||
                                data.maturityLevel.label === 'PROVISIONAL'
                              "
                            >
                              This resource has maturity level
                              {{ this.data.maturityLevel.label.toLowerCase() }}.

                              <customLink
                                class="custom-link"
                                :name="'Read more'"
                                :query="data.maturityLevel.iri"
                              ></customLink>
                            </div>
                          </div>

                          <div
                            v-if="
                              data.maturityLevel.label === 'INFORMATIVE' ||
                              data.maturityLevel.label === 'PROVISIONAL' ||
                              data.deprecated
                            "
                            class="clearfix"
                          ></div>

                          <!-- header item title -->
                          <h5
                            class="card-title"
                            :class="{
                              'maturity-provisional':
                                this.data.maturityLevel.label === 'PROVISIONAL',
                              'maturity-informative':
                                this.data.maturityLevel.label === 'INFORMATIVE',
                              'maturity-production':
                                this.data.maturityLevel.label === 'RELEASE',
                              'maturity-mixed':
                                this.data.maturityLevel.label === 'MIXED',
                            }"
                          >
                            {{ data.label }}
                          </h5>

                          <div class="clearfix"></div>

                          <h6
                            class="card-subtitle data-iri"
                            v-if="data.iri"
                          >
                            {{ data.iri }}
                          </h6>
                          <div class="url-buttons-container">
                            <CopyButton :copyContent="data.iri" :text="'Copy URL'" />

                            <CopyButton
                              v-if="this.$route.query && this.$route.query.version"
                              :copyContent="data.iri +
                                '?version=' +
                                encodeURI(this.$route.query.version)"
                              :text="'Copy versioned IRI'"
                              class="btn-copy-iri"
                            />
                          </div>

                          <h6
                            class="card-subtitle qname"
                            v-if="data.qName && data.qName !== ''"
                          >
                            {{ data.qName }}
                          </h6>

                          <div class="url-buttons-container">
                            <CopyButton
                              v-if="data.qName && data.qName !== ''"
                              :copyContent="data.qName.replace('QName: ', '')"
                              :text="'Copy QName'"
                            />
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
                      <PathsSection :data="data" />
                    </div>

                    <!-- ontology download -->
                    <div
                      class="col-12 px-0"
                      v-if="
                        data.iri.slice(-1) === '/' &&
                        data.iri.startsWith(this.ontologyResourcesBaseUri)
                      "
                    >
                      <OntologyDownload :data="data" :version="version" />
                    </div>

                    <!-- sections -->
                    <div
                      class="col-md-12 px-0"
                      v-for="(
                        section, sectionName, sectionIndex
                      ) in data.properties"
                      :key="sectionName"
                    >
                      <ResourceSection
                        :section="section"
                        :sectionName="sectionName"
                        :sectionIndex="sectionIndex"
                      />
                    </div>
                  </div>

                  <!-- DATA GRAPH -->
                  <div class="row" v-if="hasGraph">
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

                <!-- NO DATA (How to use) -->
                <div v-else-if="!loader && !searchBox.isLoadingResults && modulesList">
                  <article class="how-to-article">
                    <section class="header-section">
                      <h1>How to use {{ ontologyNameUppercase }} Viewer</h1>
                      <p class="big muted">
                        To start using {{ ontologyNameUppercase }} Viewer, search
                        for interesting concepts by walking through the
                        {{ ontologyNameUppercase }} directory structure on the
                        left-hand side or use the full-text search function.
                      </p>
                    </section>

                    <section v-if="hasVersions" class="blank versions-section">
                      <img class="article-icon" src="@/assets/img/clock.svg" />
                      <h2>{{ ontologyNameUppercase }} Versions</h2>
                      <p class="big muted">
                        {{ ontologyNameUppercase }} Viewer allows for browsing the
                        past versions of {{ ontologyNameUppercase }}.
                      </p>
                      <p>
                        It also helps developers to see the changes proposed to
                        {{ ontologyNameUppercase }} in pull requests before their
                        approval. To see the content of the past
                        {{ ontologyNameUppercase }} releases or recent pull
                        requests, choose them from the drop-down list.
                      </p>
                    </section>

                    <section class="blank structure-section">
                      <img
                        class="article-icon"
                        src="@/assets/img/directory.svg"
                      />
                      <h2>{{ ontologyNameUppercase }} structure</h2>
                      <p class="big muted">
                        {{ ontologyNameUppercase }} is a set of ontologies. It is
                        organized in a hierarchical directory structure.
                      </p>
                      <p>
                        Top-level directories are called domains; beneath that may
                        be one or two levels of sub-domain and then modules and
                        dozens of ontologies at the bottom level.
                      </p>
                    </section>

                    <section class="blank maturity-section">
                      <img class="article-icon" src="@/assets/img/maturity.svg" />
                      <h2>{{ ontologyNameUppercase }} maturity levels</h2>
                      <p class="big muted">
                        Each {{ ontologyNameUppercase }} ontology has one of three
                        levels of maturity.
                      </p>
                      <h3>Release</h3>
                      <p>
                        Release ontologies are ones that are considered to be
                        stable and mature from a development perspective.
                      </p>
                      <h3>Provisional</h3>
                      <p>
                        Provisional ontologies are ones that are considered to be
                        under development.
                      </p>
                      <h3>Informative</h3>
                      <p>
                        Provisional ontologies are ones that are considered
                        deprecated but included for informational purposes because
                        they are referenced by some provisional concept.
                      </p>
                    </section>

                    <section class="blank colours-section">
                      <h2>Colours</h2>
                      <p class="big muted">
                        {{ ontologyNameUppercase }} Viewer uses colours to indicate
                        the status of an ontology. Each ontology is either green
                        or yellow.
                      </p>
                      <div class="color-container">
                        <img
                          class="article-icon--small"
                          src="@/assets/icons/production-maturity.svg"
                        />
                        <p>
                          The green square icon indicates that an ontology has a
                          "release" maturity level. Domains or modules are green
                          if they contain only green ontologies.
                        </p>
                      </div>

                      <div class="color-container">
                        <img
                          class="article-icon--small"
                          src="@/assets/icons/provisional-maturity.svg"
                        />
                        <p>
                          Yellow square icon means that it's provisional.
                          Domains or modules are yellow if they
                          contain only yellow ontologies.
                        </p>
                      </div>

                      <div class="color-container">
                        <img
                          class="article-icon--small"
                          src="@/assets/icons/informative-maturity.svg"
                        />
                        <p>
                          Orange circle icon means that it's informative.
                          Domains or modules are yellow if they
                          contain only orange ontologies.
                        </p>
                      </div>

                      <div class="color-container">
                        <img
                          class="article-icon--small"
                          src="@/assets/icons/mixed-maturity.svg"
                        />
                        <p>
                          Mixed, green-yellow-orange icon means domains or modules
                          include both green, yellow and orange ontologies.
                        </p>
                      </div>
                    </section>

                    <section class="about-section">
                      <p class="title muted">About {{ ontologyNameUppercase }} Viewer</p>
                      <div class="spacing-30"></div>
                      <p class="small">
                        {{ ontologyNameUppercase }} Viewer is a JAVA application
                        that is specifically designed to access both the
                        {{ ontologyNameUppercase }} structure and its content in
                        the easiest possible way. It can serve both as a web
                        application and REST API.
                        {{ ontologyNameUppercase }} Viewer is an open-source
                        project that EDM Council hosts. See
                        https://github.com/edmcouncil/onto-viewer for details.
                      </p>
                    </section>
                  </article>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getEntity,
  getModules,
  getOntologyVersions,
  getFindSearch,
  getFindProperties,
} from "../../api/ontology";

export default {
  name: "OntologyView",
  props: ["ontology"],
  data() {
    return {
      display_modules: false,
      mountedTimestamp: null,
      loader: false,
      data: null,
      query: "",
      ontologyServer: null,
      modulesServer: null,
      hintServer: null,
      searchServer: null,
      statsServer: null,
      missingImportsServer: null,
      version: null,
      versionDefaultSelectedData: {
        "@id": "stable",
        url: "",
      },
      modulesList: null,
      error: false,
      searchBox: {
        inputValue: "",
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
        encodedProperties: "",
        useHighlighting: true,
        dropdownActive: false,
      },
      ontologyVersionsDropdownData: {
        selectedData: null,
        data: [],
        isLoading: false,
      },
    };
  },
  scrollToTop: false,
  mounted() {
    let queryParam = "";
    this.mountedTimestamp = Math.floor(Date.now() / 1000);

    if (this.$route.params && this.$route.params[1]) {
      const ontologyQuery = window.location.pathname.replace(
        `${this.ontologyName}/ontology/`,
        ""
      );
      queryParam = `https://spec.edmcouncil.org/${this.ontologyName}/ontology${ontologyQuery}`;
    } else if (this.$route.query && this.$route.query.query) {
      queryParam =
        encodeURIComponent(this.$route.query.query) +
          encodeURIComponent(this.$route.hash) || "";
    }

    this.updateServers();
    this.query = queryParam;
    this.fetchData(this.query);
    this.fetchModules();
    this.fetchSearchProperties();

    // disable input autocomplete in multiselect
    this.$refs.searchBoxInputMobile.$refs.search.setAttribute("autocomplete", "off")
    this.$refs.searchBoxInputDesktop.$refs.search.setAttribute("autocomplete", "off")

    const scrollTopElement = this.$refs['article-top-element'];
    if (!this.query) {
      scrollTopElement.scrollIntoView({
          behavior: "smooth"
      });
    } else {
      this.scrollToOntologyViewerTopOfContainer();
    }
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

      if (internalRoute.query?.domain) {
        this.searchServer = internalRoute.query.domain;
        this.ontologyServer = internalRoute.query.domain;
        this.statsServer = internalRoute.query.domain;
        this.missingImportsServer = internalRoute.query.domain;
      } else {
        this.searchServer = this.searchDefaultDomain;
        this.ontologyServer = this.ontologyDefaultDomain;
        this.statsServer = this.statsDefaultDomain;
        this.missingImportsServer = this.missingImportsDefaultDomain;
      }

      if (internalRoute.query?.modules) {
        this.modulesServer = internalRoute.query.modules;
      } else {
        this.modulesServer = this.modulesDefaultDomain;
      }

      if (internalRoute.query?.version) {
        this.ontologyServer = this.ontologyServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.searchServer = this.searchServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.modulesServer = this.modulesServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.statsServer = this.statsServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.missingImportsServer = this.missingImportsServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.version = internalRoute.query.version;
      } else {
        this.ontologyServer = this.ontologyServer.replace("{version}", "");
        this.searchServer = this.searchServer.replace("{version}", "");
        this.modulesServer = this.modulesServer.replace("{version}", "");
        this.statsServer = this.statsServer.replace("{version}", "");
        this.missingImportsServer = this.missingImportsServer.replace("{version}", "");
        this.version = null;
      }
    },
    async fetchData(iri) {
      if (iri) {
        this.loader = true;
        this.data = null;
        try {
          const query = `${this.ontologyServer}?iri=${iri}`;
          const result = await getEntity(query);
          const body = await result.json();
          if (body.type !== "details") {
            console.error(`body.type: ${body.type}, expected: details`);
          }
          // check if resource is deprecated
          if (
            body.result.properties["Ontological characteristic"] &&
            body.result.properties["Ontological characteristic"].deprecated &&
            body.result.properties["Ontological characteristic"].deprecated[0]
              .value === "true"
          ) {
            body.result.deprecated = true;
            delete body.result.properties["Ontological characteristic"]
              .deprecated;
            if (
              Object.keys(body.result.properties["Ontological characteristic"])
                .length === 0
            ) {
              delete body.result.properties["Ontological characteristic"];
            }
          } else {
            body.result.deprecated = false;
          }

          this.data = body.result;
          this.error = false;
          this.searchBox.searchError = false;
        } catch (err) {
          console.error(err);
          this.data = null;
          this.error = true;
        }
        this.loader = false;
      }

      try {
        const result = await getOntologyVersions(`/${this.ontologyName}/ontology/api/`);
        const ontologyVersions = await result.json();
        this.ontologyVersionsDropdownData.data = ontologyVersions;
        ontologyVersions.unshift(this.versionDefaultSelectedData); // add default at the beginning

        if (this.version !== null) {
          this.ontologyVersionsDropdownData.selectedData =
            ontologyVersions.find((val) => {
              if (val["@id"] === this.version) {
                return true;
              }
              return false;
            });
        } else {
          this.ontologyVersionsDropdownData.selectedData =
            this.versionDefaultSelectedData;
        }
        this.error = false;
      } catch (err) {
        console.error(err);
        this.error = true;
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
        const result = await getFindProperties(
          this.searchServer + "/properties"
        );
        this.searchBox.findPropertiesAll = await result.json();

        if (this.searchBox.findPropertiesAll.length > 0) {
          this.searchBox.findProperties.push(
            this.searchBox.findPropertiesAll.find(
              (property) => property.identifier === "rdfs_label"
            )
          );
        }

        this.onPropertiesChanged();
      } catch (err) {
        console.error(err);
        this.error = true;
      }
    },
    // vue-multiselect ontologyVersions
    ontologyVersions_optionSelected(selectedOntologyVersion /* , id */) {
      if (
        selectedOntologyVersion["@id"] ===
        this.versionDefaultSelectedData["@id"]
      ) {
        // default selected
        const { version, ...rest } = this.$route.query; // get rid of version
        this.$router.push({ query: rest });
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            ...{
              version: encodeURI(selectedOntologyVersion["@id"]),
            },
          },
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
      if (destRoute.startsWith(`https://spec.edmcouncil.org/${this.ontologyName}`)) {
        // internal ontology
        destRoute = destRoute.replace(`https://spec.edmcouncil.org/${this.ontologyName}`, "");
        this.$router.push({
          path: destRoute,
          query: {
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
          },
        });
      } else {
        // external ontology
        this.$router.push({
          path: "/ontology",
          query: {
            ...{ query: encodeURI(destRoute) },
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
          },
        });
      }
      this.$nextTick(() => {
        this.scrollToOntologyViewerTopOfContainer();
      });
    },
    async searchBox_addTag(newTag) {
      if (newTag != "") {
        this.$router.push({
          path: "/ontology",
          query: {
            ...{ searchBoxQuery: encodeURI(newTag) },
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
          },
        });
      }
    },
    async handleSearchBoxQuery(searchBQuery) {
      try {
        this.searchBox.isLoadingResults = true;
        const isHighlighting = this.searchBox.useHighlighting;

        // wait for properties to be loaded if they arent
        while (this.searchBox.findPropertiesAll.length === 0) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (this.searchBox.findProperties.length > 0) {
          // eslint-disable-next-line max-len
          let domain = encodeURI(
            `${this.searchServer}?term=${searchBQuery}&mode=advance&useHighlighting=${isHighlighting}&findProperties=${this.searchBox.encodedProperties}`
          );

          const result = await getFindSearch(domain);
          const body = await result.json();

          // eslint-disable-next-line no-restricted-syntax
          for (const res of body) {
            if (
              res.maturityLevel === undefined ||
              res.maturityLevel.icon === undefined
            ) {
              res.maturityLevel = {};
              res.maturityLevel.icon = "";
            }
          }

          this.searchBox.totalResults = body;
          this.searchBox.displayedResults = body.slice(
            0,
            this.searchBox.perPage
          );
        } else {
          this.searchBox.totalResults = [];
          this.searchBox.displayedResults = [];
        }

        this.searchBox.lastSearchBQuery = searchBQuery;

        this.searchBox.displayedResultsCount =
          this.searchBox.displayedResults.length;
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
        labelForInternalSearch: searchBQuery,
      };
      this.searchBox.selectedData = tag;
    },
    searchBox_asyncFind(query) {
      this.searchBox.inputValue = query;
      this.searchBox.data = [];

      if (query.trim().length === 0) {
        return;
      }

      this.searchBox.isLoading = true;

      if (this.searchBox.debounce) {
        clearTimeout(this.searchBox.debounce);
      }

      this.searchBox.debounce = setTimeout(async () => {
        try {
          // eslint-disable-next-line max-len
          let domain = encodeURI(
            `${this.searchServer}?term=${query}&mode=advance&useHighlighting=false&findProperties=${this.searchBox.encodedProperties}`
          );
          const result = await getFindSearch(domain);
          const hints = await result.json();

          hints.forEach((el) => {
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
      }, 500);
    },
    clearAll() {
      this.searchBox.selectedData = null;
      this.searchBox.inputValue = "";
      this.$refs.searchBoxInputDesktop.search = "";
      this.$refs.searchBoxInputMobile.search = "";
    },
    searchResultClicked() {
      this.$root.ontologyRouteIsUpdating = true;
    },
    loadMoreResults() {
      this.searchBox.displayedResultsCount += this.searchBox.perPage;
      this.searchBox.displayedResults = this.searchBox.totalResults.slice(
        0,
        this.searchBox.displayedResultsCount
      );
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
        useHighlighting: this.searchBox.useHighlighting,
      };
    },
    getPropertyLabel(identifier) {
      return this.searchBox.findPropertiesAll.find(
        (property) => property.identifier === identifier
      ).label;
    },
    onPropertiesChanged() {
      const identifiersArray = this.searchBox.findProperties.map(
        property => property.identifier
      );
      this.searchBox.encodedProperties = identifiersArray.join(".");

      for (const property of this.searchBox.findPropertiesAll) {
        property.selected = this.searchBox.findProperties.includes(property);
      }
    },
    githubNewIssue() {
      const ontologyQuery = this.data.iri.replace(
        this.ontologyResourcesBaseUri,
        ""
      );
      const label = ontologyQuery.substring(0, ontologyQuery.indexOf("/"));
      const details = {
        label,
        title: `Problem with ${this.data.label.toUpperCase()}`,
        body: `Resource URL:\n${this.data.iri}`,
      };
      const url =
        `https://github.com/edmcouncil/${this.ontologyName}/issues/new` +
        `?labels=${encodeURI(details.label)}` +
        `&template=issue.md` +
        `&title=${encodeURI(details.title)}` +
        `&body=${encodeURI(details.body)}`;

      window.open(url, "_blank");
    },
    howToUseHandler() {
      this.data = null;
      this.searchBox.isLoading = false;
      if (this.$route.fullPath != "/ontology") this.$router.push("/ontology");

      this.$nextTick(async function () {
        this.scrollToOntologyViewerTopOfContainer("smooth");
      });
    },
    scrollToOntologyViewerTopOfContainer(behavior) {
      const element = document.getElementById("ontologyViewerTopOfContainer");

      const rect = element.getBoundingClientRect();
      const scrollTop =
        rect.top + (window.pageYOffset || document.documentElement.scrollTop);

      if (behavior == "smooth")
        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      else window.scrollTo(0, scrollTop);

      this.$root.ontologyRouteIsUpdating = false;
    },
  },
  computed: {
    ...mapState({
      searchDefaultDomain: (state) => state.searchDefaultDomain,
      ontologyDefaultDomain: (state) => state.ontologyDefaultDomain,
      modulesDefaultDomain: (state) => state.modulesDefaultDomain,
      statsDefaultDomain: (state) => state.statsDefaultDomain,
      missingImportsDefaultDomain: (state) => state.missingImportsDefaultDomain,
    }),
    hasVersions() {
      return this.ontologyVersionsDropdownData.data.length > 1;
    },
    hasGraph() {
      return this.data?.graph?.nodes?.length > 1;
    },
    ontologyName() {
      return process.env.ontologyName.toLowerCase();
    },
    ontologyNameUppercase() {
      return process.env.ontologyName.toUpperCase();
    },
    ontologyResourcesBaseUri() {
      return process.env.ontologyResourcesBaseUri;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.updateServers(to);
    this.$root.ontologyRouteIsUpdating = true;
    if (to !== from) {
      let queryParam = "";

      if (to.query && to.query.query) {
        queryParam = to.query.query + to.hash || "";
      } else {
        queryParam = `https://spec.edmcouncil.org/${this.ontologyName}${to.path}`;
      }
      this.query = queryParam;

      if (this.query === `https://spec.edmcouncil.org/${this.ontologyName}/ontology`) {
        this.query = "";
        this.data = null;
      } else {
        this.query = encodeURIComponent(this.query);
      }

      this.$nextTick(async function () {
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
    if (
      this.$root.ontologyRouteIsUpdating ||
      this.$route.query.scrollToTop === "true"
    ) {
      this.searchBox.selectedData = null; // to hide search results after rerouting on ontology page
      this.$nextTick(() => {
        if (this.$route.fullPath != "/ontology")
          this.scrollToOntologyViewerTopOfContainer();
      });
    }

    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // if (this.mountedTimestamp + 2 >= currentTimestamp) {
    // //  this IF makes trick to execute only on page load
    //  this.scrollToOntologyViewerTopOfContainer();
    // }

    if (
      this.$route.query.searchBoxQuery &&
      this.$route.query.searchBoxQuery_isExecuted !== true
    ) {
      this.clearSearchResults();
      const searchQuery = decodeURI(this.$route.query.searchBoxQuery);
      this.searchBox.inputValue = searchQuery;
      this.$refs.searchBoxInputDesktop.search = searchQuery;
      this.$refs.searchBoxInputMobile.search = searchQuery;
      this.handleSearchBoxQuery(searchQuery);
      this.$nextTick(() => {
        if (this.$route.fullPath != "/ontology")
          this.scrollToOntologyViewerTopOfContainer();
      });
      this.$route.query.searchBoxQuery_isExecuted = true;
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
