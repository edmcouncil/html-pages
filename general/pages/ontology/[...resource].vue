<template>
  <Head>
    <Title>{{ title }}</Title>
  </Head>
  <div>
    <div class="container ontology-container">
      <HowToUseTopBanner
        :ontologyNameUppercase="ontologyNameUppercase"
        :howToUseHandler="howToUseHandler"
      />
      <div class="row">
        <!-- secondary column -->
        <div class="col-lg-4 col-xl-3 d-none d-lg-block secondary-column">
          <div class="module-tree">
            <transition name="slowfade">
              <div
                v-if="hasVersions"
                class="secondary-column__versions multiselect-container"
              >
                <div
                  class="secondary-column__versions__header"
                >
                  {{ ontologyNameUppercase }} Versions
                </div>
                <div class="menu-box">
                  <div class="activators-container">
                    <div
                      class="versions-activator multiselect-activator"
                      v-if="!ontologyVersions.dropdownActive.version"
                      @click="$refs.versionsSelectDesktop.activate()"
                      @keydown="$refs.versionsSelectDesktop.activate()"
                    ></div>
                  </div>
                  <div class="menu-box__label">
                    Select {{ ontologyNameUppercase }} version
                  </div>
                  <div class="menu-box__content-text">
                    <multiselect
                      v-if="ontologyVersions.isGrouped"
                      v-model="ontologyVersions.selectedData"
                      ref="versionsSelectDesktop"
                      label="@id"
                      track-by="url"
                      placeholder="Select..."
                      tagPlaceholder="Select..."
                      selectLabel=""
                      open-direction="bottom"
                      :options="ontologyVersions.data"
                      :multiple="false"
                      :searchable="false"
                      :loading="ontologyVersions.isLoading"
                      :internal-search="false"
                      :clear-on-select="false"
                      :close-on-select="true"
                      :max-height="600"
                      :preserve-search="true"
                      :show-no-results="false"
                      :hide-selected="true"
                      :taggable="true"
                      group-values="versions"
                      group-label="group"
                      :group-select="false"
                      @select="ontologyVersions_optionSelected"
                      @open="ontologyVersions.dropdownActive.version = true"
                      @close="ontologyVersions.dropdownActive.version = false"
                    >
                      <template v-slot:tag="{ option }">
                        <span class="custom__tag">
                          <span>{{ option.label }}</span>
                        </span>
                      </template>
                    </multiselect>
                    <multiselect
                      v-else
                      v-model="ontologyVersions.selectedData"
                      ref="versionsSelectDesktop"
                      label="@id"
                      track-by="url"
                      placeholder="Select..."
                      tagPlaceholder="Select..."
                      selectLabel=""
                      open-direction="bottom"
                      :options="ontologyVersions.data"
                      :multiple="false"
                      :searchable="false"
                      :loading="ontologyVersions.isLoading"
                      :internal-search="false"
                      :clear-on-select="false"
                      :close-on-select="true"
                      :max-height="600"
                      :preserve-search="true"
                      :show-no-results="false"
                      :hide-selected="true"
                      :taggable="true"
                      @select="ontologyVersions_optionSelected"
                      @open="ontologyVersions.dropdownActive.version = true"
                      @close="ontologyVersions.dropdownActive.version = false"
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
                <transition name="comparedropdown" mode="in-out">
                  <div
                    v-show="versionCompare.isCompareExpanded"
                    class="compare-dropdown-wrapper"
                  >
                    <div
                      class="compare-icon"
                      @click="swapSelectedVersions()"
                      @keydown="swapSelectedVersions()"
                    ></div>
                    <div class="menu-box">
                      <div class="activators-container">
                        <div
                          class="versions-activator multiselect-activator"
                          v-if="!ontologyVersions.dropdownActive.compare"
                          @click="$refs.compareSelectDesktop.activate()"
                          @keydown="$refs.compareSelectDesktop.activate()"
                        ></div>
                      </div>
                      <div class="menu-box__label">Compare with...</div>
                      <div class="menu-box__content-text">
                        <multiselect
                          v-if="ontologyVersions.isGrouped"
                          v-model="versionCompare.selectedCompareData"
                          ref="compareSelectDesktop"
                          label="@id"
                          track-by="url"
                          placeholder="Select..."
                          tagPlaceholder="Select..."
                          selectLabel=""
                          open-direction="bottom"
                          :options="ontologyVersions.data"
                          :multiple="false"
                          :searchable="false"
                          :loading="ontologyVersions.isLoading"
                          :internal-search="false"
                          :clear-on-select="false"
                          :close-on-select="true"
                          :max-height="600"
                          :preserve-search="true"
                          :show-no-results="false"
                          :hide-selected="true"
                          :taggable="true"
                          group-values="versions"
                          group-label="group"
                          :group-select="false"
                          @select="ontologyVersions_compareOptionSelected"
                          @open="ontologyVersions.dropdownActive.compare = true"
                          @close="ontologyVersions.dropdownActive.compare = false"
                        >
                          <template v-slot:tag="{ option }">
                            <span class="custom__tag">
                              <span>{{ option.label }}</span>
                            </span>
                          </template>
                        </multiselect>
                        <multiselect
                          v-else
                          v-model="versionCompare.selectedCompareData"
                          ref="compareSelectDesktop"
                          label="@id"
                          track-by="url"
                          placeholder="Select..."
                          tagPlaceholder="Select..."
                          selectLabel=""
                          open-direction="bottom"
                          :options="ontologyVersions.data"
                          :multiple="false"
                          :searchable="false"
                          :loading="ontologyVersions.isLoading"
                          :internal-search="false"
                          :clear-on-select="false"
                          :close-on-select="true"
                          :max-height="600"
                          :preserve-search="true"
                          :show-no-results="false"
                          :hide-selected="true"
                          :taggable="true"
                          @select="ontologyVersions_compareOptionSelected"
                          @open="ontologyVersions.dropdownActive.compare = true"
                          @close="ontologyVersions.dropdownActive.compare = false"
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
                class="secondary-column__tree multiselect-container"
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
                :isComparing="isComparing"
              />
            </transition>
          </div>
        </div>

        <!-- main col -->
        <div class="col-12 col-lg-8 col-xl-9 main-column">
          <div class="container px-0 d-none d-lg-block">
            <!-- search box large -->
            <div class="search-box search-box--desktop card">
              <div class="row">
                <div class="col-lg-12">
                  <div class="multiselect-container">
                    <div class="menu-box">
                      <div class="activators-container">
                        <div
                          class="search-input-activator multiselect-activator"
                          v-if="$refs.searchBoxInputDesktop && !$refs.searchBoxInputDesktop.isOpen"
                          @click="$refs.searchBoxInputDesktop.activate()"
                          @keydown="$refs.searchBoxInputDesktop.activate()"
                        ></div>
                        <div
                          class="search-icon-activator multiselect-activator"
                          @click="() => {
                            searchBox.inputValue
                              ? searchBox_addTag(searchBox.inputValue)
                              : $refs.searchBoxInputDesktop.activate()
                          }"
                          @keydown="() => {
                            searchBox.inputValue
                              ? searchBox_addTag(searchBox.inputValue)
                              : $refs.searchBoxInputDesktop.activate()
                          }"
                        ></div>
                      </div>
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
                @keydown="
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
              class="advanced-search-box advanced-search-box--desktop card"
              v-show="searchBox.isAdvancedExpanded"
            >
              <div class="row">
                <div class="col-lg-12">
                  <div class="multiselect-container">
                    <div class="menu-box">
                      <div class="activators-container">
                        <div
                          class="advanced-input-activator multiselect-activator"
                          v-if="$refs.advancedInputDesktop && !$refs.advancedInputDesktop.isOpen"
                          @click="$refs.advancedInputDesktop.activate()"
                          @keydown="$refs.advancedInputDesktop.activate()"
                        ></div>
                      </div>
                      <div class="menu-box__label">
                        Select search properties
                      </div>
                      <div class="menu-box__content-text">
                        <multiselect
                          v-model="searchBox.findProperties"
                          ref="advancedInputDesktop"
                          placeholder="Select properties..."
                          open-direction="bottom"
                          label="label"
                          track-by="identifier"
                          :searchable="false"
                          :options="searchBox.findPropertiesAll"
                          :close-on-select="false"
                          :multiple="true"
                          @select="onPropertiesChanged"
                          @remove="onPropertiesChanged"
                        >
                          <template v-slot:option="props">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :name="props.option.identifier"
                                :checked="props.option.selected"
                              />
                              <label
                                class="form-check-label"
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
                    <div class="form-check form-switch">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="useHighlight"
                        v-model="searchBox.useHighlighting"
                      />
                      <label class="form-check-label" for="useHighlight">
                        Use highlighting
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- mobile multiselects -->
          <div class="secondary-column--mobile container px-0 d-lg-none">
            <MobileMenuBox
              v-if="hasVersions"
              class="secondary-column__versions secondary-column__versions--mobile"
              :icon="'icon-clock'"
            >
              <template v-slot:label> Select version </template>
              <template v-slot:multiselect>
                <div
                  class="multiselect-container secondary-column__versions
                  secondary-column__versions--mobile"
                >
                  <multiselect
                    v-if="ontologyVersions.isGrouped"
                    v-model="ontologyVersions.selectedData"
                    id="ontologyVersionsMultiselect2"
                    label="@id"
                    track-by="url"
                    placeholder="Search..."
                    tagPlaceholder="Search for..."
                    selectLabel=""
                    open-direction="bottom"
                    :options="ontologyVersions.data"
                    :multiple="false"
                    :searchable="false"
                    :loading="ontologyVersions.isLoading"
                    :internal-search="false"
                    :clear-on-select="false"
                    :close-on-select="true"
                    :preserve-search="true"
                    :show-no-results="false"
                    :hide-selected="true"
                    :taggable="true"
                    group-values="versions"
                    group-label="group"
                    :group-select="false"
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
                  <multiselect
                    v-else
                    v-model="ontologyVersions.selectedData"
                    id="ontologyVersionsMultiselect2"
                    label="@id"
                    track-by="url"
                    placeholder="Search..."
                    tagPlaceholder="Search for..."
                    selectLabel=""
                    open-direction="bottom"
                    :options="ontologyVersions.data"
                    :multiple="false"
                    :searchable="false"
                    :loading="ontologyVersions.isLoading"
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
                    @keydown="searchBox_addTag(searchBox.inputValue)"
                  ></div>
                </div>
              </template>
            </MobileMenuBox>

            <div
              class="expand-advanced-btn expand-advanced-btn--mobile"
              @click="
                searchBox.isAdvancedExpanded = !searchBox.isAdvancedExpanded
              "
              @keydown="
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
                      @select="onPropertiesChanged"
                      @remove="onPropertiesChanged"
                    >
                    </multiselect>
                  </div>
                </template>
              </MobileMenuBox>

              <div class="d-flex justify-content-between align-items-center">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="useHighlight"
                    v-model="searchBox.useHighlighting"
                  />
                  <label class="form-check-label" for="useHighlight">
                    Use highlighting
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="container px-0">
            <div
              ref="ontologyViewerTopOfContainer"
            ></div>
          </div>

          <!-- errors -->
          <Errors :error="error" />

          <div
            class="text-center mt-5"
            v-if="isLoader"
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div style="margin-bottom: 100vh"></div>
          </div>

          <!-- search results -->
          <SearchResults
            v-else-if="
              searchBox.selectedData && searchBox.selectedData.isSearch
            "
            :searchBox="searchBox"
          />

          <div
            class="container"
            v-else-if="
              !searchBox.selectedData || !searchBox.selectedData.isSearch
            "
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

              <EntityNotFound
                v-else-if="!loader && !isComparing && error.entityNotFound"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapActions } from 'pinia';
import { useServersStore } from '@/stores/servers';
import { useConfigurationStore } from '@/stores/configuration';
import {
  getEntity,
  getModules,
  getOntologyVersions,
  getFindSearch,
  getFindProperties,
  getJenkinsJobs,
} from '../api/ontology';
import {
  generateTitleAndDescription,
  handleDeprecatedResource,
} from '../helpers/ontology';
import { mergeData } from '../helpers/compare';

export default {
  name: 'OntologyView',
  props: ['ontology'],
  components: {
    Multiselect
  },
  setup() {
    defineRouteRules({
      ssr: false,
      prerender: false,
      redirect: false,
    })
    definePageMeta({
      keepalive: true,
      key: 'ontology',
      layout: 'minimal',
      redirect: false,
      middleware: defineNuxtRouteMiddleware((to, from) => {
        console.log('definePageMeta middleware');
        console.log('to', to);
        console.log('from', from);
      }),
    });
  },
  beforeRouteEnter(to, from) {
    console.log('beforeRouteEnter')
    console.log('beforeRouteEnter to', to)
  },
  data() {
    return {
      title: 'Ontology Viewer',
      description: '',
      loader: this.loader || false,
      data: this.data || null,
      mergedData: this.mergedData || null,
      query: this.query || '',
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
        inputValue: '',
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
        encodedProperties: '',
        useHighlighting: true,
        dropdownActive: false,
      },
      ontologyVersions: this.ontologyVersions || {
        isGrouped: false,
        isLoading: false,
        defaultData: {
          '@id': 'current',
          url: '',
        },
        data: [],
        selectedData: null,
        dropdownActive: {
          version: false,
          compare: false
        }
      },
      versionCompare: this.versionCompare || {
        isCompareExpanded: false,
        compareData: [],
        selectedCompareData: null,
        isSwappingVersion: false,
      },
    };
  },
  mounted() {
    let queryParam = '';

    // PLACEHOLDER
    console.log('mounted', this.$route);

    const pathParams = this.$route.params?.resource;
    if (pathParams && pathParams[1]?.length > 0) {
      const fullPath = window.location.pathname;

      const pathPrefix = 'ontology/';
      const index = fullPath.indexOf(pathPrefix);
      const { length } = pathPrefix;

      const ontologyQuery = fullPath.slice(index + length);
      queryParam = `${this.uriSpace}${ontologyQuery}`;
    } else if (this.$route.query && this.$route.query.query) {
      queryParam = encodeURIComponent(this.$route.query.query)
          + encodeURIComponent(this.$route.hash) || '';
    }
    this.query = queryParam;

    // PLACEHOLDER
    console.log('this.query',this.query);

    this.updateServers(this.$route);
    this.fetchData(this.query);
    this.fetchModules();
    this.fetchVersions();
    this.fetchSearchProperties();

    // disable input autocomplete in multiselect
    this.$refs.searchBoxInputMobile.$refs.search.setAttribute(
      'autocomplete',
      'off',
    );
    this.$refs.searchBoxInputDesktop.$refs.search.setAttribute(
      'autocomplete',
      'off',
    );

    if (this.$route.query.search) {
      this.clearSearchResults();
      const searchQuery = decodeURI(this.$route.query.search);
      this.searchBox.inputValue = searchQuery;
      this.$refs.searchBoxInputDesktop.search = searchQuery;
      this.$refs.searchBoxInputMobile.search = searchQuery;
      const { page } = this.$route.query;
      this.handleSearchBoxQuery(searchQuery, page);
    }
  },
  methods: {
    ...mapActions(useServersStore, ['updateServers', 'updateCompareServers']),
    async fetchData(iri, options) {
      const noScroll = options?.noScroll;
      if (iri) {
        if (!noScroll) this.scrollToOntologyViewerTopOfContainer();
        this.loader = true;
        this.data = null;
        this.mergedData = null;
        try {
          const query = `${this.ontologyServer}?iri=${iri}`;
          const result = await getEntity(query);
          const body = await result.json();
          if (body.type !== 'details') {
            console.error(`body.type: ${body.type}, expected: details`);
          }

          const { title, description } = generateTitleAndDescription(body);
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
      }
    },
    async fetchVersions() {
      try {
        const result = await getOntologyVersions(
          `/${this.ontologyName}/ontology/api/`,
        );
        const ontologyVersions = await result.json();

        const first = 'master/latest';
        ontologyVersions.sort((x, y) => (x['@id'] == first ? -1 : y['@id'] == first ? 1 : 0));

        this.ontologyVersions.data = ontologyVersions;

        // apply default branch name from configuration
        if (this.defaultBranchName) {
          this.ontologyVersions.defaultData['@id'] = this.defaultBranchName;
        }

        ontologyVersions.unshift(this.ontologyVersions.defaultData); // add default at the beginning

        if (this.version != null) {
          this.ontologyVersions.selectedData = ontologyVersions.find((val) => {
            if (val['@id'] === this.version) {
              return true;
            }
            return false;
          });
        } else {
          this.ontologyVersions.selectedData = this.ontologyVersions.defaultData;
        }
        if (this.compareVersion != null) {
          this.versionCompare.selectedCompareData = ontologyVersions.find(
            (val) => {
              if (val['@id'] === this.compareVersion) {
                return true;
              }
              return false;
            },
          );this.jenkinsJobUrl
        } else {
          this.versionCompare.selectedCompareData = this.ontologyVersions.defaultData;
        }
        this.error.versions = false;
      } catch (err) {
        console.error(err);
        this.error.versions = true;
      }

      if (this.jenkinsJobUrl) {
        try {
          let { jenkinsJobUrl } = this;

          if (jenkinsJobUrl.endsWith('/')) {
            jenkinsJobUrl = jenkinsJobUrl.slice(0, -1);
          }

          const runtimeConfig = useRuntimeConfig();
          const tagName = runtimeConfig.public.tagName;

          // group versions by tags, pull requests and releases
          const tagsResult = await getJenkinsJobs(
            `${jenkinsJobUrl}/view/tags/api/json`
          );
          const tagsJson = await tagsResult.json();
          const tags = tagsJson.jobs.map((item) => item.name.toLowerCase());

          const pullRequestsResult = await getJenkinsJobs(
            `${jenkinsJobUrl}/view/change-requests/api/json`,
          );
          const pullRequestsJson = await pullRequestsResult.json();
          const pullRequests = pullRequestsJson.jobs.map((item) => item.name.toLowerCase());

          const defaultViewResult = await getJenkinsJobs(
            `${jenkinsJobUrl}/view/default/api/json`,
          );
          const defaultViewJson = await defaultViewResult.json();
          const defaultView = defaultViewJson.jobs.map((item) => item.name.toLowerCase());

          // group versions
          const defaultGroup = [];
          const pullRequestsGroup = [];
          const tagsGroup = [];
          const otherGroup = [];

          for (const version of this.ontologyVersions.data) {
            let versionToCompare = version['@id'].toLowerCase();
            if (versionToCompare.endsWith(`/${tagName}`)) {
              versionToCompare = versionToCompare.replace(`/${tagName}`, '');
            }
            versionToCompare = versionToCompare.replace('/', '_');

            if (
              versionToCompare === 'master'
              || versionToCompare === this.defaultBranchName
            ) otherGroup.push(version);
            else if (tags.find((item) => item == versionToCompare)) tagsGroup.push(version);
            else if (pullRequests.find((item) => item == versionToCompare)) pullRequestsGroup.push(version);
            else if (defaultView.find((item) => item == versionToCompare)) defaultGroup.push(version);
          }

          const options = [];

          if (otherGroup.length > 0) options.push({ group: 'Default', versions: otherGroup });
          if (tagsGroup.length > 0) options.push({ group: 'Releases', versions: tagsGroup });
          if (pullRequestsGroup.length > 0) {
            options.push({
              group: 'Pull requests',
              versions: pullRequestsGroup,
            });
          }
          if (defaultGroup.length > 0) options.push({ group: 'Branches', versions: defaultGroup });

          this.ontologyVersions.isGrouped = true;
          this.ontologyVersions.data = options;
        } catch (err) {
          this.ontologyVersions.isGrouped = false;
          console.error(err);
        }
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
          `${this.searchServer}/properties`,
        );
        this.searchBox.findPropertiesAll = await result.json();

        if (this.searchBox.findPropertiesAll.length > 0) {
          this.searchBox.findProperties.push(
            this.searchBox.findPropertiesAll.find(
              (property) => property.identifier === 'rdfs_label',
            ),
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
        getEntity(`${this.ontologyServerCompare}?iri=${iri}`),
      ];

      const results = await Promise.allSettled(promises);

      // get data 1
      try {
        const result1 = results[0];
        if (result1.status === 'rejected') {
          const error = new Error(result1.reason.message);
          error.status = result1.reason.status;
          throw error;
        }
        const body = await result1.value.json();
        if (body.type !== 'details') {
          console.error(`body.type: ${body.type}, expected: details`);
        }

        const { title, description } = generateTitleAndDescription(body);
        this.title = title || this.title;
        this.description = description || this.description;

        handleDeprecatedResource(body);

        data1 = body.result;
        savedData = data1;
        this.error.entityNotFound = false;
      } catch (err) {
        if (err.status === 404) {
          data1 = {
            label: 'Resource not Found',
            iri: '',
            maturityLevel: {},
          };
          this.error.entityNotFound = true;
        } else {
          data1 = {
            label: 'Error fetching data',
            iri: '',
            maturityLevel: {},
          };
        }
      }

      // get data 2
      try {
        const result2 = results[1];
        if (result2.status === 'rejected') {
          const error = new Error(result2.reason.message);
          error.status = result2.reason.status;
          throw error;
        }
        const body = await result2.value.json();

        if (body.type !== 'details') {
          console.error(`body.type: ${body.type}, expected: details`);
        }

        handleDeprecatedResource(body);

        data2 = body.result;
      } catch (err) {
        if (err.status === 404) {
          // handle compare resource not found
          data2 = {
            label: 'Resource not Found',
            iri: '',
            maturityLevel: {},
          };
        } else {
          data2 = {
            label: 'Error fetching data',
            iri: '',
            maturityLevel: {},
          };
        }
      }

      this.error.entityData = false;

      // merge data 1 and 2
      const mergedData = mergeData(data1, data2);

      this.mergedData = mergedData;

      this.loader = false;
      this.data = savedData;
    },
    // vue-multiselect ontologyVersions
    ontologyVersions_optionSelected(selectedOntologyVersion) {
      if (
        selectedOntologyVersion['@id']
        === this.ontologyVersions.defaultData['@id']
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
    ontologyVersions_compareOptionSelected(selectedOntologyVersion) {
      if (
        selectedOntologyVersion['@id']
        && selectedOntologyVersion['@id']
          !== this.ontologyVersions.selectedData['@id']
        && selectedOntologyVersion['@id']
          !== this.ontologyVersions.defaultData['@id']
      ) {
        this.updateCompareServers(selectedOntologyVersion['@id']);
        this.fetchCompareDataAndMerge(this.query);
      } else if (
        selectedOntologyVersion['@id']
        === this.ontologyVersions.defaultData['@id']
      ) {
        this.updateCompareServers(null);
        this.fetchCompareDataAndMerge(this.query);
      } else {
        this.updateCompareServers(selectedOntologyVersion['@id']);
        this.fetchData(this.query, { noScroll: true });
      }
    },
    swapSelectedVersions() {
      if (this.loader) return;

      const version = this.ontologyVersions.selectedData;
      const versionCompare = this.versionCompare.selectedCompareData;

      if (!version || !versionCompare) return;

      this.ontologyVersions.selectedData = versionCompare;
      this.versionCompare.selectedCompareData = version;

      if (version['@id'] !== this.ontologyVersions.defaultData['@id']) this.updateCompareServers(version['@id']);
      else this.updateCompareServers(null);

      this.ontologyVersions_optionSelected(versionCompare);

      // for scroll behavior management purposes
      this.versionCompare.isSwappingVersion = true;
    },
    compareButtonHandler(isCompareExpanded) {
      this.versionCompare.isCompareExpanded = isCompareExpanded;
      if (
        isCompareExpanded
        && this.versionCompare.selectedCompareData
        && this.versionCompare.selectedCompareData['@id']
          !== this.ontologyVersions.selectedData['@id']
      ) {
        this.fetchCompareDataAndMerge(this.query);
      } else if (!isCompareExpanded && this.data == null) this.fetchData(this.query, { noScroll: true });
    },
    // vue-multiselect
    searchBox_limitText(count) {
      return `and ${count} other results`;
    },
    searchBox_optionSelected(selectedOption /* , id */) {
      if (this.$refs.mobileSearchbox?.showModal) this.$refs.mobileSearchbox.hideModal();
      let destRoute = selectedOption.iri;
      if (destRoute.startsWith(this.uriSpace)) {
        // internal ontology
        destRoute = destRoute.replace(this.uriSpace, '');
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
          path: '/ontology',
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
      if (newTag != '') {
        if (this.$refs.mobileSearchbox?.showModal) this.$refs.mobileSearchbox.hideModal();

        this.$router.push({
          path: '/ontology',
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
          this.searchBox.page = page ? parseInt(page) : 1;

          // eslint-disable-next-line max-len
          const domain = encodeURI(
            `${this.searchServer}?term=${searchBQuery}&mode=advance&useHighlighting=${isHighlighting}&findProperties=${this.searchBox.encodedProperties}&page=${page}`,
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
          // wait for properties to be loaded if they aren't
          while (this.searchBox.findPropertiesAll.length === 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          // eslint-disable-next-line max-len
          const domain = encodeURI(
            `${this.searchServer}?term=${query}&mode=advance&useHighlighting=false&findProperties=${this.searchBox.encodedProperties}`,
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
      this.searchBox.inputValue = '';
      this.$refs.searchBoxInputDesktop.search = '';
      this.$refs.searchBoxInputMobile.search = '';
    },
    loadMoreResults() {
      this.searchBox.displayedResultsCount += this.searchBox.perPage;
      this.searchBox.displayedResults = this.searchBox.totalResults.slice(
        0,
        this.searchBox.displayedResultsCount,
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
        (property) => property.identifier,
      );
      this.searchBox.encodedProperties = identifiersArray.join('.');

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
        this.$route.path !== '/ontology'
        || this.$route.query?.query
        || this.$route.query?.search
      ) {
        this.$router.push({
          path: '/ontology',
          query: {
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
          },
        });
      }

      this.$nextTick(async function () {
        this.scrollToOntologyViewerTopOfContainer('smooth');
      });
    },
    scrollToOntologyViewerTopOfContainer(behavior) {
      const element = this.$refs.ontologyViewerTopOfContainer;

      const rect = element.getBoundingClientRect();
      const scrollTop = rect.top + window.scrollY;

      if (behavior === 'smooth') {
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: scrollTop,
          behavior: 'instant',
        });
      }
    },
  },
  computed: {
    ...mapState(useConfigurationStore, {
      ontologyName: store => store.config.ontpubFamily,
      ontologyNameUppercase: store => store.config.ontpubFamily?.toUpperCase(),
      ontologyRepositoryUrl: store => store.config.ontologyRepositoryUrl,
      uriSpace: store => store.config.uriSpace,
      defaultBranchName: store => store.config.defaultBranchName,
      jenkinsJobUrl: store => store.config.jenkinsJobUrl,
    }),
    ...mapState(useServersStore, {
      version: store => store.version,
      searchServer: store => store.searchServer,
      ontologyServer: store => store.ontologyServer,
      modulesServer: store => store.modulesServer,
      statsServer: store => store.statsServer,
      missingImportsServer: store => store.missingImportsServer,
      ontologyServerCompare: store => store.ontologyServerCompare,
    }),
    isError() {
      return (
        this.error.versions
        || this.error.modules
        || this.error.properties
        || this.error.search
        || this.error.entityData
        || this.error.entityNotFound
      );
    },
    isLoader() {
      return !this.isError &&
                (
                  this.loader
                  || this.searchBox.isLoadingResults
                  || ((this.$route.path !== '/ontology' && this.$route.path !== '/ontology/') && !this.data)
                );
    },
    hasVersions() {
      return this.ontologyVersions.data.length > 1;
    },
    isComparing() {
      return (
        this.versionCompare.isCompareExpanded
        && this.versionCompare.selectedCompareData
        && this.versionCompare.selectedCompareData['@id']
          != this.ontologyVersions.selectedData['@id']
      );
    },
  },
  beforeRouteUpdate(to, from, next) {
    const previousVersion = this.version;
    this.updateServers(this.$route, to);

    // version just changed
    if (this.version != previousVersion) this.fetchModules();

    if (to != from) {
      let queryParam = '';

      if (to.query?.query) {
        queryParam = to.query.query + to.hash || '';
      } else {
        let destination = to.path.replace('/ontology/', '');
        destination = destination.replace('/ontology', '');
        queryParam = `${this.uriSpace}${destination}`;
      }
      this.query = queryParam;

      if (this.query === this.uriSpace) {
        this.query = '';
        this.data = null;
      } else {
        this.query = encodeURIComponent(this.query);
      }

      this.$nextTick(async function () {
        if (this.isComparing) this.fetchCompareDataAndMerge(this.query);
        else this.fetchData(this.query);
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
      const { page } = to.query;
      this.handleSearchBoxQuery(searchQuery, page);
    }
    this.$nextTick(() => {
      // if (
      //   (this.$route.path != '/ontology' || this.$route.query?.query)
      //   && !this.versionCompare.isSwappingVersion
      // ) this.scrollToOntologyViewerTopOfContainer();

      this.versionCompare.isSwappingVersion = false;
    });
    next();
  },
};
</script>
