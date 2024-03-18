<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md px-0">
          <h1 v-if="sectionItem.title">{{ sectionItem.title }}</h1>
        </div>
        <div class="col-12 col-md-4 px-0">
          <div
            v-show="hasVersions"
            class="secondary-column__versions multiselect-container container"
          >
            <div class="menu-box">
              <div class="activators-container">
                <div
                  v-if="
                    $refs.versionsSelectDesktop &&
                    !$refs.versionsSelectDesktop.isOpen
                  "
                  class="versions-activator multiselect-activator"
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
                  id="ontologyVersionsMultiselect--products"
                  ref="versionsSelectDesktop"
                  v-model="ontologyVersions.selectedData"
                  label="@id"
                  track-by="url"
                  placeholder="Select..."
                  tag-placeholder="Select..."
                  select-label=""
                  open-direction="bottom"
                  group-values="versions"
                  group-label="group"
                  :group-select="false"
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
                >
                  <template #tag="{ option }">
                    <span class="custom__tag">
                      <span>{{ option.label }}</span>
                    </span>
                  </template>
                </multiselect>
                <multiselect
                  v-else
                  id="ontologyVersionsMultiselect--products"
                  ref="versionsSelectDesktop"
                  v-model="ontologyVersions.selectedData"
                  label="@id"
                  track-by="url"
                  placeholder="Select..."
                  tag-placeholder="Select..."
                  select-label=""
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
                >
                  <template #tag="{ option }">
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
        </div>
      </div>
    </div>

    <div class="table-container">
      <div
        v-for="element in serialization"
        :key="element.name"
        class="table-box"
      >
        <div class="table-box__column title">
          <h3>{{ element.name }}</h3>
        </div>
        <div v-if="!element.csv" class="downloads-container">
          <div class="table-box__column download">
            <p>RDF-XML</p>
            <button
              v-for="Link in element.xml"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name, Link.product)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.xml || element.xml.length === 0"
              disabled
              type="button"
              class="btn normal-button"
            >
              N/A
            </button>
          </div>
          <div class="table-box__column download">
            <p>TTL</p>
            <button
              v-for="Link in element.ttl"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name, Link.product)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.ttl || element.ttl.length === 0"
              disabled
              type="button"
              class="btn normal-button"
            >
              N/A
            </button>
          </div>
          <div class="table-box__column download">
            <p>JSON-LD</p>
            <button
              v-for="Link in element.json"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name, Link.product)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.json || element.json.length === 0"
              disabled
              type="button"
              class="btn normal-button"
            >
              N/A
            </button>
          </div>
          <div class="table-box__column download">
            <p>NQ/NT</p>
            <button
              v-for="Link in element.nq"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name, Link.product)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.nq || element.nq.length === 0"
              disabled
              type="button"
              class="btn normal-button"
            >
              N/A
            </button>
          </div>
        </div>
        <div v-else class="downloads-container">
          <div class="table-box__column download">
            <p>CSV</p>
            <button
              v-for="Link in element.csv"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name, Link.product)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.csv || element.csv.length === 0"
              disabled
              type="button"
              class="btn normal-button"
            >
              N/A
            </button>
          </div>
          <div class="table-box__column download">
            <p>XLSX</p>
            <button
              v-for="Link in element.xlsx"
              :key="Link.name"
              type="button"
              class="btn normal-button"
              @click="download(Link.name, Link.product)"
            >
              {{ Link.name }}
            </button>
            <button
              v-if="!element.xlsx || element.xlsx.length === 0"
              disabled
              type="button"
              class="btn normal-button"
            >
              N/A
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useConfigurationStore } from '@/stores/configuration';
import Multiselect from 'vue-multiselect';
import { getOntologyVersions, getJenkinsJobs } from '../../api/ontology';

export default {
  name: 'SerializationListSection',
  components: {
    Multiselect
  },
  props: ['sectionItem'],
  data() {
    return {
      version: 'master/latest',
      serialization: null,
      ontologyVersions: {
        isGrouped: false,
        isLoading: false,
        defaultData: {
          '@id': 'current',
          'url': ''
        },
        data: [],
        selectedData: null,
        dropdownActive: {
          version: false,
          compare: false
        }
      }
    };
  },
  computed: {
    ...mapState(useConfigurationStore, {
      ontologyName: (store) => store.config.ontpubFamily,
      defaultBranchName: (store) => store.config.defaultBranchName,
      jenkinsJobUrl: (store) => store.config.jenkinsJobUrl
    }),
    ontologyNameUppercase() {
      return this.ontologyName.toUpperCase();
    },
    hasVersions() {
      return this.ontologyVersions.data.length > 0;
    }
  },
  async mounted() {
    this.serialization = this.sectionItem.serialization;
    this.fetchVersions();
  },
  methods: {
    download(name, product) {
      const productName = product || 'ontology';
      const baseUrl = `/${this.ontologyName}/${productName}`;
      const branch = this.hasVersions
        ? this.ontologyVersions?.selectedData['@id']
        : 'master/latest';
      const link = `${baseUrl}/${branch}/${name}`;
      const aElement = document.createElement('a');
      aElement.setAttribute('download', name);
      aElement.setAttribute('href', link);
      aElement.setAttribute('target', '_blank');
      aElement.style.display = 'none';
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    },
    async fetchVersions() {
      try {
        const result = await getOntologyVersions(
          `/${this.ontologyName}/ontology/api/`
        );
        const ontologyVersions = await result.json();

        const first = 'master/latest';
        ontologyVersions.sort((x, y) =>
          x['@id'] == first ? -1 : y['@id'] == first ? 1 : 0
        );

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
          this.ontologyVersions.selectedData =
            this.ontologyVersions.defaultData;
        }
      } catch (err) {
        console.error(err);
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
            `${jenkinsJobUrl}/view/change-requests/api/json`
          );
          const pullRequestsJson = await pullRequestsResult.json();
          const pullRequests = pullRequestsJson.jobs.map((item) =>
            item.name.toLowerCase()
          );

          const defaultViewResult = await getJenkinsJobs(
            `${jenkinsJobUrl}/view/default/api/json`
          );
          const defaultViewJson = await defaultViewResult.json();
          const defaultView = defaultViewJson.jobs.map((item) =>
            item.name.toLowerCase()
          );

          // group versions
          const branchesGroup = [];
          const pullRequestsGroup = [];
          const releasesGroup = [];
          const defaultGroup = [];

          for (const version of this.ontologyVersions.data) {
            let versionToCompare = version['@id'].toLowerCase();
            if (versionToCompare.endsWith(`/${tagName}`)) {
              versionToCompare = versionToCompare.replace(`/${tagName}`, '');
            }
            versionToCompare = versionToCompare.replace('/', '_');

            if (
              versionToCompare === 'master' ||
              versionToCompare === this.defaultBranchName
            )
              defaultGroup.push(version);
            else if (tags.find((item) => item == versionToCompare))
              releasesGroup.push(version);
            else if (pullRequests.find((item) => item == versionToCompare))
              pullRequestsGroup.push(version);
            else if (defaultView.find((item) => item == versionToCompare))
              branchesGroup.push(version);
          }

          const options = [];

          if (defaultGroup.length)
            options.push({ group: 'Default', versions: defaultGroup });
          if (releasesGroup.length) {
            options.push({ group: 'Releases', versions: releasesGroup });
          }
          if (pullRequestsGroup.length) {
            options.push({
              group: 'Pull requests',
              versions: pullRequestsGroup
            });
          }
          if (branchesGroup.length)
            options.push({ group: 'Branches', versions: branchesGroup });

          this.ontologyVersions.isGrouped = true;
          this.ontologyVersions.data = options;
        } catch (err) {
          this.ontologyVersions.isGrouped = false;
          console.error(err);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.multiselect-container.secondary-column__versions {
  margin-top: 0;
  padding: 0;
  height: 80px;
}

.menu-box {
  margin-top: 0;
}

.downloads-container {
  width: 70%;
  display: flex;
  justify-content: space-evenly;
}

article.full-page .table-container .table-box {
  padding: 15px 30px;
}

.table-container .table-box .table-box__column {
  margin: 15px 0px;

  &.title {
    width: 30%;
  }

  &.download {
    flex: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      text-align: center;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
    }

    button {
      padding: 5px 10px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      margin: 5px !important;
    }
  }
}

@media (max-width: 1024px) {
  .downloads-container {
    width: 100%;
  }

  .table-container .table-box {
    flex-direction: column !important;
  }

  article.full-page .table-container .table-box .table-box__column {
    &.title {
      text-align: center;
      width: 100%;
    }

    &.download {
      margin: 2px;
      p {
        font-weight: 400;
      }
    }
  }
}

@media (max-width: 646px) {
  .downloads-container {
    flex-direction: column;
  }
}
</style>
