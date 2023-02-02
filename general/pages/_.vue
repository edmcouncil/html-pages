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
            <transition name="slowfade">
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
                      <template v-slot:tag="{ option }">
                        <span class="custom__tag">
                          <span>{{ option.label }}</span>
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
            <transition name="slowfade">
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
            <transition name="slowfade">
              <ul v-show="modulesList" class="modules-list list-unstyled">
                <module-tree
                  :item="item"
                  v-for="item in modulesList"
                  :location="data"
                  :key="item.label"
                />
              </ul>
            </transition>

            <transition name="slowfade">
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
                          :options="searchBox.hintsData"
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
                      <div class="menu-box__label">
                        Select search properties
                      </div>
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
                              <label
                                class="custom-control-label"
                                :for="props.option.identifier"
                              >
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

            <MobileMenuBox
              v-if="hasVersions"
              class="
                secondary-column__versions secondary-column__versions--mobile
              "
              :icon="'icon-clock'"
            >
              <template v-slot:label> Select version </template>
              <template v-slot:multiselect>
                <div
                  class="
                    multiselect-container
                    secondary-column__versions
                    secondary-column__versions--mobile
                  "
                >
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
                    :preserve-search="true"
                    :show-no-results="false"
                    :hide-selected="true"
                    :taggable="true"
                    @select="ontologyVersions_optionSelected"
                  >
                    <template v-slot:tag="{ option }">
                      <span class="custom__tag">
                        <span>{{ option.label }}</span>
                      </span>
                    </template>
                    <template v-slot:noResult>
                      <span>
                        Oops! No elements found. Consider changing the search
                        query.
                      </span>
                    </template>
                  </multiselect>
                </div>
              </template>
            </MobileMenuBox>

            <MobileMenuBox
              class="secondary-column__tree secondary-column__tree--mobile"
              :icon="'icon-directory'"
            >
              <template v-slot:label>
                Browse {{ ontologyNameUppercase }} domains
              </template>
              <template v-slot:textOnly>
                {{ ontologyNameUppercase }} Domains
              </template>
              <template v-slot:textOnlyContent>
                <ul class="modules-list modules-list--mobile list-unstyled">
                  <module-tree
                    :item="item"
                    v-for="item in modulesList"
                    :location="data"
                    :key="item.label"
                  />
                </ul>
              </template>
            </MobileMenuBox>

            <MobileMenuBox
              :icon="'icon-search'"
              class="search-box search-box--mobile"
              ref="mobileSearchbox"
            >
              <template v-slot:label>
                Search {{ ontologyNameUppercase }}
              </template>
              <template v-slot:multiselectPlaceholder> Find... </template>
              <template v-slot:multiselect>
                <div class="search-box search-box--mobile">
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
                    :options="searchBox.hintsData"
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
                    <template v-slot:noOptions>
                      <span> Start typing to show hints. </span>
                    </template>
                    <template v-slot:singleLabel>
                      <span>
                        {{ searchBox.inputValue || "Find..." }}
                      </span>
                    </template>
                  </multiselect>
                  <div
                    class="mobile-search-icon"
                    v-if="!searchBox.isLoading"
                    @click="searchBox_addTag(searchBox.inputValue)"
                  ></div>
                </div>
              </template>
            </MobileMenuBox>

            <div
              class="expand-advanced-btn expand-advanced-btn--mobile"
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

            <div
              class="advanced-search-box-wrapper"
              v-if="searchBox.isAdvancedExpanded"
            >
              <MobileMenuBox
                class="advanced-search-box advanced-search-box--mobile card"
              >
                <template v-slot:label> Search by properties </template>
                <template v-slot:multiselectPlaceholder> Find... </template>
                <template v-slot:multiselect>
                  <div class="advanced-search-box advanced-search-box--mobile">
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
                </template>
              </MobileMenuBox>

              <div class="d-flex justify-content-between align-items-center">
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

          <div class="container px-0">
            <a
              name="ontologyViewerTopOfContainer"
              id="ontologyViewerTopOfContainer"
            ></a>
          </div>

          <div
            class="text-center mt-5"
            v-if="
              !isError && (loader || searchBox.isLoadingResults || !modulesList)
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
              <article>
                <section class="blank">
                  <h2>No results found</h2>
                  <p class="muted">
                    Consider adjusting search configuration or try changing
                    search phrase.
                  </p>
                </section>
              </article>
            </div>

            <div
              class="search-section__load-more"
              v-if="searchBox.totalResultsCount > 0"
            >
              <b-pagination
                pills
                first-number
                last-number
                v-model="searchBox.page"
                :total-rows="searchBox.totalResultsCount"
                :per-page="searchBox.perPage"
                @input="paginationHandler()"
                v-if="searchBox.totalResultsCount > searchBox.perPage"
              ></b-pagination>

              <p v-else>There is only one page.</p>
            </div>
          </div>

          <!-- errors -->
          <div class="row" v-if="error.search">
            <div class="col-12">
              <div class="ontology-alert red" role="alert">
                <strong>Error!</strong> We had trouble connecting with our
                search server, please try later.
                <div
                  @click="error.search = false"
                  class="dismiss-alert-button"
                ></div>
              </div>
            </div>
          </div>

          <div class="row" v-if="error.entityData">
            <div class="col-12">
              <div class="ontology-alert red" role="alert">
                <strong>Error!</strong> Cannot fetch data, please try later.
                <div
                  @click="error.entityData = false"
                  class="dismiss-alert-button"
                ></div>
              </div>
            </div>
          </div>

          <div class="row" v-if="error.versions">
            <div class="col-12">
              <div class="ontology-alert yellow" role="alert">
                <strong>Warning!</strong> Versions could not be loaded.
                <div
                  @click="error.versions = false"
                  class="dismiss-alert-button"
                ></div>
              </div>
            </div>
          </div>

          <div class="row" v-if="error.modules">
            <div class="col-12">
              <div class="ontology-alert yellow" role="alert">
                <strong>Warning!</strong> Modules could not be loaded.
                <div
                  @click="error.modules = false"
                  class="dismiss-alert-button"
                ></div>
              </div>
            </div>
          </div>

          <div class="row" v-if="error.properties">
            <div class="col-12">
              <div class="ontology-alert yellow" role="alert">
                <strong>Warning!</strong> Search properties could not be loaded.
                <div
                  @click="error.properties = false"
                  class="dismiss-alert-button"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="container"
            v-if="!searchBox.selectedData || !searchBox.selectedData.isSearch"
          >
            <div class="row">
              <transition name="fade" mode="out-in">
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
                              data.iri.startsWith(uriSpace) &&
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
                              :class="{
                                informative:
                                  data.maturityLevel.label === 'Informative',
                              }"
                              role="alert"
                              v-if="
                                data.maturityLevel.label === 'Informative' ||
                                data.maturityLevel.label === 'Provisional' ||
                                data.maturityLevel.label === 'Preliminary'
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
                              data.maturityLevel.label === 'Informative' ||
                              data.maturityLevel.label === 'Provisional' ||
                              data.maturityLevel.label === 'Preliminary' ||
                              data.deprecated
                            "
                            class="clearfix"
                          ></div>

                          <!-- header item title -->
                          <h5
                            class="card-title"
                            :class="{
                              'maturity-provisional':
                                this.data.maturityLevel.label ===
                                  'Provisional' ||
                                this.data.maturityLevel.label === 'Preliminary',
                              'maturity-informative':
                                this.data.maturityLevel.label === 'Informative',
                              'maturity-production':
                                this.data.maturityLevel.label === 'Release',
                              'maturity-mixed':
                                this.data.maturityLevel.label === 'Mixed',
                            }"
                          >
                            {{ data.label }}
                          </h5>

                          <div class="clearfix"></div>

                          <h6 class="card-subtitle data-iri" v-if="data.iri">
                            {{ data.iri }}
                          </h6>
                          <div class="url-buttons-container">
                            <CopyButton
                              :copyContent="data.iri"
                              :text="'Copy IRI'"
                            />
                          </div>
                          <h6
                            class="card-subtitle data-iri"
                            v-if="
                              this.$route.query &&
                              this.$route.query.version &&
                              data.iri &&
                              data.iri.startsWith(uriSpace)
                            "
                          >
                            {{
                              this.uriSpace +
                              this.$route.query.version +
                              "/" +
                              data.iri.replace(this.uriSpace, "")
                            }}
                          </h6>
                          <div
                            class="url-buttons-container"
                            v-if="
                              this.$route.query &&
                              this.$route.query.version &&
                              data.iri.startsWith(uriSpace)
                            "
                          >
                            <CopyButton
                              :copyContent="
                                this.uriSpace +
                                this.$route.query.version +
                                '/' +
                                data.iri.replace(this.uriSpace, '')
                              "
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
                        data.iri.startsWith(this.uriSpace)
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
                        <div class="card-body" ref="dataGraph" v-if="hasGraph">
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
                            <GraphVisualization :data="data" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- NO DATA (How to use) -->
                <div
                  v-else-if="
                    !loader &&
                    !searchBox.isLoadingResults &&
                    !error.entityNotFound
                  "
                >
                  <article class="how-to-article">
                    <section class="header-section">
                      <h1>How to use {{ ontologyNameUppercase }} Viewer</h1>
                      <p class="big muted">
                        To start using {{ ontologyNameUppercase }} Viewer,
                        search for interesting concepts by walking through the
                        {{ ontologyNameUppercase }} directory structure on the
                        left-hand side or use the full-text search function.
                      </p>
                    </section>

                    <section v-if="hasVersions" class="blank versions-section">
                      <img class="article-icon" src="@/assets/img/clock.svg" />
                      <h2>{{ ontologyNameUppercase }} Versions</h2>
                      <p class="big muted">
                        {{ ontologyNameUppercase }} Viewer allows for browsing
                        the past versions of {{ ontologyNameUppercase }}.
                      </p>
                      <p>
                        It also helps developers to see the changes proposed to
                        {{ ontologyNameUppercase }} in pull requests before
                        their approval. To see the content of the past
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
                        {{ ontologyNameUppercase }} is a set of ontologies. It
                        is organized in a hierarchical directory structure.
                      </p>
                      <p>
                        Top-level directories are called domains; beneath that
                        may be one or two levels of sub-domain and then modules
                        and dozens of ontologies at the bottom level.
                      </p>
                    </section>

                    <section class="blank maturity-section">
                      <img
                        class="article-icon"
                        src="@/assets/img/maturity.svg"
                      />
                      <h2>{{ ontologyNameUppercase }} maturity levels</h2>
                      <p class="big muted">
                        Each {{ ontologyNameUppercase }} ontology has one of
                        three levels of maturity.
                      </p>
                      <h3>Release</h3>
                      <p>
                        Release ontologies are ones that are considered to be
                        stable and mature from a development perspective.
                      </p>
                      <h3>Provisional</h3>
                      <p>
                        Provisional ontologies are ones that are considered to
                        be under development.
                      </p>
                      <h3>Informative</h3>
                      <p>
                        Provisional ontologies are ones that are considered
                        deprecated but included for informational purposes
                        because they are referenced by some provisional concept.
                      </p>
                    </section>

                    <section class="blank colours-section">
                      <h2>Colours</h2>
                      <p class="big muted">
                        {{ ontologyNameUppercase }} Viewer uses colours to
                        indicate the status of an ontology. Each ontology is
                        either green or yellow.
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
                          Domains or modules are yellow if they contain only
                          yellow ontologies.
                        </p>
                      </div>

                      <div class="color-container">
                        <img
                          class="article-icon--small"
                          src="@/assets/icons/informative-maturity.svg"
                        />
                        <p>
                          Orange circle icon means that it's informative.
                          Domains or modules are yellow if they contain only
                          orange ontologies.
                        </p>
                      </div>

                      <div class="color-container">
                        <img
                          class="article-icon--small"
                          src="@/assets/icons/mixed-maturity.svg"
                        />
                        <p>
                          Mixed, green-yellow-orange icon means domains or
                          modules include both green, yellow and orange
                          ontologies.
                        </p>
                      </div>
                    </section>

                    <section class="about-section">
                      <p class="title muted">
                        About {{ ontologyNameUppercase }} Viewer
                      </p>
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

                <div
                  v-else-if="!loader && error.entityNotFound"
                  class="not-found"
                >
                  <article>
                    <section class="blank not-found-header">
                      <p class="big-sign">404</p>
                      <p class="big muted">Entity not found</p>
                      <p class="muted">
                        The entity you are looking for does not exist. Please
                        try again.
                      </p>
                    </section>

                    <section>
                      <h2>Tips</h2>
                      <p>
                        Try using search box or modules tree to find ontology
                        resources.
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
import { mapState, mapActions } from "vuex";
import {
  getEntity,
  getModules,
  getOntologyVersions,
  getFindSearch,
  getFindProperties,
} from "../api/ontology";
import { prepareDescription } from "../helpers/meta";
export default {
  name: "OntologyView",
  props: ["ontology"],
  key: "ontology",
  scrollToTop: false,
  async validate({ params }) {
    return params.pathMatch.startsWith("ontology");
  },
  data() {
    return {
      title: "Ontology Viewer",
      description: "",
      loader: this.loader || false,
      data: this.data || null,
      query: this.query || "",
      modulesList: this.modulesList || null,
      error: this.error || {
        versions: false,
        modules: false,
        properties: false,
        search: false,
        entityData: false,
        entityNotFound: false,
      },
      searchBox: this.searchBox || {
        inputValue: "",
        selectedData: null,
        hintsData: [], // search box hints
        totalResultsCount: 0,
        fromCount: 0,
        toCount: 0,
        pageResults: [], // search results data
        isLoading: false,
        isAdvancedExpanded: false,
        lastSearchBQuery: null, // contains last searchBQuery used
        page: 1,
        perPage: 0,
        findPropertiesAll: [],
        findProperties: [],
        encodedProperties: "",
        useHighlighting: true,
        dropdownActive: false,
      },
      ontologyVersionsDropdownData: this.ontologyVersionsDropdownData || {
        defaultData: {
          "@id": "current",
          url: "",
        },
        selectedData: null,
        data: [],
        isLoading: false,
      },
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.description,
        },
      ],
    };
  },
  mounted() {
    let queryParam = "";

    const pathParams = this.$route.params?.pathMatch?.split("/");
    if (pathParams && pathParams[1]?.length > 0) {
      const fullPath = window.location.pathname;

      const pathPrefix = "ontology/";
      const index = fullPath.indexOf(pathPrefix);
      const length = pathPrefix.length;

      const ontologyQuery = fullPath.slice(index + length);
      queryParam = `${this.uriSpace}${ontologyQuery}`;
    } else if (this.$route.query && this.$route.query.query) {
      queryParam =
        encodeURIComponent(this.$route.query.query) +
          encodeURIComponent(this.$route.hash) || "";
    }
    this.query = queryParam;

    this.updateServers({ route: this.$route });
    this.fetchData(this.query);
    this.fetchModules();
    this.fetchVersions();
    this.fetchSearchProperties();

    // disable input autocomplete in multiselect
    this.$refs.searchBoxInputMobile.$refs.search.setAttribute(
      "autocomplete",
      "off"
    );
    this.$refs.searchBoxInputDesktop.$refs.search.setAttribute(
      "autocomplete",
      "off"
    );

    const scrollTopElement = this.$refs["article-top-element"];
    if (!this.query) {
      scrollTopElement.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      this.scrollToOntologyViewerTopOfContainer();
    }
    if (this.$route.query.search) {
      this.clearSearchResults();
      const searchQuery = decodeURI(this.$route.query.search);
      this.searchBox.inputValue = searchQuery;
      this.$refs.searchBoxInputDesktop.search = searchQuery;
      this.$refs.searchBoxInputMobile.search = searchQuery;
      const page = this.$route.query.page;
      this.handleSearchBoxQuery(searchQuery, page);
    }
  },
  methods: {
    ...mapActions({
      updateServers: "servers/updateServers",
    }),
    async fetchData(iri) {
      if (iri) {
        this.scrollToOntologyViewerTopOfContainer();
        this.loader = true;
        this.data = null;
        try {
          const query = `${this.ontologyServer}?iri=${iri}`;
          const result = await getEntity(query);
          const body = await result.json();
          if (body.type !== "details") {
            console.error(`body.type: ${body.type}, expected: details`);
          }

          if (body.result.properties["Glossary"]) {
            //check is title or label exist and set it to title page
            if (
              body.result.properties["Glossary"].title &&
              body.result.properties["Glossary"].title[0]
            ) {
              this.title = body.result.properties["Glossary"].title[0].value;
            } else if (
              body.result.properties["Glossary"].label &&
              body.result.properties["Glossary"].label[0]
            ) {
              this.title = body.result.properties["Glossary"].label[0].value;
            }
            //check is abstract or definition exist and set it to description
            if (
              body.result.properties["Glossary"].abstract &&
              body.result.properties["Glossary"].abstract[0]
            ) {
              this.description = prepareDescription(
                body.result.properties["Glossary"].abstract[0].value
              );
            } else if (
              body.result.properties["Glossary"].definition &&
              body.result.properties["Glossary"].definition[0]
            ) {
              this.description = prepareDescription(
                body.result.properties["Glossary"].definition[0].value
              );
            }
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
          this.error.entityData = false;
          this.error.entityNotFound = false;
        } catch (err) {
          console.error(err.message);
          this.data = null;
          if (err.status === 404) {
            this.error.entityNotFound = true;
            this.error.entityData = false;
          } else {
            this.error.entityNotFound = false;
            this.error.entityData = true;
          }
        }
        this.loader = false;
        this.scrollToOntologyViewerTopOfContainer();
      }
    },
    async fetchVersions() {
      try {
        const result = await getOntologyVersions(
          `/${this.ontologyName}/ontology/api/`
        );
        const ontologyVersions = await result.json();
        this.ontologyVersionsDropdownData.data = ontologyVersions;
        ontologyVersions.unshift(this.ontologyVersionsDropdownData.defaultData); // add default at the beginning

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
            this.ontologyVersionsDropdownData.defaultData;
        }
        this.error.versions = false;
      } catch (err) {
        console.error(err);
        this.error.versions = true;
      }
    },
    async fetchModules() {
      try {
        const result = await getModules(this.modulesServer);
        this.modulesList = await result.json();
        this.error.modules = false;
      } catch (err) {
        console.error(err);
        this.error.modules = true;
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
        this.error.properties = false;
      } catch (err) {
        console.error(err);
        this.error.properties = true;
      }
    },
    // vue-multiselect ontologyVersions
    ontologyVersions_optionSelected(selectedOntologyVersion /* , id */) {
      if (
        selectedOntologyVersion["@id"] ===
        this.ontologyVersionsDropdownData.defaultData["@id"]
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
      if (this.$refs.mobileSearchbox?.showModal)
        this.$refs.mobileSearchbox.hideModal();
      let destRoute = selectedOption.iri;
      if (destRoute.startsWith(this.uriSpace)) {
        // internal ontology
        destRoute = destRoute.replace(this.uriSpace, "");
        this.$router.push({
          path: `/ontology/${destRoute}`,
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
        if (this.$refs.mobileSearchbox?.showModal)
          this.$refs.mobileSearchbox.hideModal();

        this.$router.push({
          path: "/ontology",
          query: {
            ...{ search: encodeURI(newTag) },
            ...{ page: 1 },
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
          },
        });
      }
    },
    async handleSearchBoxQuery(searchBQuery, page) {
      try {
        this.searchBox.isLoadingResults = true;
        this.error.entityNotFound = false;
        const isHighlighting = this.searchBox.useHighlighting;

        // wait for properties to be loaded if they arent
        while (this.searchBox.findPropertiesAll.length === 0) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (this.searchBox.findProperties.length > 0) {
          this.searchBox.page = page;

          // eslint-disable-next-line max-len
          let domain = encodeURI(
            `${this.searchServer}?term=${searchBQuery}&mode=advance&useHighlighting=${isHighlighting}&findProperties=${this.searchBox.encodedProperties}&page=${page}`
          );

          const result = await getFindSearch(domain);
          const body = await result.json();

          this.searchBox.pageResults = body.results;

          this.searchBox.lastSearchBQuery = searchBQuery;
          this.searchBox.perPage = body.pageSize;

          this.searchBox.totalResultsCount = body.totalHits;

          const from = (page - 1) * body.pageSize + 1;
          const to = from + body.results.length - 1;
          this.searchBox.fromCount = from;
          this.searchBox.toCount = to;

          this.error.search = false;
          this.searchBox.isLoadingResults = false;
        } else {
          this.searchBox.pageResults = [];
        }
      } catch (err) {
        console.error(err);
        this.error.search = true;
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
    paginationHandler() {
      this.$router.push({
        path: "/ontology",
        query: {
          ...{ search: encodeURI(this.searchBox.lastSearchBQuery) },
          ...{ page: this.searchBox.page },
          ...(this.$route.query && this.$route.query.version
            ? { version: encodeURI(this.$route.query.version) }
            : null),
        },
      });
    },
    searchBox_asyncFind(query) {
      this.searchBox.inputValue = query;
      this.searchBox.hintsData = [];

      if (query.trim().length === 0) {
        return;
      }

      this.searchBox.isLoading = true;

      if (this.searchBox.debounce) {
        clearTimeout(this.searchBox.debounce);
      }

      this.searchBox.debounce = setTimeout(async () => {
        try {
          // wait for properties to be loaded if they arent
          while (this.searchBox.findPropertiesAll.length === 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          // eslint-disable-next-line max-len
          let domain = encodeURI(
            `${this.searchServer}?term=${query}&mode=advance&useHighlighting=false&findProperties=${this.searchBox.encodedProperties}`
          );
          const result = await getFindSearch(domain);
          const json = await result.json();
          const hints = json.results;

          hints.forEach((el) => {
            // eslint-disable-next-line no-param-reassign
            el.labelForInternalSearch = `${el.label} `; // this is hacky to make it possible to search text (add tag) the same as the label in hint results
          });

          this.searchBox.hintsData = hints;
          this.error.search = false;
        } catch (err) {
          console.error(err);
          this.error.search = true;
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
    loadMoreResults() {
      this.searchBox.displayedResultsCount += this.searchBox.perPage;
      this.searchBox.displayedResults = this.searchBox.totalResults.slice(
        0,
        this.searchBox.displayedResultsCount
      );
    },
    clearSearchResults() {
      this.searchBox = {
        ...this.searchBox,
        selectedData: null,
        hintsData: [],
        totalResultsCount: 0,
        fromCount: 0,
        toCount: 0,
        pageResults: [], // search results data
        isLoading: false,
        searchError: false,
        isAdvancedExpanded: false,
        lastSearchBQuery: null, // contains last searchBQuery used
        perPage: 10,
      };
    },
    getPropertyLabel(identifier) {
      return this.searchBox.findPropertiesAll.find(
        (property) => property.identifier === identifier
      ).label;
    },
    onPropertiesChanged() {
      const identifiersArray = this.searchBox.findProperties.map(
        (property) => property.identifier
      );
      this.searchBox.encodedProperties = identifiersArray.join(".");

      for (const property of this.searchBox.findPropertiesAll) {
        property.selected = this.searchBox.findProperties.includes(property);
      }
    },
    githubNewIssue() {
      const ontologyQuery = this.data.iri.replace(this.uriSpace, "");
      const label = ontologyQuery.substring(0, ontologyQuery.indexOf("/"));
      const details = {
        label,
        title: `Problem with ${this.data.label.toUpperCase()}`,
        body: `Resource URL:\n${this.data.iri}`,
      };
      const url =
        `${this.ontologyRepositoryUrl}/issues/new` +
        `?labels=${encodeURI(details.label)}` +
        `&template=issue.md` +
        `&title=${encodeURI(details.title)}` +
        `&body=${encodeURI(details.body)}`;

      window.open(url, "_blank");
    },
    howToUseHandler() {
      this.data = null;
      this.error.entityNotFound = false;
      this.searchBox.isLoading = false;
      if (
        this.$route.path != "/ontology" ||
        this.$route.query?.query
      ) {
        this.$router.push({
          path: "/ontology",
          query: {
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
          },
        });
      }

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
    },
  },
  computed: {
    ...mapState({
      // servers
      version: (state) => state.servers.version,
      searchServer: (state) => state.servers.searchServer,
      ontologyServer: (state) => state.servers.ontologyServer,
      modulesServer: (state) => state.servers.modulesServer,
      statsServer: (state) => state.servers.statsServer,
      missingImportsServer: (state) => state.servers.missingImportsServer,
      // configuration
      ontologyName: (state) => state.configuration.ontpubFamily,
      ontologyRepositoryUrl: (state) =>
        state.configuration.ontologyRepositoryUrl,
      uriSpace: (state) => state.configuration.uriSpace,
    }),
    isError() {
      return (
        this.error.versions ||
        this.error.modules ||
        this.error.properties ||
        this.error.search ||
        this.error.entityData ||
        this.error.entityNotFound
      );
    },
    hasVersions() {
      return this.ontologyVersionsDropdownData.data.length > 1;
    },
    hasGraph() {
      return this.data?.graph?.nodes?.length > 1;
    },
    ontologyNameUppercase() {
      return this.ontologyName.toUpperCase();
    },
  },
  beforeRouteUpdate(to, from, next) {
    let previousVersion = this.version;
    this.updateServers({ route: this.$route, to });

    // version just changed
    if (this.version != previousVersion)
      this.fetchModules();

    if (to !== from) {
      let queryParam = "";

      if (to.query?.query) {
        queryParam = to.query.query + to.hash || "";
      } else {
        let destination = to.path.replace("/ontology/", "");
        destination = destination.replace("/ontology", "");
        queryParam = `${this.uriSpace}${destination}`;
      }
      this.query = queryParam;

      if (this.query === this.uriSpace) {
        this.query = "";
        this.data = null;
      } else {
        this.query = encodeURIComponent(this.query);
      }

      this.$nextTick(async function () {
        this.fetchData(this.query);
      });
    }
    if (!to.query.search) {
      this.clearSearchResults();
      this.clearAll();
      this.searchBox.isAdvancedExpanded = false;
    }
    if (to.query.search) {
      this.clearSearchResults();
      const searchQuery = decodeURI(to.query.search);
      this.searchBox.inputValue = searchQuery;
      this.$refs.searchBoxInputDesktop.search = searchQuery;
      this.$refs.searchBoxInputMobile.search = searchQuery;
      const page = to.query.page;
      this.handleSearchBoxQuery(searchQuery, page);
    }
    this.$nextTick(() => {
      if (
        this.$route.path != "/ontology" ||
        this.$route.query?.query
      )
        this.scrollToOntologyViewerTopOfContainer();
    });
    next();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
