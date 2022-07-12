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
              <h5 class="fibo-title-modules">AUTO Viewer</h5>
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
            class="
              secondary-column__tree
              multiselect-xxl-container multiselect-container
              container
            "
          >
            <div class="menu-box">
              <div class="menu-box__label">Browse AUTO domains</div>
              <div class="menu-box__content-text">AUTO Domains</div>
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

          <Stats
            :statsServer="statsServer"
            :missingImportsServer="missingImportsServer"
          />
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
                    <div class="menu-box__label">Search AUTO</div>
                    <div class="menu-box__content-text">
                      <multiselect
                        v-model="searchBox.selectedData"
                        id="ajax2"
                        label="labelForInternalSearch"
                        track-by="iri"
                        placeholder="Find domains, ontologies, concepts..."
                        tagPlaceholder="Search..."
                        selectLabel="x"
                        open-direction="bottom"
                        ref="searchBoxInput"
                        spellcheck="false"
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
                            Oops! No elements found. Consider changing the search query.
                          </span>
                        </template>
                      </multiselect>
                    </div>
                    <div class="menu-box__icons">
                      <div
                        class="menu-box__icons__icon icon-search-triangle-down"
                      ></div>
                    </div>
                  </div>
                  <!-- <pre class="language-json"><code>{{ searchBox.selectedData }}</code></pre> -->
                  <!-- <pre class="language-json"><code>{{ searchBox.data }}</code></pre> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container px-0">
          <div
            class="
              secondary-column__how-to-use
              secondary-column__how-to-use--mobile
              multiselect-xxl-container multiselect-container
              container
              d-lg-none
            "
          >
            <div class="row modules-header">
              <h5 class="fibo-title-modules">AUTO Viewer</h5>
              <button
                type="button"
                class="btn normal-button button-small"
                @click="howToUseHandler()"
              >
                How to use
              </button>
            </div>
          </div>

          <!-- search box mobile -->
          <div
            class="
              search-box search-box--mobile
              d-lg-none
              multiselect-container
            "
          >
            <div class="menu-box">
              <div class="menu-box__label">Search Auto</div>
              <div class="menu-box__content-text">
                <multiselect
                  v-model="searchBox.selectedData"
                  id="ajax"
                  label="labelForInternalSearch"
                  track-by="iri"
                  placeholder="Find..."
                  tagPlaceholder="Search..."
                  selectLabel="x"
                  open-direction="bottom"
                  ref="searchBoxInput"
                  spellcheck="false"
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
                      Oops! No elements found. Consider changing the search query.
                    </span>
                  </template>
                </multiselect>
              </div>
              <div class="menu-box__icons">
                <div
                  class="menu-box__icons__icon icon-search-triangle-down"
                ></div>
              </div>
            </div>
          </div>

          <!-- tree mobile -->
          <div
            class="
              secondary-column__tree secondary-column__tree--mobile
              multiselect-container
              container
              d-lg-none
            "
          >
            <div class="menu-box" v-on:click="toggleModuleTree()">
              <div class="menu-box__label">Browse AUTO domains</div>
              <div class="menu-box__content-text">AUTO Domains</div>
              <div class="menu-box__icons">
                <div class="menu-box__icons__icon icon-directory"></div>
              </div>
            </div>
          </div>

          <ul v-if="display_modules" class="modules-list list-unstyled d-lg-none">
            <module-tree
              :item="item"
              v-for="item in modulesList"
              :location="data"
              :key="item.label"
            />
          </ul>
          <div class="text-center" v-if="!modulesList && !error">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        <a
          name="ontologyViewerTopOfContainer"
          id="ontologyViewerTopOfContainer"
        ></a>

        <div class="row" v-if="loader">
          <div class="col-12">
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="error">
          <div class="col-12">
            <div class="alert alert-danger alert-error" role="alert">
              <strong>Error!</strong> Cannot fetch data, please try later.
            </div>
          </div>
        </div>

        <!-- search results -->
        <div
          class="search-section"
          v-if="searchBox.selectedData && searchBox.selectedData.isSearch"
        >
          <div class="search-section__header">
            <h5>Search results for “{{ searchBox.selectedData.iri }}”</h5>
            <p>{{ searchBox.totalResults.length }} results</p>
          </div>

          <div
            v-if="
              searchBox.displayedResults && searchBox.displayedResults.length
            "
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
                      'maturity-release': result.maturityLevel.icon === 'prod',
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
                  <!-- {{ result.iri }} -->
                  <customLink
                    class="custom-link"
                    :name="result.iri"
                    :query="result.iri"
                    :customLinkOnClick="searchResultClicked"
                  ></customLink>
                </div>

                <p>
                  {{ result.description }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <!-- No results -->
          </div>

          <div
            class="search-section__load-more"
            v-if="searchBox.totalResults.length > 0"
          >
            <p>
              1 -
              {{ searchBox.displayedResults.length }}
              of {{ searchBox.totalResults.length }}
            </p>

            <button
              type="button"
              class="btn normal-button search-section__load-more__button"
              @click="loadMoreResults()"
              v-if="
                searchBox.totalResults.length >
                searchBox.displayedResults.length
              "
            >
              Load next
              {{
                searchBox.perPage >
                searchBox.totalResults.length -
                  searchBox.displayedResults.length
                  ? searchBox.totalResults.length -
                    searchBox.displayedResults.length
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

        <div class="container" v-else>
          <div class="row">
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
                          !data.iri.startsWith('http://') &&
                          !(this.$route.query && this.$route.query.version)
                        "
                        @click="githubNewIssue()"
                      >
                        Report a problem
                      </button>

                      <!-- maturity alert -->
                      <div
                        class="alert alert-primary alert-maturity"
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

                      <div
                        v-if="
                          data.maturityLevel.label === 'INFORMATIVE' ||
                          data.maturityLevel.label === 'PROVISIONAL'
                        "
                        class="clearfix"
                      ></div>

                      <!-- header item title -->
                      <h5
                        class="card-title"
                        :class="{
                          'maturity-provisional':
                            this.data.maturityLevel.label === 'PROVISIONAL' ||
                            this.data.maturityLevel.label === 'INFORMATIVE',
                          'maturity-production': this.data.maturityLevel.label === 'RELEASE',
                          'maturity-mixed': this.data.maturityLevel.label === 'MIXED',
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
                      <label
                        class="custom-control-label-prev"
                        for="paths-switch"
                      >
                        Paths
                      </label>
                      <label class="custom-control-label" for="paths-switch">
                        Tree
                      </label>
                    </div>

                    <transition
                      @enter="checkPathsOverflow"
                      name="fade"
                      mode="out-in"
                    >
                      <div
                        key="path-view"
                        class="ontology-item__paths__path-view"
                        v-if="!pathsSection.isTreeView"
                      >
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
                                  v-if="
                                    index != Object.keys(taxonomy).length - 1
                                  "
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
                      <div
                        key="tree-view"
                        class="ontology-item__paths__tree-view"
                        v-else
                      >
                        <ul class="ontology-item__paths__tree-view__root">
                          <paths-tree
                            v-for="(child, index) in pathsSection.treeView"
                            :key="child.label"
                            :item="child"
                            :isLast="index == pathsSection.treeView.length - 1"
                            :isOnly="pathsSection.treeView.length === 1"
                            :isRoot="true"
                          />
                        </ul>
                      </div>
                    </transition>
                  </div>
                </div>

                <!-- ontology download -->
                <div
                  class="col-12 px-0"
                  v-if="
                    data.iri.slice(-1) === '/' &&
                    data.iri.startsWith(
                      'https://spec.edmcouncil.org/auto/ontology/'
                    )
                  "
                >
                  <DownloadSection :data="data" :version="version" />
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
              v-else-if="!loader && !searchBox.isLoadingResults"
            >
              <article class="how-to-article">
                <section>
                  <h2>How to use AUTO Viewer</h2>
                  <p class="muted">
                    To start using AUTO Viewer, search for interesting concepts
                    by walking through the AUTO directory structure on the
                    left-hand side or use the full-text search function.
                  </p>
                </section>

                <section class="blank">
                  <img class="article-icon" src="@/assets/img/clock.svg" />
                  <h3>AUTO Versions</h3>
                  <p>
                    AUTO Viewer allows for browsing the past versions of AUTO.
                  </p>
                  <p class="small muted">
                    It also helps developers to see the changes proposed to AUTO
                    in pull requests before their approval. To see the content
                    of the past AUTO releases or recent pull requests, choose
                    them from the drop-down list.
                  </p>
                </section>

                <section class="blank">
                  <img class="article-icon" src="@/assets/img/directory.svg"/>
                  <h3>AUTO structure</h3>
                  <p>
                    AUTO is a set of ontologies. It is organized in a
                    hierarchical directory structure.
                  </p>
                  <p class="small muted">
                    Top-level directories are called domains; beneath that may
                    be one or two levels of sub-domain and then modules and
                    dozens of ontologies at the bottom level, e.g.:
                  </p>
                  <p class="small muted">
                    On the left-hand side, there is a list of eleven AUTO
                    Domains, starting with the Business Entities at the top and
                    ending with Securities at the bottom.
                  </p>
                </section>

                <section class="blank">
                  <img class="article-icon" src="@/assets/img/maturity.svg"
                  />
                  <h3>AUTO maturity levels</h3>
                  <p>
                    Each AUTO ontology has one of three levels of maturity.
                  </p>
                  <p class="small muted title">
                    Release
                  </p>
                  <p class="small muted">
                    Release ontologies are ones that are considered to be stable
                    and mature from a development perspective.
                  </p>
                  <p class="small muted title">
                    Provisional
                  </p>
                  <p class="small muted">
                    Provisional ontologies are ones that are considered to be
                    under development.
                  </p>
                  <p class="small muted title">
                    Informative
                  </p>
                  <p class="small muted">
                    Provisional ontologies are ones that are considered
                    deprecated but included for informational purposes because
                    they are referenced by some provisional concept.
                  </p>
                </section>

                <section class="blank">
                  <h3>Colours</h3>
                  <p class="paragraph--regular">
                    AUTO Viewer uses colours to indicate the status of an
                    ontology. Each ontology is either green or yellow.
                  </p>
                  <div class="color-container">
                    <img
                    class="article-icon--small"
                    src="@/assets/icons/production-maturity.svg"
                    />
                    <p class="small muted">
                      The green square icon indicates that an ontology has a
                      "release" maturity level. Domains or modules are green if
                      they contain only green ontologies.
                    </p>
                  </div>

                  <div class="color-container">
                    <img
                    class="article-icon--small"
                    src="@/assets/icons/provisional-maturity.svg"
                    />
                    <p class="small muted">
                      Yellow square icon means that it provisional or informative.
                      Domains or modules are yellow if they contain only yellow
                      ontologies.
                    </p>
                  </div>

                  <div class="color-container">
                    <img
                    class="article-icon--small"
                    src="@/assets/icons/mixed-maturity.svg"
                    />
                    <p class="small muted">
                      Mixed, green-yellow icon means domains or modules include
                      both green and yellow ontologies.
                    </p>
                  </div>
                </section>

                <section>
                  <h2>
                    About AUTO Viewer
                  </h2>
                  <p class="small muted">
                    AUTO Viewer is a JAVA application that is specifically
                    designed to access both the AUTO structure and its content
                    in the easiest possible way. It can serve both as a web
                    application and REST API. AUTO Viewer is an open-source
                    project that EDM Council hosts. See
                    https://github.com/edmcouncil/onto-viewer for details.
                  </p>
                </section>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect';
import {
  getEntity, getFindSearch, getModules, getHint,
} from '../api/ontology';

export default {
  name: 'OntologyView',
  components: {
    VisNetwork: () => import(/* webpackChunkName: "ANY_URI" */ '../components/VisNetwork'),
    PathsTree: () => import(/* webpackChunkName: "PathsTree" */ "../components/PathsTree"),
    Stats: () => import(/* webpackChunkName: "Stats" */ "../components/StatsComponent"),
    ResourceSection: () => import(/* webpackChunkName: "ResourceSection" */ "../components/Ontology/ResourceSection"),
    DownloadSection: () => import(/* webpackChunkName: "DownloadSection" */ "../components/Ontology/DownloadSection"),
    Multiselect,
  },
  props: ['ontology'],
  data() {
    return {
      display_modules: false,
      pathsSection: {
        treeView: [],
        isTreeView: false,
        isPathsMoreVisible: false,
        hasOverflow: [],
      },
      mountedTimestamp: null,
      loader: false,
      data: null,
      query: '',
      ontologyServer: null,
      searchServer: null,
      modulesServer: null,
      hintServer: null,
      statsServer: null,
      missingImportsServer: null,
      hintDefaultDomain: '/auto/ontology/{version}api/hint/',
      version: null,
      versionDefaultSelectedData: {
        '@id': 'stable',
        url: '',
      },
      modulesList: null,
      error: false,
      searchBox: {
        selectedData: null,
        data: [],
        totalData: [],
        isLoading: false,
        totalResults: [],
        displayedResults: [],
        lastSearchBQuery: null, // contains last searchBQuery used. This prop. is handler for pagination
        perPage: 10,
        isLoadingMore: false,
      },
      ontologyVersionsDropdownData: {
        selectedData: null,
        data: [],
        isLoading: false,
      }
    };
  },
  mounted() {
    let queryParam = '';
    this.mountedTimestamp = Math.floor(Date.now() / 1000);

    if (this.$route.params && this.$route.params[1]) {
      const ontologyQuery = window.location.pathname.replace('/auto/ontology/', '');
      queryParam = `https://spec.edmcouncil.org/auto/ontology/${ontologyQuery}`;
    } else if (this.$route.query && this.$route.query.query) {
      queryParam = encodeURIComponent(this.$route.query.query)+encodeURIComponent(this.$route.hash) || "";
    }

    // check for taxonomy paths overflow in mobile view with debounce
    let timeoutCheckPathsOverflow = false;
    window.addEventListener('resize', () => {
      clearTimeout(timeoutCheckPathsOverflow);
      timeoutCheckPathsOverflow = setTimeout(this.checkPathsOverflow, 300);
    });

    if (localStorage.isTreeView && localStorage.isTreeView === "true") {
      this.pathsSection.isTreeView = true;
    }

    this.updateServers();

    this.query = queryParam;
    this.fetchData(this.query);
    this.fetchModules();
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

      this.searchServer = this.searchDefaultDomain;

      if (internalRoute.query && internalRoute.query.domain) {
        this.ontologyServer = internalRoute.query.domain;
        this.statsServer = internalRoute.query.domain;
        this.missingImportsServer = internalRoute.query.domain;
      } else {
        this.ontologyServer = this.ontologyDefaultDomain;
        this.statsServer = this.statsDefaultDomain;
        this.missingImportsServer = this.missingImportsDefaultDomain;
      }

      if (internalRoute.query && internalRoute.query.modules) {
        this.modulesServer = internalRoute.query.modules;
      } else {
        this.modulesServer = this.modulesDefaultDomain;
      }

      if (internalRoute.query && internalRoute.query.version) {
        this.ontologyServer = this.ontologyServer.replace('{version}', `${internalRoute.query.version}/`);
        this.modulesServer = this.modulesServer.replace('{version}', `${internalRoute.query.version}/`);
        this.hintServer = this.hintDefaultDomain.replace('{version}', `${internalRoute.query.version}/`);
        this.version = internalRoute.query.version;
      } else {
        this.ontologyServer = this.ontologyServer.replace('{version}', '');
        this.modulesServer = this.modulesServer.replace('{version}', '');
        this.hintServer = this.hintDefaultDomain.replace('{version}', '');
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
          if (body.type !== 'details') {
            console.error(`body.type: ${body.type}, expected: details`);
          }

           // check if resource is deprecated
          if (
            body.result.properties["Ontological characteristic"] &&
            body.result.properties["Ontological characteristic"].deprecated &&
            body.result.properties["Ontological characteristic"].deprecated[0].value === "true"
          ) {
            body.result.deprecated = true;
            delete body.result.properties["Ontological characteristic"].deprecated;
            if (Object.keys(body.result.properties["Ontological characteristic"]).length === 0) {
              delete body.result.properties["Ontological characteristic"];
            }
          } else {
            body.result.deprecated = false;
          }

          this.data = body.result;

          if (this.data.taxonomy && this.data.taxonomy.value) {
            this.pathsSection.treeView = [];
            let tempTaxonomy = JSON.parse(JSON.stringify(this.data.taxonomy.value));
            tempTaxonomy.forEach((element) => {
              this.getTreeFromList(element, this.pathsSection.treeView);
            });
          }

          this.error = false;
        } catch (err) {
          console.error(err);
          this.error = true;
        }
        this.pathsSection.hasOverflow = [];
        this.loader = false;
        this.isPathsMoreVisible = false;
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

    // vue-multiselect
    searchBox_limitText(count) {
      return `and ${count} other results`;
    },
    searchBox_optionSelected(selectedOption /* , id */) {
      let destRoute = selectedOption.iri;
      if (destRoute.startsWith('https://spec.edmcouncil.org/auto')) {
        // internal ontology
        destRoute = destRoute.replace('https://spec.edmcouncil.org/auto', '');
        this.$router.push({
          path: destRoute,
          query: {
            ...(this.$route.query && this.$route.query.version ? { version: encodeURI(this.$route.query.version) } : null),
          },
        });
      } else {
        // external ontology
        this.$router.push({
          path: '/ontology',
          query: {
            ...{ query: encodeURI(destRoute) },
            ...(this.$route.query && this.$route.query.version ? { version: encodeURI(this.$route.query.version) } : null),
          },
        });
      }
      this.scrollToOntologyViewerTopOfContainer();
    },
    async searchBox_addTag(newTag) {
      this.$router.push({
        path: '/ontology',
        query: {
          ...{ searchBoxQuery: encodeURI(newTag) },
          ...(this.$route.query && this.$route.query.version ? { version: encodeURI(this.$route.query.version) } : null),
        },
      });
    },
    async handleSearchBoxQuery(searchBQuery) {
      try {
        this.searchBox.isLoadingMore = true;

        const domain = `${this.searchServer}?term=${searchBQuery}`;

        const result = await getFindSearch(domain);
        const body = await result.json();

        this.searchBox.maxPage = body.maxPage;
        this.searchBox.lastSearchBQuery = searchBQuery;
        this.error = false;
        this.searchBox.isLoadingMore = false;

        // eslint-disable-next-line no-restricted-syntax
        for (const res of body) {
          if (res.maturityLevel === undefined || res.maturityLevel.icon === undefined) {
            res.maturityLevel = {};
            res.maturityLevel.icon = '';
          }
        }

        this.searchBox.totalResults = body;
        this.searchBox.displayedResults = body.slice(0, this.searchBox.perPage);
      } catch (err) {
        console.error(err);
        this.error = true;
      }

      const tag = {
        isSearch: true,
        iri: searchBQuery,
        label: searchBQuery,
        labelForInternalSearch: searchBQuery,
      };
      this.searchBox.selectedData = tag;
    },
    async searchBox_asyncFind(query) {
      if (query.trim().length === 0) {
        this.searchBox.data = [];
        return;
      }

      this.searchBox.isLoading = true;
      try {
        const result = await getHint(query, this.hintServer);
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
    },
    clearAll() {
      this.searchBox.selectedData = null;
    },
    searchResultClicked() {
      this.$root.ontologyRouteIsUpdating = true;
    },
    paginateClickCallback(pageIndex) {
      this.handleSearchBoxQuery(this.searchBox.lastSearchBQuery, pageIndex);
    },
    togglePathCollapsed(tIndex) {
      this.$refs.taxonomyItems[tIndex].classList.toggle('collapsed');
    },
    checkPathsOverflow() {
      // go through displayed paths and call checkPathOverflow for them
      if (
        this.$refs.taxonomyItems &&
        this.$refs.ontologyPaths &&
        this.data &&
        this.data.taxonomy &&
        !this.pathsSection.isTreeView) {
        for (
          let i = 0;
          i
          < Math.min(
            2 + this.pathsSection.isPathsMoreVisible * (this.data.taxonomy.value.length - 2),
            this.data.taxonomy.value.length,
          );
          i += 1
        ) {
          this.checkPathOverflow(i);
        }
      }
    },
    checkPathOverflow(tIndex) {
      this.$nextTick(() => {
        if (!this.$refs.ontologyPaths.querySelector('h5').classList.contains('section-collapse')) {
          // collapse for overlap test purposes
          const wasCollapsed = this.$refs.taxonomyItems[tIndex].classList.contains('collapsed');
          if (!wasCollapsed) {
            this.$refs.taxonomyItems[tIndex].classList.toggle('collapsed');
          }
          const el = this.$refs.taxonomyItems[tIndex].firstChild;
          const curOverf = el.style.overflow;
          if (!curOverf || curOverf === 'visible') el.style.overflow = 'hidden';
          const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
          el.style.overflow = curOverf;

          if (!wasCollapsed) {
            this.$refs.taxonomyItems[tIndex].classList.toggle('collapsed');
          }
          // set array value making use of Vue reactivity
          this.$set(this.pathsSection.hasOverflow, tIndex, isOverflowing);
        }
      });
    },
    loadMoreResults() {
      const newLength = this.searchBox.displayedResults.length + this.searchBox.perPage;
      this.searchBox.displayedResults = this.searchBox.totalResults.slice(0, newLength);
    },
    clearSearchResults() {
      this.searchBox = {
        selectedData: null,
        data: [],
        totalData: [],
        isLoading: false,
        totalResults: [],
        displayedResults: [],
        lastSearchBQuery: null,
        perPage: 10,
        isLoadingMore: false,
      };
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
    },
    githubNewIssue() {
      const ontologyQuery = this.data.iri.replace('https://spec.edmcouncil.org/auto/ontology/', '');
      const label = ontologyQuery.substring(0, ontologyQuery.indexOf("/"));
      const details = {
        label,
        title: `Problem with ${this.data.label.toUpperCase()}`,
        body: `Resource URL:\n${this.data.iri}`,
      };
      const url =  `https://github.com/edmcouncil/auto/issues/new` +
        `?labels=${encodeURI(details.label)}` +
        `&template=issue.md` +
        `&title=${encodeURI(details.title)}` +
        `&body=${encodeURI(details.body)}`;

      window.open(url, '_blank');
    },
    scrollToOntologyViewerTopOfContainer(behavior) {
      const element = document.getElementById("ontologyViewerTopOfContainer");

      const rect = element.getBoundingClientRect();
      const scrollTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);

      if (behavior == 'smooth')
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      else
        window.scrollTo(0, scrollTop);

      this.$root.ontologyRouteIsUpdating = false;
    },
    howToUseHandler() {
      this.data = null;
      if(this.$route.fullPath != '/ontology')
        this.$router.push('/ontology');

      this.$nextTick(async function () {
        this.scrollToOntologyViewerTopOfContainer('smooth');
      });
    }
  },
  computed: {
    ...mapState({
      searchDefaultDomain: state => state.searchDefaultDomain,
      ontologyDefaultDomain: state => state.ontologyDefaultDomain,
      modulesDefaultDomain: state => state.modulesDefaultDomain,
      statsDefaultDomain: state => state.statsDefaultDomain,
      missingImportsDefaultDomain: state => state.missingImportsDefaultDomain,
    }),
  },
  watch: {
    // eslint-disable-next-line vue/no-arrow-functions-in-watch
    '$route.query.version': () => {
      this.updateServers();

      this.fetchData(this.query);
      this.fetchModules();

      // clear search results after changing version
      this.clearSearchResults();
    },
    // eslint-disable-next-line vue/no-arrow-functions-in-watch
    "pathsSection.isTreeView": newValue => {
      localStorage.isTreeView = newValue;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.updateServers(to);
    this.$root.ontologyRouteIsUpdating = true;
    if (to !== from) {
      let queryParam = '';

      if (to.query && to.query.query) {
        queryParam = to.query.query+to.hash || "";
      } else {
        queryParam = `https://spec.edmcouncil.org/auto${to.path}`;
      }

      this.query = queryParam;
      if (this.query === 'https://spec.edmcouncil.org/auto/ontology') {
        this.query = '';
        this.data = null;
      } else {
        this.query = encodeURIComponent(this.query);
      }

      this.$nextTick(async function () {
        this.fetchData(this.query);
      });
    }
    next();
  },
  updated() {
    // scrollTo: ontologyViewerTopOfContainer
    if (this.$root.ontologyRouteIsUpdating || this.$route.query.scrollToTop === 'true') {
      this.searchBox.selectedData = null; // to hide search results after rerouting on ontology page
      this.$nextTick(() => {
        if(this.$route.fullPath != '/ontology')
          this.scrollToOntologyViewerTopOfContainer();
      });
    }

    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // if (this.mountedTimestamp + 4 >= currentTimestamp) {
    //  this IF makes trick to execute only on page load
    //  this.scrollToOntologyViewerTopOfContainer();
    // }

    if (this.$route.query.searchBoxQuery && this.$route.query.searchBoxQuery_isExecuted !== true) {
      this.$nextTick(() => {
        if(this.$route.fullPath != '/ontology')
          this.scrollToOntologyViewerTopOfContainer();
      });
      this.clearSearchResults();
      this.handleSearchBoxQuery(decodeURI(this.$route.query.searchBoxQuery));
      this.$route.query.searchBoxQuery_isExecuted = true;
    }

    // disable input autocomplete in multiselect
    document.getElementById('ajax2').autocomplete = 'off';
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/styles/views/Ontology.scss" lang="scss"></style>
