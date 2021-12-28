<template>
  <div class="container ontology-container">
    <div class="row">
      <!-- tree large -->
      <div
        class="
          col-lg-4 col-xl-3
          d-none d-lg-block
          ontology-secondary-column
        "
      >
        <div class="module-tree">
          <div class="multiselect-xxl-container multiselect-container container">
            <div class="row modules-header">
              <h5 class="fibo-title-modules">FIBO Viewer</h5>
              <div class="button-small">
                <a
                  class="button-small-text"
                  target="_blank"
                  href="@/fibo/ontology/"
                >
                  How to use
                </a>
              </div>
            </div>
          </div>
          <div class="multiselect-xxl-container multiselect-container container">
            <div class="tmmenu">
              <div class="text-elements">
                <div class="labelMultiSelect">Select Fibo version</div>
                <div class="selectText">
                  <multiselect
                    v-model="ontologyVersionsDropdownData.selectedData"
                    id="ontologyVersionsMultiselect"
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
              </div>
              <span class="iconSidebar clockIcon"></span>
            </div>
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.selectedData }}</code></pre> -->
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.data }}</code></pre> -->
          </div>
          <div class="multiselect-xxl-container multiselect-container container">
            <div class="tmmenu">
              <div v-on:click="toggleModuleTree()" class="text-elements">
                <div class="labelMultiSelect">Browse FIBO domains</div>
                <div class="selectText">FIBO Domains</div>
              </div>
              <i class="iconSidebar directoryIcon"></i>
            </div>
          </div>

          <!-- module tree --->
          <ul v-if="display_modules" class="modules-list list-unstyled">
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
      <div class="col-12 col-lg-8 col-xl-9 ontology-main-column">
        <div class="container px-0">
          <!-- search box large -->
          <div class="searchBox card searchBoxDesktop d-none d-lg-block">
            <div class="row">
              <div class="col-lg-12">
                <div class="multiselect-xxl-container multiselect-container">
                  <div class="tmmenu">
                    <div class="text-elements">
                      <div class="labelMultiSelect">Search FIBO</div>
                      <div class="selectText">
                        <multiselect
                          v-model="searchBox.selectedData"
                          id="ajax2"
                          label="labelForInternalSearch"
                          track-by="iri"
                          placeholder="Search..."
                          tagPlaceholder="Search for..."
                          selectLabel="Display ontology"
                          open-direction="bottom"
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
                          <template slot="tag" slot-scope="{ option, remove }"
                            ><span class="custom__tag"
                              ><span>{{ option.label }}</span
                              ><span
                                class="custom__remove"
                                @click="remove(option)"
                                >❌</span
                              ></span
                            ></template
                          >
                          <template slot="clear" slot-scope="props">
                            <div
                              class="multiselect__clear"
                              v-if="searchBox.selectedData"
                              @mousedown.prevent.stop="clearAll(props.search)"
                            ></div> </template
                          ><span slot="noResult"
                            >Oops! No elements found. Consider changing the
                            search query.</span
                          >
                        </multiselect>
                      </div>
                    </div>
                    <i class="clockIcon"></i>
                  </div>
                  <!-- <pre class="language-json"><code>{{ searchBox.selectedData }}</code></pre> -->
                  <!-- <pre class="language-json"><code>{{ searchBox.data }}</code></pre> -->
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
          <!-- tree mobile -->
          <div class="module-tree col-lg-12 d-lg-none">
            <div class="multiselect-container">
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
                <div
                  class="multiselect__clear"
                  v-if="ontologyVersionsDropdownData.selectedData"
                  @mousedown.prevent.stop="clearAll(props.search)">
                </div>
              </template> -->
                <span slot="noResult"
                  >Oops! No elements found. Consider changing the search
                  query.</span
                >
              </multiselect>
              <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.selectedData }}</code></pre> -->
              <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.data }}</code></pre> -->
            </div>

            <ul class="modules-list list-unstyled">
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
          <!-- search box mobile -->
          <div class="d-lg-none multiselect-container">
            <multiselect
              v-model="searchBox.selectedData"
              id="ajax"
              label="labelForInternalSearch"
              track-by="iri"
              placeholder="Search..."
              tagPlaceholder="Search for..."
              selectLabel="Display ontology"
              open-direction="bottom"
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
              <template slot="tag" slot-scope="{ option, remove }"
                ><span class="custom__tag"
                  ><span>{{ option.label }}</span
                  ><span class="custom__remove" @click="remove(option)"
                    >❌</span
                  ></span
                ></template
              >
              <template slot="clear" slot-scope="props">
                <div
                  class="multiselect__clear"
                  v-if="searchBox.selectedData"
                  @mousedown.prevent.stop="clearAll(props.search)"
                ></div> </template
              ><span slot="noResult"
                >Oops! No elements found. Consider changing the search
                query.</span
              >
            </multiselect>
            <!-- <pre class="language-json"><code>{{ searchBox.selectedData }}</code></pre> -->
          </div>

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
              <p>{{ searchBox.totalResults }} results</p>
            </div>

            <div
              v-if="searchBox.searchResults && searchBox.searchResults.length"
              class="search-section__items"
            >
              <div
                v-for="(result, index) in searchBox.totalData"
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
                    {{ result.iri }}
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

            <div class="search-section__load-more" v-if="this.searchBox.maxPage > 1">
              <p>
                1 -
                {{ searchBox.currentPage * searchBox.perPage }}
                of {{ searchBox.totalResults }}
              </p>

              <div
                class="search-section__load-more__button"
                @click="loadMoreResults()"
                v-if="
                  searchBox.currentPage < searchBox.maxPage &&
                  !searchBox.isLoadingMore
                "
              >
                Load next
                {{
                  searchBox.currentPage === searchBox.maxPage - 1 &&
                  searchBox.perPage !== 0 &&
                  searchBox.totalResults !== 0
                    ? searchBox.totalResults % searchBox.perPage
                    : searchBox.perPage
                }}
                results
              </div>
              <div class="search-section__load-more__button" v-else-if="searchBox.isLoadingMore">
                Loading...
              </div>

              <div class="search-section__load-more__button" v-else>No more results to load</div>

              <!-- <paginate
                      :page-count="this.searchBox.maxPage"
                      :page-range="3"
                      :margin-pages="2"
                      :click-handler="paginateClickCallback"
                      :prev-text="'«'"
                      :next-text="'»'"
                      :container-class="'pagination'"
                      :page-class="'page-item'"
                      :page-link-class="'page-link'"
                      :prev-class="'page-item'"
                      :prev-link-class="'page-link'"
                      :next-class="'page-item'"
                      :next-link-class="'page-link'"
                    >
                    </paginate> -->
            </div>
          </div>

          <div class="container" v-else>
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
                            `&title=${encodeURI(
                              githubNewIssueDetails().title
                            )}` +
                            `&body=${encodeURI(githubNewIssueDetails().body)}`
                          "
                          >Report a problem</a
                        >

                        <!-- maturity alert -->
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

                        <div class="clearfix"></div>

                        <!-- header item title -->
                        <h5
                          class="card-title"
                          :class="{
                            'maturity-provisional':
                              (this.data.maturityLevel.label !== 'release' && this.data.maturityLevel.label != '' )||
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
                            v-if="
                              this.$route.query && this.$route.query.version
                            "
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
                              <div class="seeMoreBtn">Show full path</div>
                            </div>

                            <div>
                              <div class="seeLessBtn">Hide full path</div>
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
                        <div class="seeMoreBtn">
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
                        <div class="seeLessBtn">Show less paths</div>
                      </div>
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
                                      sectionsVisibilitySettings[
                                        sectionIndex
                                      ] === undefined
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
                                  'seeMoreBtn ' +
                                  'seeMoreBtn_' +
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
                                  'seeLessBtn ' +
                                  'seeMoreBtn_' +
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
              <div class="col-md-12 col-xxl-12" v-else>
                <main v-if="!loader">
                  <div class="col-md-12 grayBox">
                    <div class="contentBox">
                      <h5>How to use FIBO Viewer</h5>
                      <p class="text">
                        To start using FIBO Viewer, search for interesting
                        concepts by walking through the FIBO directory structure
                        on the left-hand side or use the full-text search
                        function.
                      </p>
                    </div>
                  </div>

                  <article class="clearContentBox">
                    <img src="@/assets/img/clock.svg" />

                    <h5>FIBO Versions</h5>
                    <p class="text">
                      FIBO Viewer allows for browsing the past versions of FIBO.
                    </p>

                    <p class="post-description">
                      It also helps developers to see the changes proposed to
                      FIBO in pull requests before their approval. To see the
                      content of the past FIBO releases or recent pull requests,
                      choose them from the drop-down list.
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
                      Domains, starting with the Business Entities at the top
                      and ending with Securities at the bottom.
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
                      Release ontologies are ones that are considered to be
                      stable and mature from a development perspective.
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
                      Yellow square icon means that it provisional or
                      informative. Domains or modules are yellow if they contain
                      only yellow ontologies.
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect';
import Paginate from 'vuejs-paginate';
import {
  getOntology,
  getModules,
  getHint,
  getOntologyVersions,
} from '../api/ontology';

export default {
  components: {
    AXIOM: () => import(/* webpackChunkName: "AXIOM" */ '../components/chunks/AXIOM'),
    STRING: () => import(/* webpackChunkName: "STRING" */ '../components/chunks/STRING'),
    DIRECT_SUBCLASSES: () => import(
      // eslint-disable-next-line comma-dangle
      /* webpackChunkName: "DIRECT_SUBCLASSES" */ '../components/chunks/DIRECT_SUBCLASSES'
    ),
    MODULES: () => import(/* webpackChunkName: "MODULES" */ '../components/chunks/MODULES'),
    IRI: () => import(/* webpackChunkName: "IRI" */ '../components/chunks/IRI'),
    INSTANCES: () => import(
      // eslint-disable-next-line comma-dangle
      /* webpackChunkName: "INSTANCES" */ '../components/chunks/INSTANCES'
    ),
    ANY_URI: () => import(/* webpackChunkName: "ANY_URI" */ '../components/chunks/ANY_URI'),
    VisNetwork: () => import(/* webpackChunkName: "ANY_URI" */ '../components/VisNetwork'),
    Multiselect,
    Paginate,
  },
  props: ['ontology'],
  data() {
    return {
      display_modules: true,
      pathsSection: {
        isPathsMoreVisible: false,
        hasOverflow: [],
      },
      sectionsVisibilitySettings: [],
      mountedTimestamp: null,
      loader: false,
      data: null,
      query: '',
      ontologyServer: null,
      modulesServer: null,
      hintServer: null,
      hintDefaultDomain: '/fibo/ontology/{version}api/hint/',
      version: null,
      versionDefaultSelectedData: {
        '@id': '<DEFAULT>',
        url: '',
      },
      modulesList: null,
      error: false,
      searchBox: {
        selectedData: null,
        data: [],
        totalData: [],
        isLoading: false,
        searchResults: null,
        maxPage: null, // contains number of pages in searchResults. This prop. is handler for pagination
        lastSearchBQuery: null, // contains last searchBQuery used. This prop. is handler for pagination
        perPage: 10,
        currentPage: 1,
        isLoadingMore: false,
      },
      ontologyVersionsDropdownData: {
        selectedData: null,
        data: [],
        isLoading: false,
      },
      scrollToOntologyViewerTopOfContainer() {
        const element = document.getElementById('ontologyViewerTopOfContainer');

        const rect = element.getBoundingClientRect();
        const scrollTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);

        window.scrollTo(0, scrollTop);
        this.$root.ontologyRouteIsUpdating = false;
      },
      githubNewIssueDetails() {
        const ontologyQuery = this.data.iri.replace(
          'https://spec.edmcouncil.org/fibo/ontology/',
          '',
        );
        const label = ontologyQuery.substring(0, ontologyQuery.indexOf('/'));
        return {
          label,
          title: `Problem with ${this.data.label.toUpperCase()}`,
          body: `Resource URL:\n${this.data.iri}`,
        };
      },
    };
  },
  mounted() {
    let queryParam = '';
    this.mountedTimestamp = Math.floor(Date.now() / 1000);

    if (this.$route.params && this.$route.params[1]) {
      const ontologyQuery = window.location.pathname.replace(
        '/fibo/ontology/',
        '',
      );
      queryParam = `https://spec.edmcouncil.org/fibo/ontology/${ontologyQuery}`;
      // this.githubNewIssue.title = this.githubNewIssue.titleTemplate.replace('<LABEL>', this.githubNewIssue.label);
    } else if (this.$route.query && this.$route.query.query) {
      queryParam = this.$route.query.query || '';
    }

    // check for taxonomy paths overflow in mobile view with debounce
    let timeoutCheckPathsOverflow = false;
    window.addEventListener('resize', () => {
      clearTimeout(timeoutCheckPathsOverflow);
      timeoutCheckPathsOverflow = setTimeout(this.checkPathsOverflow, 300);
    });

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
      if (internalRoute.query && internalRoute.query.domain) {
        this.ontologyServer = internalRoute.query.domain;
      } else {
        this.ontologyServer = this.ontologyDefaultDomain;
      }

      if (internalRoute.query && internalRoute.query.modules) {
        this.modulesServer = internalRoute.query.modules;
      } else {
        this.modulesServer = this.modulesDefaultDomain;
      }

      if (internalRoute.query && internalRoute.query.version) {
        this.ontologyServer = this.ontologyServer.replace(
          '{version}',
          `${internalRoute.query.version}/`,
        );
        this.modulesServer = this.modulesServer.replace(
          '{version}',
          `${internalRoute.query.version}/`,
        );
        this.hintServer = this.hintDefaultDomain.replace(
          '{version}',
          `${internalRoute.query.version}/`,
        );
        this.version = internalRoute.query.version;
      } else {
        this.ontologyServer = this.ontologyServer.replace('{version}', '');
        this.modulesServer = this.modulesServer.replace('{version}', '');
        this.hintServer = this.hintDefaultDomain.replace('{version}', '');
        this.version = null;
      }
    },
    async fetchData(query) {
      if (query) {
        this.loader = true;
        this.data = null;
        try {
          const result = await getOntology(query, this.ontologyServer);
          const body = await result.json();
          if (body.type !== 'details') {
            console.error(`body.type: ${body.type}, expected: details`);
          }
          this.data = body.result;
          this.error = false;
        } catch (err) {
          console.error(err);
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
          this.ontologyVersionsDropdownData.selectedData = ontologyVersions.find((val) => {
            if (val['@id'] === this.version) {
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
        if (
          this.data
          && this.data.taxonomy
          && this.data.taxonomy.value.length > 0
        ) {
          this.checkPathsOverflow();
        }
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

    // vue-multiselect ontologyVersions
    ontologyVersions_optionSelected(selectedOntologyVersion /* , id */) {
      if (
        selectedOntologyVersion['@id']
        === this.versionDefaultSelectedData['@id']
      ) {
        // default selected
        const { version, ...rest } = this.$route.query; // get rid of version
        this.$router.push({ query: rest });
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            ...{
              version: encodeURI(selectedOntologyVersion['@id']),
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
      if (destRoute.startsWith('https://spec.edmcouncil.org/fibo')) {
        // internal ontology
        destRoute = destRoute.replace('https://spec.edmcouncil.org/fibo', '');
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
          path: '/ontology',
          query: {
            ...{ query: encodeURI(destRoute) },
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
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
          ...(this.$route.query && this.$route.query.version
            ? { version: encodeURI(this.$route.query.version) }
            : null),
        },
      });
    },
    async handleSearchBoxQuery(searchBQuery, pageIndex = null) {
      try {
        this.searchBox.isLoadingMore = true;
        const result = await getOntology(
          searchBQuery,
          `${this.ontologyServer}/max/${this.searchBox.perPage}${
            pageIndex != null ? `/page/${pageIndex}` : ''
          }`,
        );
        const body = await result.json();
        if (body.type !== 'list') {
          console.error(`body.type: ${body.type}, expected: list`);
        }
        this.searchBox.searchResults = body.result;
        this.searchBox.maxPage = body.maxPage;
        this.searchBox.lastSearchBQuery = searchBQuery;
        this.error = false;
        this.searchBox.isLoadingMore = false;
        this.searchBox.totalData.push(...this.searchBox.searchResults);

        // PH placeholder values
        this.searchBox.totalResults = 1234;
        // eslint-disable-next-line no-restricted-syntax
        for (const res of this.searchBox.searchResults) {
          res.maturityLevel = {};
          res.maturityLevel.icon = 'develop';
        }
        // PH placeholder values

        // testing
        // console.log(this.searchBox);
        // console.log(this.searchBox.totalData);
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
    toggleSectionsVisibility(sectionIndex, propertyIndex) {
      // make a copy of the "row"
      const newRow = this.sectionsVisibilitySettings[sectionIndex].slice(0);
      // update the value
      newRow[propertyIndex] = !this.sectionsVisibilitySettings[sectionIndex][propertyIndex];
      // update it in the sectionsVisibilitySettings
      this.$set(this.sectionsVisibilitySettings, sectionIndex, newRow);
    },
    togglePathCollapsed(tIndex) {
      this.$refs.taxonomyItems[tIndex].classList.toggle('collapsed');
    },
    checkPathsOverflow() {
      // go through displayed paths and call checkPathOverflow for them
      if (
        this.$refs.taxonomyItems
        && this.$refs.ontologyPaths
        && this.data
        && this.data.taxonomy
      ) {
        for (
          let i = 0;
          i
          < Math.min(
            2
              + this.pathsSection.isPathsMoreVisible
                * (this.data.taxonomy.value.length - 2),
            this.data.taxonomy.value.length,
          );
          i += 1
        ) {
          this.checkPathOverflow(i);
        }
      }
    },
    checkPathOverflow(tIndex) {
      if (
        !this.$refs.ontologyPaths
          .querySelector('h5')
          .classList.contains('section-collapse')
      ) {
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
    },
    loadMoreResults() {
      if (this.searchBox.currentPage < this.searchBox.maxPage) {
        this.searchBox.currentPage += 1;
        this.handleSearchBoxQuery(
          this.searchBox.lastSearchBQuery,
          this.searchBox.currentPage,
        );
      }
    },
    clearSearchResults() {
      this.searchBox = {
        selectedData: null,
        data: [],
        totalData: [],
        isLoading: false,
        searchResults: null,
        maxPage: null, // contains number of pages in searchResults. This prop. is handler for pagination
        lastSearchBQuery: null, // contains last searchBQuery used. This prop. is handler for pagination
        perPage: 10,
        currentPage: 1,
        isLoadingMore: false,
      };
    },
  },
  computed: {
    ...mapState({
      ontologyDefaultDomain: state => state.ontologyDefaultDomain,
      modulesDefaultDomain: state => state.modulesDefaultDomain,
    }),
  },
  watch: {
    '$route.query.query': (query) => {
      this.fetchData(query);
    },
    // eslint-disable-next-line no-unused-vars
    '$route.query.version': (version) => {
      this.updateServers();

      this.fetchData(this.query);
      this.fetchModules();

      // clear search results after changing version
      this.clearSearchResults();
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.updateServers(to);
    this.$root.ontologyRouteIsUpdating = true;
    if (to !== from) {
      let queryParam = '';

      if (to.query && to.query.query) {
        queryParam = to.query.query || '';
      } else {
        queryParam = `https://spec.edmcouncil.org/fibo${to.path}`;
      }
      this.query = queryParam;
      if (this.query === 'https://spec.edmcouncil.org/fibo/ontology') {
        this.query = '';
        this.data = null;
      }
      this.$nextTick(async function () {
        this.fetchData(this.query);
      });
    }
    next();
  },
  updated() {
    // scrollTo: ontologyViewerTopOfContainer
    if (
      this.$root.ontologyRouteIsUpdating
      || this.$route.query.scrollToTop === 'true'
    ) {
      this.searchBox.selectedData = null; // to hide search results after rerouting on ontology page
      this.scrollToOntologyViewerTopOfContainer(); // scroll only after internal navigaion
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (this.mountedTimestamp + 4 >= currentTimestamp) {
      // this IF makes trick to execute only on page load
      this.scrollToOntologyViewerTopOfContainer(); // scroll only on page load
    }

    if (
      this.$route.query.searchBoxQuery
      && this.$route.query.searchBoxQuery_isExecuted !== true
    ) {
      this.scrollToOntologyViewerTopOfContainer();
      this.clearSearchResults();
      this.handleSearchBoxQuery(decodeURI(this.$route.query.searchBoxQuery));
      this.$route.query.searchBoxQuery_isExecuted = true;
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/styles/views/Ontology.scss" lang="scss"></style>
