<template>
  <!-- eslint-disable max-len -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 col-xxxl-3 d-none d-xxl-block">
        <div class="module-tree float-right">
          <div class="multiselect-xxl-container">
            <multiselect v-model="ontologyVersionsDropdownData.selectedData"
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
                        @select="ontologyVersions_optionSelected">
              <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.label }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
              <!-- <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData" @mousedown.prevent.stop="clearAll(props.search)"></div>
              </template> -->
              <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
            </multiselect>
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.selectedData }}</code></pre> -->
            <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.data }}</code></pre> -->
          </div>

          <ul class="modules-list list-unstyled">
            <module-tree :item="item" v-for="item in modulesList" :location="data" :key="item.label" />
          </ul>
        </div>
      </div>
      <div class="col-12 col-xxl-8 col-xxxl-6">

      <div class="container">
        <a name="ontologyViewerTopOfContainer" id="ontologyViewerTopOfContainer"></a>

        <div class="d-xxl-none multiselect-container">
          <multiselect v-model="searchBox.selectedData"
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
                      :options-limit="300" :limit="3" :limit-text="searchBox_limitText"
                      :max-height="600"
                      :preserve-search="true"
                      :show-no-results="false"
                      :hide-selected="true"
                      :taggable="true"
                      @select="searchBox_optionSelected"
                      @tag="searchBox_addTag"
                      @search-change="searchBox_asyncFind">
            <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.label }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
            <template slot="clear" slot-scope="props">
              <div class="multiselect__clear" v-if="searchBox.selectedData" @mousedown.prevent.stop="clearAll(props.search)"></div>
            </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
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
            <div class="alert alert-danger" role="alert">
              <strong>Error!</strong> Cannot fetch data, please try later.
            </div>
          </div>
        </div>

        <div class="searchResults" v-if="searchBox.selectedData && searchBox.selectedData.isSearch">
          <h5 style="padding-top: 0px; margin-bottom: 20px;">Search results for "{{searchBox.selectedData.iri}}":</h5>
          <div v-if="searchBox.searchResults && searchBox.searchResults.length">
            <div v-for="result in searchBox.searchResults" :key="result" class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-12">
                    <customLink class="custom-link" :name="result.label" :query="result.iri" :customLinkOnClick="searchResultClicked"></customLink>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 text-link">
                    {{result.iri}}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 text">
                    {{result.description}}
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
                    :next-link-class="'page-link'">
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
          <div class="row" v-if="data">
            <div class="col-12">

              <div class="alert alert-primary alert-maturity" role="alert" v-if="data.maturityLevel.label != 'release' && data.maturityLevel.label != ''">
                This resource has maturity level <strong>{{this.data.maturityLevel.label}}</strong>. Read more about
                <customLink class="custom-link" :name="this.data.maturityLevel.label" :query="data.maturityLevel.iri"></customLink>.
              </div>

              <div class="card">
                <div class="card-body">
                  
                  <h5 class="card-title">
                    {{data.label.toUpperCase()}}
                    <a
                      v-if="!data.iri.startsWith('http://')"
                      class="btn btn-sm btn-outline-primary btn-report-a-problem"
                      target="_blank"
                      :href="`https://github.com/edmcouncil/fibo/issues/new` +
                                `?labels=${encodeURI(githubNewIssueDetails().label)}` +
                                `&template=issue.md` +
                                `&title=${encodeURI(githubNewIssueDetails().title)}` +
                                `&body=${encodeURI(githubNewIssueDetails().body)}`"
                      >Report a problem</a>
                    </h5>
                  <h6 class="card-subtitle mb-2 text-muted" v-if="data.iri">
                    {{data.iri}}
                    <button v-clipboard="data.iri" type="button" class="btn btn-sm btn-outline-primary">Copy</button>
                    <button 
                      v-if="this.$route.query && this.$route.query.version"
                      v-clipboard="data.iri + '?version=' + encodeURI(this.$route.query.version)" 
                      type="button" class="btn btn-sm btn-outline-primary">Copy versioned IRI</button>
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted" v-if="data.qName && data.qName !== ''">
                    {{data.qName}}
                    <button v-clipboard="data.qName.replace('QName: ', '')" type="button" class="btn btn-sm btn-outline-primary">Copy</button>
                  </h6>
                  <span v-if="data.taxonomy && data.taxonomy.value">
                    <p v-for="(taxonomy, tIndex) in data.taxonomy.value" :key="'taxonomyParagraph'+tIndex" class="taxonomy">
                      <span v-for="(element,index) in taxonomy" :key="'taxonomyEl'+tIndex+element.iri">
                        <customLink :name="element.label" :query="element.iri"></customLink>
                        <span
                          class="card-subtitle mb-2 text-muted"
                          v-if="index != Object.keys(taxonomy).length - 1"
                        >&nbsp;>&nbsp;</span>
                      </span>
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="module-tree col-md-12 col-lg-4 d-xxl-none">
              <div class="multiselect-container">
                <multiselect v-model="ontologyVersionsDropdownData.selectedData"
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
                            @select="ontologyVersions_optionSelected">
                  <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.label }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
                  <!-- <template slot="clear" slot-scope="props">
                    <div class="multiselect__clear" v-if="ontologyVersionsDropdownData.selectedData" @mousedown.prevent.stop="clearAll(props.search)"></div>
                  </template> -->
                  <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                </multiselect>
                <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.selectedData }}</code></pre> -->
                <!-- <pre class="language-json"><code>{{ ontologyVersionsDropdownData.data }}</code></pre> -->
              </div>

              <ul class="modules-list list-unstyled">
                <module-tree :item="item" v-for="item in modulesList" :location="data" :key="item.label" />
              </ul>
              <div class="text-center" v-if="!modulesList && !error">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-lg-8 col-xxl-12" v-if="data">
              <div class="row">
                <div
                  class="col-md-12"
                  v-for="(section, sectionName) in data.properties"
                  :key="sectionName"
                >
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{{sectionName}}</h5>
                      <dl
                        class="row"
                        v-for="( property, name ) in data.properties[sectionName]"
                        :key="name"
                      >
                        <dt class="col-sm-12">{{name}}</dt>
                        <dd class="col-sm-12">
                          <ul v-if="property.length > 1">
                            <li
                              v-for="field in property"
                              :key="field.id"
                            >
                              <component
                                :is="field.type"
                                :value="field.value"
                                :entityMaping="field.entityMaping"
                                v-bind="field"
                              ></component>
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
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="data && data.graph">
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Data model for {{data.label}}</h5>
                      <vis-network :data="data.graph" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-lg-8 col-xxl-12" v-else>
              <main  v-if="!loader">
                <article>
                  <h1>
                    <span>FIBO Viewer</span>
                  </h1>
                  <h4>How to use FIBO Viewer</h4>

                  <p class="text">To start using FIBO Viewer, search for interesting concepts by walking through the FIBO directory structure on the left-hand side or use the full-text search function.</p>

               <h4>FIBO time machine</h4>

                <p class="text">FIBO Viewer allows for browsing the past versions of FIBO. It also helps developers to see the changes proposed to FIBO in pull requests before their approval. To see the content of the past FIBO releases or recent pull requests, choose them from the drop-down list.</p>


                  <h4>FIBO structure</h4>
<!--                   <p class="text">
                    To fully benefit from the FIBO Viewer, one should keep in mind two very important things about FIBO.
                  </p> -->

                  <p class="text">
                    <b>FIBO is a set of ontologies. It is organized in a hierarchical directory structure.</b> 
                    Top-level directories are called <i>domains</i>; beneath that may be one or two levels of <i>sub-domain</i>
                    and then <i>modules</i> and dozens of <i>ontologies</i> at the bottom level, e.g.:
                  </p>

                  <ul>
                    <li><a href="https://spec.edmcouncil.org/fibo/ontology/BE/MetadataBE/BEDomain">Business Entities</a> (FIBO domain)
                      <ul>
                        <li>
                            <a href="https://spec.edmcouncil.org/fibo/ontology/BE/LegalEntities/MetadataBELegalEntities/LegalEntitiesModule">Legal Entities</a> (FIBO module)
                              <ul>
                                <li>
                                  <a href="https://spec.edmcouncil.org/fibo/ontology/BE/LegalEntities/LEIEntities/">Legal Entity Identifier (LEI) Entities Ontology</a>  (FIBO ontology)
                                </li>
                              </ul>
                            
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <p class="text">
                    On the left-hand side, there is a list of eleven FIBO Domains, starting with the <a href="https://spec.edmcouncil.org/fibo/ontology/BE/MetadataBE/BEDomain">Business Entities</a> at the top and ending with <a href="https://spec.edmcouncil.org/fibo/ontology/SEC/MetadataSEC/SECDomain">Securities</a> at the bottom.
                  </p>

                  <h4>FIBO maturity levels</h4>
                  <p class="text">
                    Each FIBO ontology has one of <strong>three levels of maturity</strong>.
                  </p>

                  <p class="">
                    <strong>release</strong>
                  </p>
                  <ul class="maturity-levels">
                    <li>
                      Release ontologies are ones that are considered to be stable and mature from a development perspective.
                    </li>
                  </ul>

                  <p class="">
                    <strong>provisional</strong>
                  </p>
                  <ul class="maturity-levels">
                    <li>
                      Provisional ontologies are ones that are considered to be under development.
                    </li>
                  </ul>

                  <p class="">
                    <strong>informative</strong>
                  </p>
                  <ul class="maturity-levels">
                    <li>
                      Provisional ontologies are ones that are considered deprecated but included for informational purposes because they are referenced by some provisional concept.
                    </li>
                  </ul>


                  <p p class="text"><b>FIBO production</b> is made up of the release ontologies only. </p> 

                  <p p class="text"><b>FIBO development</b> is made up of all ontologies, i.e., those that are released, provisional, and informative.</p> 

                <p class="text">FIBO Viewer uses colors to indicate the status of an ontology. Each ontology is either <font color="#51d355">green</font> or <font color="#f1df3f">yellow</font>. The <font color="#51d355">green</font> color indicates that an ontology has a "release" maturity level, whereas <font color="#f1df3f">yellow</font> means that it provisional or informative. Domains or modules are <font color="#51d355">green</font> (<font color="#f1df3f">yellow</font>) if they contain only <font color="#51d355">green</font> (<font color="#f1df3f">yellow</font>) ontologies. Domains or modules are <font color="#51d355">green</font>-<font color="#f1df3f">yellow</font> is they include <font color="#51d355">green</font> and <font color="#f1df3f">yellow</font> ontologies.</p> 

<!-- 

                  <br>
                  <p class="text">
                    One can see the maturity level for each FIBO ontology, see e.g.
                    <a href="https://spec.edmcouncil.org/fibo/ontology/BE/FunctionalEntities/FunctionalEntities/">https://spec.edmcouncil.org/fibo/ontology/BE/FunctionalEntities/FunctionalEntities/</a>
                  </p> -->

                  <h4>About FIBO Viewer</h4>
                  <p class="text">
                    FIBO Viewer is a JAVA application that is specifically designed to access both the FIBO structure and its content
                    in the easiest possible way. It can serve both as a web application and REST API. FIBO Viewer is an open-source project that EDM Council hosts.  See <a href="https://github.com/edmcouncil/fibo-viewer">https://github.com/edmcouncil/fibo-viewer</a> for details.
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
          <multiselect v-model="searchBox.selectedData"
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
                      :options-limit="300" :limit="3" :limit-text="searchBox_limitText"
                      :max-height="600"
                      :preserve-search="true"
                      :show-no-results="false"
                      :hide-selected="true"
                      :taggable="true"
                      @select="searchBox_optionSelected"
                      @tag="searchBox_addTag"
                      @search-change="searchBox_asyncFind">
            <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.label }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
            <template slot="clear" slot-scope="props">
              <div class="multiselect__clear" v-if="searchBox.selectedData" @mousedown.prevent.stop="clearAll(props.search)"></div>
            </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
          </multiselect>
          <!-- <pre class="language-json"><code>{{ searchBox.selectedData }}</code></pre> -->
          <!-- <pre class="language-json"><code>{{ searchBox.data }}</code></pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect';
import Paginate from 'vuejs-paginate';
import { getOntology, getModules, getHint, getOntologyVersions } from '../api/ontology';

export default {
  components: {
    AXIOM: () => import(/* webpackChunkName: "AXIOM" */ '../components/chunks/AXIOM'),
    STRING: () => import(/* webpackChunkName: "STRING" */ '../components/chunks/STRING'),
    DIRECT_SUBCLASSES: () => import(/* webpackChunkName: "DIRECT_SUBCLASSES" */ '../components/chunks/DIRECT_SUBCLASSES'),
    MODULES: () => import(/* webpackChunkName: "MODULES" */ '../components/chunks/MODULES'),
    IRI: () => import(/* webpackChunkName: "IRI" */ '../components/chunks/IRI'),
    INSTANCES: () => import(/* webpackChunkName: "INSTANCES" */ '../components/chunks/INSTANCES'),
    ANY_URI: () => import(/* webpackChunkName: "ANY_URI" */ '../components/chunks/ANY_URI'),
    VisNetwork: () => import(/* webpackChunkName: "ANY_URI" */ '../components/VisNetwork'),
    Multiselect,
    Paginate,
  },
  props: ['ontology'],
  data() {
    return {
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
        'url': ''
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
        const element = document.getElementById('ontologyViewerTopOfContainer');

        const rect = element.getBoundingClientRect();
        const scrollTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);

        window.scrollTo(0, scrollTop);
        this.$root.ontologyRouteIsUpdating = false;
      },
      githubNewIssueDetails() {
        const ontologyQuery = this.data.iri.replace('https://spec.edmcouncil.org/fibo/ontology/', '');
        const label = ontologyQuery.substring(0, ontologyQuery.indexOf('/'));
        return {
          label,
          title: `Problem with ${this.data.label.toUpperCase()}`,
          body: `Resource URL:\n${this.data.iri}`
        }
      }
    };
  },
  mounted() {
    let queryParam = '';

    if (this.$route.params && this.$route.params[1]) {
      const ontologyQuery = window.location.pathname.replace('/fibo/ontology/', '');
      queryParam = `https://spec.edmcouncil.org/fibo/ontology/${ontologyQuery}`;
      // this.githubNewIssue.title = this.githubNewIssue.titleTemplate.replace('<LABEL>', this.githubNewIssue.label);
    } else if (this.$route.query && this.$route.query.query) {
      queryParam = this.$route.query.query || '';
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
        this.ontologyServer = this.ontologyServer.replace('{version}', internalRoute.query.version + '/');
        this.modulesServer = this.modulesServer.replace('{version}', internalRoute.query.version + '/');
        this.hintServer = this.hintDefaultDomain.replace('{version}', internalRoute.query.version + '/');
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

        this.loader = false;
      }
      
      try {
        const result = await getOntologyVersions();
        const ontologyVersions = await result.json();
        this.ontologyVersionsDropdownData.data = ontologyVersions;
        ontologyVersions.unshift(this.versionDefaultSelectedData); // add default at the beginning

        if (this.version !== null) {
          this.ontologyVersionsDropdownData.selectedData = ontologyVersions.find((val, ind) => {
            if (val['@id'] === this.version){
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
      if(selectedOntologyVersion['@id'] === this.versionDefaultSelectedData['@id']){
        //default selected
        const {version, ...rest} = this.$route.query; //get rid of version
        this.$router.push({ query: rest });
      }else{
        this.$router.push({
          query: {
            ...this.$route.query,
            ...{
              version: encodeURI(selectedOntologyVersion['@id'])
            }
          }
        });
      }

      //clear search results after changing version
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
      if (destRoute.startsWith('https://spec.edmcouncil.org/fibo')) {
        // internal ontology
        destRoute = destRoute.replace('https://spec.edmcouncil.org/fibo', '');
        this.$router.push({
          path: destRoute,
          query: {
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null)
          }
        });
      } else {
        // external ontology
        this.$router.push({
          path: '/ontology',
          query: {
            ...{ query: encodeURI(destRoute) },
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null)
          }
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
            : null)
        }
      });
    },
    async handleSearchBoxQuery(searchBQuery, pageIndex = null) {
      try {
        const result = await getOntology(searchBQuery, this.ontologyServer + (pageIndex != null ? `/page/${pageIndex}` : ''));
        const body = await result.json();
        if (body.type !== 'list') {
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
  },
  computed: {
    ...mapState({
      ontologyDefaultDomain: state => state.ontologyDefaultDomain,
      modulesDefaultDomain: state => state.modulesDefaultDomain,
    }),
  },
  watch: {
    '$route.query.query': function (query) {
      this.fetchData(query);
    },
    '$route.query.version': function (version) {
      this.updateServers();
      
      this.fetchData(this.query);
      this.fetchModules();

      //clear search results after changing version
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
      (this.$root.ontologyRouteIsUpdating)
      || (this.$route.query.scrollToTop === 'true')
    ) {
      this.searchBox.selectedData = null; // to hide search results after rerouting on ontology page
    }
    this.scrollToOntologyViewerTopOfContainer(); // move it to above IF to scroll only after internal navigaion (not on page load)

    if (
      this.$route.query.searchBoxQuery
      && (this.$route.query.searchBoxQuery_isExecuted !== true)
    ) {
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
.alert-maturity{
  margin: 20px;
}
.card {
  margin: 20px;
  background: #f3f3f3;
}
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
@media (min-width: 1px){
  .modules-list {
    margin: 20px 0 0 20px;
  }
}
@media (min-width: 1900px){
  .modules-list {
    margin: 30px 0 0 20px;
  }
}
article ul.maturity-levels li{
  line-height: 1.5;
}
article ul.maturity-levels li:before{
  margin-top: 10px;
}
.searchResults{
  margin: 20px 20px 20px 20px;
}
.searchResults a{
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
}
.searchResults .text{
  color: #707070;
}
.searchResults .text-link{
  color: #adb5bd;
}
.border-bottom{
  margin-bottom: 5px;
}
.multiselect-container{
  margin: 20px 20px 0px 20px;
}
.multiselect-xxl-container{
  margin-top: 20px;
  min-width: 250px;
}
.btn-report-a-problem{
  // position: absolute;
  // top: 1.25rem;
  // right: 1.25rem;
  float: right;
  background-color: rgb(46, 164, 79);
  color: white;
  border-color: rgba(27, 31, 35, 0.15);
}
</style>

<style lang="scss">
@media (min-width: 1px){
  #ontograph{
    height: 500px;
  }
}
@media (min-width: 1900px){
  #ontograph{
    height: 1000px;
  }
}
@media (min-width: 992px){
  .module-tree .multiselect-container {
    margin-right: 0px;
  }
}
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: #f3f3f3;
  color: #000;
}
.pagination{
  width: min-content;
  padding: unset;
  margin: 20px auto 0px;
  .page-item {
    padding-left: 0px;
    &:before {
      display: none;
    }
  }
  .page-item.active{
    .page-link{
      background-color: #2a83be;
    }
  }
}
dd{
  margin-left: 20px;

  ul{
    padding-left: 0px;
  }

  > div{
    margin-top: 5px;
    margin-left: 7px;
  }
}
</style>
