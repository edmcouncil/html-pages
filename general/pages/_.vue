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
                    </multiselect>
                  </div>
                  <div class="menu-box__icons">
                    <div class="menu-box__icons__icon icon-clock"></div>
                  </div>
                </div>
                <transition name="comparedropdown" mode="out-in">
                  <div
                    v-show="versionCompare.isCompareExpanded"
                    class="compare-dropdown-wrapper"
                  >
                    <div class="compare-icon" @click="swapSelectedVersions()"></div>
                    <div class="menu-box">
                      <div class="menu-box__label">Compare with...</div>
                      <div class="menu-box__content-text">
                        <multiselect
                          v-model="versionCompare.selectedCompareData"
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
                          @select="ontologyVersions_compareOptionSelected"
                        >
                          <template v-slot:tag="{ option }">
                            <span class="custom__tag">
                              <span>{{ option.label }}</span>
                            </span>
                          </template>
                        </multiselect>
                      </div>
                      <div class="menu-box__icons">
                        <div class="menu-box__icons__icon icon-clock"></div>
                      </div>
                    </div>
                  </div>
                </transition>
                <CompareButton @compareToggled="compareButtonHandler" />
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
                <ModuleTree
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

          <!-- errors -->
          <Errors :error="error" />

          <div
            class="text-center mt-5"
            v-if="
              !isError &&
              (loader || searchBox.isLoadingResults || (!modulesList && !data))
            "
          >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div style="margin-bottom: 100vh"></div>
          </div>

          <!-- search results -->
          <SearchResults
            v-else-if="searchBox.selectedData && searchBox.selectedData.isSearch"
            :searchBox="searchBox"
          />

          <div
            class="container"
            v-else-if="!searchBox.selectedData || !searchBox.selectedData.isSearch"
          >
            <div class="row">
                <!-- SHOW ITEM -->
                <Resource
                  v-if="isComparing ? mergedData : data"
                  :data="isComparing ? mergedData : data"
                  :isComparing="isComparing"
                  :version="version"
                />

                <!-- NO DATA (How to use) -->
                <HowToUse
                  v-else-if="
                    !loader &&
                    !searchBox.isLoadingResults &&
                    !error.entityNotFound
                  "
                  :hasVersions="hasVersions"
                  :ontologyNameUppercase="ontologyNameUppercase"
                />

                <EntityNotFound v-else-if="!loader && !isComparing && error.entityNotFound" />
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
import {
  generateTitleAndDescription,
  handleDeprecatedResource,
} from "../helpers/ontology";
import { mergeData } from "../helpers/compare";
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
      mergedData: this.mergedData || null,
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
        isLoading: false,
        defaultData: {
          "@id": "current",
          url: "",
        },
        data: [],
        selectedData: null,
      },
      versionCompare: this.versionCompare || {
        isCompareExpanded: false,
        compareData: [],
        selectedCompareData: null,
        isSwappingVersion: false,
      }
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
      updateCompareServers: "servers/updateCompareServers",
    }),
    async fetchData(iri, options) {
      const noScroll = options?.noScroll;
      if (iri) {
        if (!noScroll)
          this.scrollToOntologyViewerTopOfContainer();
        this.loader = true;
        this.data = null;
        this.mergedData = null;
        try {
          const query = `${this.ontologyServer}?iri=${iri}`;
          const result = await getEntity(query);
          const body = await result.json();
          if (body.type !== "details") {
            console.error(`body.type: ${body.type}, expected: details`);
          }

          let { title, description } = generateTitleAndDescription(body);
          this.title = title || this.title;
          this.description = description || this.description;

          handleDeprecatedResource(body);

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

        if (!noScroll)
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

        // apply default branch name from configuration
        if (this.defaultBranchName) {
          this.ontologyVersionsDropdownData.defaultData['@id'] = this.defaultBranchName;
        }

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
        if (this.compareVersion !== null) {
          this.versionCompare.selectedCompareData =
            ontologyVersions.find((val) => {
              if (val["@id"] === this.compareVersion) {
                return true;
              }
              return false;
            });
        } else {
          this.versionCompare.selectedCompareData =
            this.ontologyVersionsDropdownData.defaultData;
        }
        this.error.versions = false;
      } catch (err) {
        console.error(err);
        this.error.versions = true;
      }
    },
    async fetchModules() {
      this.modulesList = null;
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
    async fetchCompareDataAndMerge(iri) {
      if (!iri) {
        return;
      }

      this.loader = true;
      this.data = null;
      this.mergedData = null;
      let data1 = null;
      let data2 = null;
      let savedData = null;

      const promises = [
        getEntity(`${this.ontologyServer}?iri=${iri}`),
        getEntity(`${this.ontologyServerCompare}?iri=${iri}`)
      ];

      const results = await Promise.allSettled(promises);

      // get data 1
      try {
        const result1 = results[0];
        if (result1.status == `rejected`) {
          const error = new Error(result1.reason.message);
          error.status = result1.reason.status;
          throw error;
        }
        const body = await result1.value.json();
        if (body.type !== "details") {
          console.error(`body.type: ${body.type}, expected: details`);
        }

        let { title, description } = generateTitleAndDescription(body);
        this.title = title || this.title;
        this.description = description || this.description;

        handleDeprecatedResource(body);

        data1 = body.result;
        savedData = data1;
        this.error.entityNotFound = false;
      } catch (err) {
        if (err.status === 404) {
          data1 = {
            label: "Resource not Found",
            iri: "",
            maturityLevel: {}
          }
          this.error.entityNotFound = true;
        } else {
          data1 = {
            label: "Error fetching data",
            iri: "",
            maturityLevel: {}
          }
        }
      }

      // get data 2
      try {
        const result2 = results[1];
        if (result2.status == `rejected`) {
          const error = new Error(result2.reason.message);
          error.status = result2.reason.status;
          throw error;
        }
        const body = await result2.value.json();

        if (body.type !== "details") {
          console.error(`body.type: ${body.type}, expected: details`);
        }

        handleDeprecatedResource(body);

        data2 = body.result;
      } catch (err) {
        if (err.status === 404) {
          // handle compare resource not found
          data2 = {
            label: "Resource not Found",
            iri: "",
            maturityLevel: {}
          }
        } else {
          data2 = {
            label: "Error fetching data",
            iri: "",
            maturityLevel: {}
          }
        }
      }

      this.error.entityData = false;

      // merge data 1 and 2
      let mergedData = mergeData(data1, data2);

      this.mergedData = mergedData;

      this.loader = false;
      this.data = savedData;
      this.scrollToOntologyViewerTopOfContainer("smooth");
    },
    // vue-multiselect ontologyVersions
    ontologyVersions_optionSelected(selectedOntologyVersion) {
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
    ontologyVersions_compareOptionSelected(selectedOntologyVersion) {
      if (selectedOntologyVersion["@id"] &&
        selectedOntologyVersion["@id"]
        != this.ontologyVersionsDropdownData.selectedData["@id"] &&
        selectedOntologyVersion["@id"] !==
        this.ontologyVersionsDropdownData.defaultData["@id"]) {
        this.updateCompareServers({ compareVersion: selectedOntologyVersion["@id"] });
        this.fetchCompareDataAndMerge(this.query);
      }
      else if (
        selectedOntologyVersion["@id"] ===
        this.ontologyVersionsDropdownData.defaultData["@id"]
      )
      {
        this.updateCompareServers({ compareVersion: null });
        this.fetchCompareDataAndMerge(this.query);
      } else {
        this.updateCompareServers({ compareVersion: selectedOntologyVersion["@id"] });
        this.fetchData(this.query, { noScroll: true })
      }
    },
    swapSelectedVersions() {
      if (this.loader)
        return;

      let version = this.ontologyVersionsDropdownData.selectedData;
      let versionCompare = this.versionCompare.selectedCompareData;

      this.ontologyVersionsDropdownData.selectedData = versionCompare;
      this.versionCompare.selectedCompareData = version;

      if (version["@id"] != this.ontologyVersionsDropdownData.defaultData["@id"])
        this.updateCompareServers({ compareVersion: version["@id"] });
      else
        this.updateCompareServers({ compareVersion: null });

      this.ontologyVersions_optionSelected(versionCompare);

      // for scroll behavior management purposes
      this.versionCompare.isSwappingVersion = true;
    },
    compareButtonHandler(isCompareExpanded) {
      this.versionCompare.isCompareExpanded = isCompareExpanded;
      if (
        isCompareExpanded &&
        this.versionCompare.selectedCompareData &&
        this.versionCompare.selectedCompareData["@id"]
        != this.ontologyVersionsDropdownData.selectedData["@id"]
      )
      {
        this.fetchCompareDataAndMerge(this.query);
      }
      else if (!isCompareExpanded && this.data == null)
        this.fetchData(this.query, { noScroll: true })
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
        this.scrollToOntologyViewerTopOfContainer();
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
      this.scrollToOntologyViewerTopOfContainer();
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
    onPropertiesChanged() {
      const identifiersArray = this.searchBox.findProperties.map(
        (property) => property.identifier
      );
      this.searchBox.encodedProperties = identifiersArray.join(".");

      for (const property of this.searchBox.findPropertiesAll) {
        property.selected = this.searchBox.findProperties.includes(property);
      }
    },
    howToUseHandler() {
      this.data = null;
      this.mergedData = null;
      this.error.entityNotFound = false;
      this.searchBox.isLoading = false;
      if (
        this.$route.path != "/ontology" ||
        this.$route.query?.query ||
        this.$route.query?.search
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
      ontologyServerCompare: (state) => state.servers.ontologyServerCompare,
      // configuration
      ontologyName: (state) => state.configuration.config.ontpubFamily,
      ontologyRepositoryUrl: (state) =>
        state.configuration.config.ontologyRepositoryUrl,
      uriSpace: (state) => state.configuration.config.uriSpace,
      defaultBranchName: (state) => state.configuration.config.defaultBranchName,
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
    isComparing() {
      return (
        this.versionCompare.isCompareExpanded &&
        this.versionCompare.selectedCompareData &&
        this.versionCompare.selectedCompareData["@id"]
        != this.ontologyVersionsDropdownData.selectedData["@id"]
      );
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
        if (this.isComparing)
          this.fetchCompareDataAndMerge(this.query);
        else
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
        (this.$route.path != "/ontology" ||
        this.$route.query?.query) &&
        !this.versionCompare.isSwappingVersion
      )
        this.scrollToOntologyViewerTopOfContainer();

      this.versionCompare.isSwappingVersion = false;
    });
    next();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
