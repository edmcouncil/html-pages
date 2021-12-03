<template>
  <!-- eslint-disable max-len -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 col-xxxl-3 d-none d-xxl-block">
        <div class="module-tree float-right">
          <div class="multiselect-xxl-container">
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
                <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData" @mousedown.prevent.stop="clearAll(props.search)"></div>
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
        </div>
      </div>

      <div class="col-12 col-xxl-8 col-xxxl-6 px-0">
        <div class="container">
          <a
            name="ontologyViewerTopOfContainer"
            id="ontologyViewerTopOfContainer"
          ></a>

          <div class="d-xxl-none multiselect-container">
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

          <div
            class="searchResults"
            v-if="searchBox.selectedData && searchBox.selectedData.isSearch"
          >
            <h5 style="padding-top: 0px; margin-bottom: 20px">
              Search results for "{{ searchBox.selectedData.iri }}":
            </h5>
            <div
              v-if="searchBox.searchResults && searchBox.searchResults.length"
            >
              <div
                v-for="result in searchBox.searchResults"
                :key="result"
                class="row"
              >
                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <customLink
                        class="custom-link"
                        :name="result.label"
                        :query="result.iri"
                        :customLinkOnClick="searchResultClicked"
                      ></customLink>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 text-link">
                      {{ result.iri }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 text">
                      {{ result.description }}
                    </div>
                  </div>
                  <div class="border-bottom"></div>
                </div>
              </div>
              <div class="row" v-if="this.searchBox.maxPage > 1">
                <div class="col-12">
                  <div class="text-center">
                    <paginate
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
                    </paginate>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <!-- No results -->
            </div>
          </div>

          <div v-else>
            <div class="row">
              <!-- TREE -->
              <div class="module-tree col-md-12 col-lg-4 d-xxl-none">
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
                    <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData" @mousedown.prevent.stop="clearAll(props.search)"></div>
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

              <!-- SHOW ITEM -->
              <div
                class="col-md-12 col-lg-8 col-xxl-12 px-0 ontology-item"
                v-if="data"
              >
                <div class="row">
                  <!--  MATURITY / TITLE  -->
                  <div class="col-md-12 header-card">
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
                            data.maturityLevel.label != 'release' &&
                            data.maturityLevel.label != ''
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
                          :class="{
                            'maturity-provisional':
                              this.data.maturityLevel.label !== 'release' &&
                              this.data.maturityLevel.label != '',
                            'maturity-production':
                              this.data.maturityLevel.label === 'release',
                            'card-title': true,
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
                    class="col-md-12 ontology-paths"
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
                          class="taxonomy collapsed"
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
                              >
                                <div
                                  href="#"
                                  @click.prevent="
                                    toggleSectionsVisibility(
                                      sectionIndex,
                                      propertyIndex
                                    )
                                  "
                                >
                                  Show more
                                </div>
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
                              >
                                <div
                                  href="#"
                                  @click.prevent="
                                    toggleSectionsVisibility(
                                      sectionIndex,
                                      propertyIndex
                                    )
                                  "
                                >
                                  Show less
                                </div>
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
              <div class="col-md-12 col-lg-8 col-xxl-12" v-else>
                <main v-if="!loader">
                  <article>
                    <h1>
                      <span>FIBO Viewer</span>
                    </h1>
                    <h4>How to use FIBO Viewer</h4>

                    <p class="text">
                      To start using FIBO Viewer, search for interesting
                      concepts by walking through the FIBO directory structure
                      on the left-hand side or use the full-text search
                      function.
                    </p>

                    <h4>FIBO time machine</h4>

                    <p class="text">
                      FIBO Viewer allows for browsing the past versions of FIBO.
                      It also helps developers to see the changes proposed to
                      FIBO in pull requests before their approval. To see the
                      content of the past FIBO releases or recent pull requests,
                      choose them from the drop-down list.
                    </p>

                    <h4>FIBO structure</h4>
                    <!--                   <p class="text">
                    To fully benefit from the FIBO Viewer, one should keep in mind two very important things about FIBO.
                  </p> -->

                    <p class="text">
                      <b
                        >FIBO is a set of ontologies. It is organized in a
                        hierarchical directory structure.</b
                      >
                      Top-level directories are called <i>domains</i>; beneath
                      that may be one or two levels of <i>sub-domain</i> and
                      then <i>modules</i> and dozens of <i>ontologies</i> at the
                      bottom level, e.g.:
                    </p>

                    <ul>
                      <li>
                        <a
                          href="https://spec.edmcouncil.org/fibo/ontology/BE/MetadataBE/BEDomain"
                          >Business Entities</a
                        >
                        (FIBO domain)
                        <ul>
                          <li>
                            <a
                              href="https://spec.edmcouncil.org/fibo/ontology/BE/LegalEntities/MetadataBELegalEntities/LegalEntitiesModule"
                              >Legal Entities</a
                            >
                            (FIBO module)
                            <ul>
                              <li>
                                <a
                                  href="https://spec.edmcouncil.org/fibo/ontology/BE/LegalEntities/LEIEntities/"
                                  >Legal Entity Identifier (LEI) Entities
                                  Ontology</a
                                >
                                (FIBO ontology)
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>

                    <p class="text">
                      On the left-hand side, there is a list of eleven FIBO
                      Domains, starting with the
                      <a
                        href="https://spec.edmcouncil.org/fibo/ontology/BE/MetadataBE/BEDomain"
                        >Business Entities</a
                      >
                      at the top and ending with
                      <a
                        href="https://spec.edmcouncil.org/fibo/ontology/SEC/MetadataSEC/SECDomain"
                        >Securities</a
                      >
                      at the bottom.
                    </p>

                    <h4>FIBO maturity levels</h4>
                    <p class="text">
                      Each FIBO ontology has one of
                      <strong>three levels of maturity</strong>.
                    </p>

                    <p class="">
                      <strong>release</strong>
                    </p>
                    <ul class="maturity-levels">
                      <li>
                        Release ontologies are ones that are considered to be
                        stable and mature from a development perspective.
                      </li>
                    </ul>

                    <p class="">
                      <strong>provisional</strong>
                    </p>
                    <ul class="maturity-levels">
                      <li>
                        Provisional ontologies are ones that are considered to
                        be under development.
                      </li>
                    </ul>

                    <p class="">
                      <strong>informative</strong>
                    </p>
                    <ul class="maturity-levels">
                      <li>
                        Provisional ontologies are ones that are considered
                        deprecated but included for informational purposes
                        because they are referenced by some provisional concept.
                      </li>
                    </ul>

                    <p p class="text">
                      <b>FIBO production</b> is made up of the release
                      ontologies only.
                    </p>

                    <p p class="text">
                      <b>FIBO development</b> is made up of all ontologies,
                      i.e., those that are released, provisional, and
                      informative.
                    </p>

                    <p class="text">
                      FIBO Viewer uses colors to indicate the status of an
                      ontology. Each ontology is either
                      <font color="#51d355">green</font> or
                      <font color="#f1df3f">yellow</font>. The
                      <font color="#51d355">green</font> color indicates that an
                      ontology has a "release" maturity level, whereas
                      <font color="#f1df3f">yellow</font> means that it
                      provisional or informative. Domains or modules are
                      <font color="#51d355">green</font> (<font color="#f1df3f"
                        >yellow</font
                      >) if they contain only
                      <font color="#51d355">green</font> (<font color="#f1df3f"
                        >yellow</font
                      >) ontologies. Domains or modules are
                      <font color="#51d355">green</font>-<font color="#f1df3f"
                        >yellow</font
                      >
                      is they include <font color="#51d355">green</font> and
                      <font color="#f1df3f">yellow</font> ontologies.
                    </p>

                    <!--

                  <br>
                  <p class="text">
                    One can see the maturity level for each FIBO ontology, see e.g.
                    <a href="https://spec.edmcouncil.org/fibo/ontology/BE/FunctionalEntities/FunctionalEntities/">https://spec.edmcouncil.org/fibo/ontology/BE/FunctionalEntities/FunctionalEntities/</a>
                  </p> -->

                    <h4>About FIBO Viewer</h4>
                    <p class="text">
                      FIBO Viewer is a JAVA application that is specifically
                      designed to access both the FIBO structure and its content
                      in the easiest possible way. It can serve both as a web
                      application and REST API. FIBO Viewer is an open-source
                      project that EDM Council hosts. See
                      <a href="https://github.com/edmcouncil/fibo-viewer"
                        >https://github.com/edmcouncil/fibo-viewer</a
                      >
                      for details.
                    </p>
                  </article>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 col-xxxl-3 d-none d-xxl-block">
        <div class="multiselect-xxl-container">
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
          <!-- <pre class="language-json"><code>{{ searchBox.data }}</code></pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import {
  getOntology,
  getModules,
  getHint,
  getOntologyVersions,
} from "../api/ontology";

export default {
  components: {
    AXIOM: () =>
      import(/* webpackChunkName: "AXIOM" */ "../components/chunks/AXIOM"),
    STRING: () =>
      import(/* webpackChunkName: "STRING" */ "../components/chunks/STRING"),
    DIRECT_SUBCLASSES: () =>
      import(
        /* webpackChunkName: "DIRECT_SUBCLASSES" */ "../components/chunks/DIRECT_SUBCLASSES"
      ),
    MODULES: () =>
      import(/* webpackChunkName: "MODULES" */ "../components/chunks/MODULES"),
    IRI: () => import(/* webpackChunkName: "IRI" */ "../components/chunks/IRI"),
    INSTANCES: () =>
      import(
        /* webpackChunkName: "INSTANCES" */ "../components/chunks/INSTANCES"
      ),
    ANY_URI: () =>
      import(/* webpackChunkName: "ANY_URI" */ "../components/chunks/ANY_URI"),
    VisNetwork: () =>
      import(/* webpackChunkName: "ANY_URI" */ "../components/VisNetwork"),
    Multiselect,
    Paginate,
  },
  props: ["ontology"],
  data() {
    return {
      pathsSection: {
        isPathsMoreVisible: false,
        hasOverflow: [],
      },
      sectionsVisibilitySettings: [],
      mountedTimestamp: null,
      loader: false,
      data: null,
      query: "",
      ontologyServer: null,
      modulesServer: null,
      hintServer: null,
      hintDefaultDomain: "/fibo/ontology/{version}api/hint/",
      version: null,
      versionDefaultSelectedData: {
        "@id": "<DEFAULT>",
        url: "",
      },
      modulesList: null,
      error: false,
      searchBox: {
        selectedData: null,
        data: [],
        isLoading: false,
        searchResults: null,
        maxPage: null, // contains number of pages in searchResults. This prop. is handler for pagination
        lastSearchBQuery: null, // contains last searchBQuery used. This prop. is handler for pagination
      },
      ontologyVersionsDropdownData: {
        selectedData: null,
        data: [],
        isLoading: false,
      },
      scrollToOntologyViewerTopOfContainer() {
        const element = document.getElementById("ontologyViewerTopOfContainer");

        const rect = element.getBoundingClientRect();
        const scrollTop =
          rect.top + (window.pageYOffset || document.documentElement.scrollTop);

        window.scrollTo(0, scrollTop);
        this.$root.ontologyRouteIsUpdating = false;
      },
      githubNewIssueDetails() {
        const ontologyQuery = this.data.iri.replace(
          "https://spec.edmcouncil.org/fibo/ontology/",
          ""
        );
        const label = ontologyQuery.substring(0, ontologyQuery.indexOf("/"));
        return {
          label,
          title: `Problem with ${this.data.label.toUpperCase()}`,
          body: `Resource URL:\n${this.data.iri}`,
        };
      },
    };
  },
  mounted() {
    let queryParam = "";
    this.mountedTimestamp = Math.floor(Date.now() / 1000);

    if (this.$route.params && this.$route.params[1]) {
      const ontologyQuery = window.location.pathname.replace(
        "/fibo/ontology/",
        ""
      );
      queryParam = `https://spec.edmcouncil.org/fibo/ontology/${ontologyQuery}`;
      // this.githubNewIssue.title = this.githubNewIssue.titleTemplate.replace('<LABEL>', this.githubNewIssue.label);
    } else if (this.$route.query && this.$route.query.query) {
      queryParam = this.$route.query.query || "";
    }

    this.updateServers();

    this.query = queryParam;
    this.fetchData(this.query);
    this.fetchModules();
  },
  methods: {
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
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.modulesServer = this.modulesServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.hintServer = this.hintDefaultDomain.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        this.version = internalRoute.query.version;
      } else {
        this.ontologyServer = this.ontologyServer.replace("{version}", "");
        this.modulesServer = this.modulesServer.replace("{version}", "");
        this.hintServer = this.hintDefaultDomain.replace("{version}", "");
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
          if (body.type !== "details") {
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
          this.ontologyVersionsDropdownData.selectedData =
            ontologyVersions.find((val, ind) => {
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
      } finally {
        if (this.data.taxonomy && this.data.taxonomy.value.length > 0)
          this.checkPathsOverflow();
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
      this.searchBox = {
        selectedData: null,
        data: [],
        isLoading: false,
        searchResults: null,
        maxPage: null, // contains number of pages in searchResults. This prop. is handler for pagination
        lastSearchBQuery: null, // contains last searchBQuery used. This prop. is handler for pagination
      };
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
      this.scrollToOntologyViewerTopOfContainer();
    },
    async searchBox_addTag(newTag) {
      this.$router.push({
        path: "/ontology",
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
        const result = await getOntology(
          searchBQuery,
          this.ontologyServer + (pageIndex != null ? `/page/${pageIndex}` : "")
        );
        const body = await result.json();
        if (body.type !== "list") {
          console.error(`body.type: ${body.type}, expected: list`);
        }
        this.searchBox.searchResults = body.result;
        this.searchBox.maxPage = body.maxPage;
        this.searchBox.lastSearchBQuery = searchBQuery;
        this.error = false;
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
      newRow[propernpmtyIndex] =
        !this.sectionsVisibilitySettings[sectionIndex][propertyIndex];
      // update it in the sectionsVisibilitySettings
      this.$set(this.sectionsVisibilitySettings, sectionIndex, newRow);
    },
    togglePathCollapsed(tIndex) {
      this.$refs.taxonomyItems[tIndex].classList.toggle("collapsed");
    },
    checkPathsOverflow() {
      // go through displayed paths and call checkPathOverflow for them
      for (
        let i = 0;
        i <
        Math.min(
          2 +
            this.pathsSection.isPathsMoreVisible *
              (this.data.taxonomy.value.length - 2),
          this.data.taxonomy.value.length
        );
        i++
      ) {
        this.checkPathOverflow(i);
      }
    },
    async checkPathOverflow(tIndex) {
      // need to wait for the v-for to render and only then check for overflow
      await this.$nextTick(() => {
        if (this.$refs.taxonomyItems) {
          // collapse for overlap test purposes
          const wasCollapsed =
            this.$refs.taxonomyItems[tIndex].classList.contains("collapsed");
          if (!wasCollapsed) {
            this.$refs.taxonomyItems[tIndex].classList.toggle("collapsed");
          }
          const el = this.$refs.taxonomyItems[tIndex].firstChild;
          const curOverf = el.style.overflow;
          if (!curOverf || curOverf === "visible") el.style.overflow = "hidden";
          const isOverflowing =
            el.clientWidth < el.scrollWidth ||
            el.clientHeight < el.scrollHeight;
          el.style.overflow = curOverf;

          if (!wasCollapsed) {
            this.$refs.taxonomyItems[tIndex].classList.toggle("collapsed");
          }
          // set array value making use of Vue reactivity
          this.$set(this.pathsSection.hasOverflow, tIndex, isOverflowing);
        }
      });
    },
  },
  computed: {
    ...mapState({
      ontologyDefaultDomain: (state) => state.ontologyDefaultDomain,
      modulesDefaultDomain: (state) => state.modulesDefaultDomain,
    }),
  },
  watch: {
    "$route.query.query": function (query) {
      this.fetchData(query);
    },
    "$route.query.version": function (version) {
      this.updateServers();

      this.fetchData(this.query);
      this.fetchModules();

      // clear search results after changing version
      this.searchBox = {
        selectedData: null,
        data: [],
        isLoading: false,
        searchResults: null,
        maxPage: null, // contains number of pages in searchResults. This prop. is handler for pagination
        lastSearchBQuery: null, // contains last searchBQuery used. This prop. is handler for pagination
      };
    },
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
      this.$nextTick(async function () {
        this.fetchData(this.query);
      });
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
      this.scrollToOntologyViewerTopOfContainer(); // scroll only after internal navigaion
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (this.mountedTimestamp + 4 >= currentTimestamp) {
      // this IF makes trick to execute only on page load
      this.scrollToOntologyViewerTopOfContainer(); // scroll only on page load
    }

    if (
      this.$route.query.searchBoxQuery &&
      this.$route.query.searchBoxQuery_isExecuted !== true
    ) {
      this.scrollToOntologyViewerTopOfContainer();
      this.handleSearchBoxQuery(decodeURI(this.$route.query.searchBoxQuery));
      this.$route.query.searchBoxQuery_isExecuted = true;
    }
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
h5,
h6 {
  padding-top: 10px;
}
.alert-maturity {
  margin: 20px;
}
//

//
.search-box {
  margin: 20px;
}
.module-tree ul,
.module-tree li {
  padding: 0;
  line-height: 24px;

  ::before {
    margin-top: 10px;
    display: none;
  }
}
@media (min-width: 1px) {
  .modules-list {
    margin: 20px 0 0 20px;
  }
}
@media (min-width: 1900px) {
  .modules-list {
    margin: 30px 0 0 20px;
  }
}
article ul.maturity-levels li {
  line-height: 1.5;
}
article ul.maturity-levels li:before {
  margin-top: 10px;
}
.searchResults {
  margin: 20px 20px 20px 20px;
}
.searchResults a {
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
}
.searchResults .text {
  color: #707070;
}
.searchResults .text-link {
  color: #adb5bd;
}
.border-bottom {
  margin-bottom: 5px;
}
.multiselect-container {
  margin: 20px 20px 0px 20px;
}
.multiselect-xxl-container {
  margin-top: 20px;
  min-width: 250px;
}
</style>

<style lang="scss">
@media (min-width: 1px) {
  #ontograph {
    height: 500px;
  }
}
@media (min-width: 1900px) {
  #ontograph {
    height: 1000px;
  }
}
@media (min-width: 992px) {
  .module-tree .multiselect-container {
    margin-right: 0px;
  }
}
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: #f3f3f3;
  color: #000;
}
.pagination {
  width: min-content;
  padding: unset;
  margin: 20px auto 0px;
  .page-item {
    padding-left: 0px;
    &:before {
      display: none;
    }
  }
  .page-item.active {
    .page-link {
      background-color: #2a83be;
    }
  }
}
// dd {
//   margin-left: 20px;

//   > div {
//     margin-top: 5px;
//     margin-left: 7px;
//   }
// }

//
//
//
//
//
//
//

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap");

* {
  box-sizing: border-box;
}

.alert-error {
  color: rgba(0, 0, 0, 0.8);

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.01em;

  border-radius: none;
  background: #f3140c;
  border: none;
  width: fit-content;
  block-size: fit-content;
  border-radius: 2px;

  margin-top: 20px;
  margin-bottom: 20px;
  padding: 5px 15px 5px 15px;
  // margin-right: 85px;

  a {
    text-decoration: underline;
  }

  &::before {
    content: "";
    display: block;
    height: 20px;
    width: 20px;
    background-color: inherit;
    border: inherit;
    position: absolute;
    bottom: -3px;
    left: 4px;
    clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    transform: rotate(-45deg);
    border-radius: 0 0 0 0.25em;
  }
}
.ontology-item {
  margin-top: 45px;
  font-family: Inter;
  .section-content-wrapper {
    margin-bottom: 60px;
  }
  .row {
    margin: 0;
    padding: 0;
  }

  a {
    color: rgba(0, 0, 0, 0.8);
  }

  .ontology-paths {
    text-decoration: none;
    padding-right: 60px;
    padding-left: 60px;
    .seeMoreBtn {
      margin-top: 20px;
    }
    .seeLessBtn {
      margin-top: 20px;
    }
    h5 {
      margin-bottom: 40px;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 36px;
      color: black;
    }

    .taxonomy {
      background: rgba(0, 0, 0, 0.05);
      color: rgba(0, 0, 0, 0.4);
      padding: 10px 20px;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.01em;
      .collapseButtons {
        display: none;
      }
      span a {
        color: rgba(0, 0, 0, 0.8);
        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .card {
    padding-right: 60px;
    padding-left: 60px;

    h5 {
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 36px;
      padding: 0;
      margin: 0;

      margin-bottom: 40px;
    }
    background: white;
    border: none;
    color: black;
    .card-body {
      padding: 0;
    }
    .card-content {
      margin-bottom: 60px;
      background: rgba(0, 0, 0, 0.05);
      padding: 40px 30px 0 30px;
    }
    dt {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      text-transform: capitalize;

      margin: 0;
      padding: 0;
    }
    dd {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 30px;

      margin: 0;
      margin-bottom: 40px;
      padding: 0;
      ul {
        margin-bottom: 0;
      }
      a {
        text-decoration: underline;
      }
    }
  }

  .header-card {
    background: rgba(0, 0, 0, 0.05);
    margin-bottom: 60px;
    padding: 0;

    // maturity alert
    .alert-maturity {
      float: left;
      color: rgba(0, 0, 0, 0.8);

      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;

      letter-spacing: 0.01em;

      border-radius: none;
      background: #feb700;
      border: none;
      width: fit-content;
      block-size: fit-content;
      border-radius: 2px;

      margin-top: 40px;
      margin-left: -30px;
      margin-bottom: 5px;
      padding: 5px 15px 5px 15px;
      // margin-right: 85px;

      a {
        text-decoration: underline;
      }

      &::before {
        content: "";
        display: block;
        height: 20px;
        width: 20px;
        background-color: inherit;
        border: inherit;
        position: absolute;
        bottom: -3px;
        left: 4px;
        clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
        transform: rotate(-45deg);
        border-radius: 0 0 0 0.25em;
      }
    }

    .maturity-filler {
      margin-top: 40px;
      margin-left: 30px;
      background: none;
      border: none;
      outline: none;
    }

    // report a problem
    .btn-report-a-problem {
      float: right;
      margin-top: 40px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 2px;
      padding: 5px 15px;
      border: none;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.01em;
    }

    h5 {
      text-transform: capitalize;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 50px;
      margin-right: 30px;
      margin-top: 35px;
      position: relative;

      &::before {
        content: "";

        background-repeat: no-repeat;
        background-size: 24px 24px;

        display: block;
        width: 24px;
        height: 24px;

        left: -30.17px;
        top: 12.83px;

        position: absolute;
      }
      &.maturity-provisional {
        &::before {
          background-image: url("../assets/icons/maturity-provisional.png");
        }
      }
      &.maturity-mixed {
        &::before {
          background-image: url("../assets/icons/maturity-mixed.png");
        }
      }
      &.maturity-production {
        &::before {
          background-image: url("../assets/icons/maturity-production.png");
        }
      }
    }
    h6 {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;

      letter-spacing: 0.01em;
      color: rgba(0, 0, 0, 0.6);
    }
    // data iri
    .data-iri {
      margin: 0px 0px;
      padding: 0;
    }
    // qname
    .qname {
      margin: 0px 0px;
      padding: 0;
    }
    // copy url button
    .btn-copy-url {
      color: rgba(0, 0, 0, 0.8);
      margin-top: 40px;
      margin-bottom: 40px;
      border: none;
      background: none;
      font-size: 18px;
      line-height: 30px;
      &::before {
        content: "";
        background-image: url("../assets/icons/copy-url-icon.svg");
        background-repeat: no-repeat;
        background-size: 24px;

        display: block;
        width: 24px;
        height: 24px;
        float: left;
        margin: 0 6px 0 0;
      }

      &:focus {
        outline: none;
        border: none;
      }
    }
    .btn-copy-iri {
      margin-top: 0px;
    }
    .card {
      background: none;
    }
  }
}
.seeMoreBtn {
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  margin-top: 40px;
  &::before {
    content: "";
    background-image: url("../assets/icons/down-arrow.svg");
    background-repeat: no-repeat;
    background-size: 12.12px 9.5px;

    display: block;
    width: 12.12px;
    height: 9.5px;
    float: left;
    margin: 11px 12px 12px 5px;
  }
}
.seeLessBtn {
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  margin-top: 40px;
  &::before {
    content: "";
    background-image: url("../assets/icons/up-arrow.svg");
    background-repeat: no-repeat;
    background-size: 12.12px 9.5px;

    display: block;
    width: 12.12px;
    height: 9.5px;
    float: left;
    margin: 11px 12px 12px 5px;
  }
}
//
//
//
//
//
//
//
// mobile
@media (max-width: 576px) {
  .section-title {
    &::before {
      content: "";
      background-image: url("../assets/icons/up-arrow.svg");
      background-repeat: no-repeat;
      background-size: 12.12px 9.5px;

      display: block;
      width: 12.12px;
      height: 9.5px;
      float: right;
      margin: 8px 12px 12px 6px;
    }
  }
  .section-collapse {
    &::before {
      content: "";
      background-image: url("../assets/icons/down-arrow.svg");
      background-repeat: no-repeat;
      background-size: 12.12px 9.5px;

      display: block;
      width: 12.12px;
      height: 9.5px;
      float: right;
      margin: 8px 12px 12px 6px;
    }
  }
  .section-collapse + div {
    display: none;
  }

  .ontology-item {
    margin-top: 45px;
    font-family: Inter;

    .row {
      margin: 0;
      padding: 0;
    }

    a {
      color: rgba(0, 0, 0, 0.8);
    }

    .ontology-paths {
      padding-right: 30px;
      padding-left: 30px;

      h5 {
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        color: black;
      }

      .taxonomy {
        background: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.4);
        padding: 10px 20px;
        margin-bottom: 20px;

        .taxonomy-wrapper {
          width: 100%;
          overflow: hidden;
        }
        span {
          color: rgba(0, 0, 0, 0.8);
        }
        .collapseButtons {
          display: block;
          .seeLessBtn {
            display: block;
          }
          .seeMoreBtn {
            display: none;
          }
        }
        &.collapsed {
          .taxonomy-wrapper {
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .collapseButtons {
            .seeLessBtn {
              display: none;
            }
            .seeMoreBtn {
              display: block;
            }
          }
          .span {
            height: 1em;
          }
        }
      }
    }

    .card {
      padding-right: 30px;
      padding-left: 30px;
      h5 {
        font-size: 20px;
        line-height: 30px;
      }
      .card-content {
        background: rgba(0, 0, 0, 0.05);
        padding: 40px 30px 0 30px;
      }
      dt {
        font-size: 16px;
        line-height: 24px;
      }
      dd {
        font-size: 16px;
        line-height: 24px;
        a {
          text-decoration: underline;
        }
      }
    }

    .header-card {
      // maturity alert
      .alert-maturity {
        margin-top: 40px;
        margin-left: 0px;
      }

      h5 {
        font-size: 30px;
        line-height: 36px;

        &.maturity-provisional {
          margin-left: 34px;
        }
        &.maturity-production {
          margin-left: 34px;
        }
        &::before {
          top: 5.83px;
        }
      }

      // data iri
      .data-iri {
        margin: 0px 0px;
        padding: 0;
      }
      // qname
      .qname {
        margin: 0px 0px;
        padding: 0;
      }
      .url-buttons-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: right;
      }
      // copy url button
      .btn-copy-url {
        font-size: 16px;
        line-height: 24px;
        &::before {
          content: "";
          background-image: url("../assets/icons/copy-url-icon.svg");
          background-repeat: no-repeat;
          background-size: 24px;

          display: block;
          width: 24px;
          height: 24px;
          float: right;
          margin-left: 6px;
        }
      }
      .btn-copy-iri {
        // margin-top: 40px;
      }
      .card {
        background: none;
      }
    }
  }
  .seeMoreBtn {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    margin-top: 20px;
    &::before {
      content: "";
      background-image: url("../assets/icons/down-arrow.svg");
      background-repeat: no-repeat;
      background-size: 12.12px 9.5px;

      display: block;
      width: 12.12px;
      height: 9.5px;
      float: left;
      margin: 8px 12px 12px 6px;
    }
  }
  .seeLessBtn {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    margin-top: 20px;
    &::before {
      content: "";
      background-image: url("../assets/icons/up-arrow.svg");
      background-repeat: no-repeat;
      background-size: 12.12px 9.5px;

      display: block;
      width: 12.12px;
      height: 9.5px;
      float: left;
      margin: 8px 12px 12px 6px;
    }
  }
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>
