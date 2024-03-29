<template>
  <div class="col-md-12 ontology-item__header">
    <div class="card">
      <div class="card-body">
        <div class="ontology-item__header__title-segment">
          <div class="right">
            <!-- show more menu -->
            <div
              v-if="hasDropdownMenu"
              class="dropdown resource-more"
              :class="{ centered: !hasStatus }"
            >
              <button
                type="button"
                class="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More
                <div class="icon-show-more-white"></div>
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <DescribeButton v-if="hasDescribeButton" :data="data" />
                <button
                  v-if="hasReportProblemButton"
                  type="button"
                  class="report-a-problem dropdown-item"
                  @click="githubNewIssue()"
                >
                  Report a problem
                </button>
              </div>
            </div>
          </div>

          <div class="left">
            <!-- maturity alert -->
            <div class="ontology-item__header__status">
              <div
                v-if="data.deprecated"
                class="alert alert-error alert-deprecated"
                role="alert"
              >
                This resource is deprecated and may be removed shortly.
              </div>
              <div
                v-if="
                  data.maturityLevel.label === 'Informative' ||
                  data.maturityLevel.label === 'Provisional' ||
                  data.maturityLevel.label === 'Preliminary'
                "
                class="alert alert-primary alert-maturity"
                :class="{
                  informative: data.maturityLevel.label === 'Informative'
                }"
                role="alert"
              >
                This resource has maturity level
                {{ data.maturityLevel.label.toLowerCase() }}.

                <customLink
                  class="custom-link"
                  :name="'Read more'"
                  :query="data.maturityLevel.iri"
                ></customLink>
              </div>
            </div>

            <!-- header item title -->
            <h2
              class="card-title"
              :class="{
                'maturity-provisional':
                  data.maturityLevel.label === 'Provisional' ||
                  data.maturityLevel.label === 'Preliminary',
                'maturity-informative':
                  data.maturityLevel.label === 'Informative',
                'maturity-production': data.maturityLevel.label === 'Release',
                'maturity-mixed': data.maturityLevel.label === 'Mixed'
              }"
            >
              {{ data.label }}
            </h2>
          </div>
        </div>

        <h6 v-if="data.iri" class="card-subtitle data-iri">
          {{ data.iri }}
        </h6>
        <div class="url-buttons-container">
          <CopyButton :copy-content="data.iri" :text="'Copy IRI'" />
        </div>
        <h6 v-if="data.versionIri" class="card-subtitle data-iri">
          {{ data.versionIri }}
        </h6>
        <div v-if="data.versionIri" class="url-buttons-container">
          <CopyButton
            :copy-content="data.versionIri"
            :text="'Copy versioned IRI'"
            class="btn-copy-iri"
          />
        </div>

        <h6 v-if="data.qName && data.qName !== ''" class="card-subtitle qname">
          {{ data.qName }}
        </h6>

        <div class="url-buttons-container">
          <CopyButton
            v-if="data.qName && data.qName !== ''"
            :copy-content="data.qName.replace('QName: ', '')"
            :text="'Copy QName'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useConfigurationStore } from '@/stores/configuration';

export default {
  name: 'ResourceHeader',
  props: ['data'],
  data() {
    return {};
  },
  computed: {
    ...mapState(useConfigurationStore, {
      // configuration
      ontologyRepositoryUrl: (store) => store.config.ontologyRepositoryUrl,
      uriSpace: (store) => store.config.uriSpace
    }),
    hasDescribeButton() {
      return this.data.iri.slice(-1) !== '/';
    },
    hasReportProblemButton() {
      return (
        this.ontologyRepositoryUrl &&
        this.data.iri.startsWith(this.uriSpace) &&
        !(this.$route.query && this.$route.query.version)
      );
    },
    hasDropdownMenu() {
      return this.hasDescribeButton || this.hasReportProblemButton;
    },
    hasStatus() {
      return (
        this.data.deprecated ||
        this.data.maturityLevel.label === 'Informative' ||
        this.data.maturityLevel.label === 'Provisional' ||
        this.data.maturityLevel.label === 'Preliminary'
      );
    }
  },
  methods: {
    githubNewIssue() {
      const ontologyQuery = this.data.iri.replace(this.uriSpace, '');
      const label = ontologyQuery.substring(0, ontologyQuery.indexOf('/'));
      const details = {
        label,
        title: `Problem with ${this.data.label.toUpperCase()}`,
        body: `Resource URL:\n${this.data.iri}`
      };
      const url =
        `${this.ontologyRepositoryUrl}/issues/new` +
        `?labels=${encodeURI(details.label)}` +
        '&template=issue.md' +
        `&title=${encodeURI(details.title)}` +
        `&body=${encodeURI(details.body)}`;
      window.open(url, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.ontology-item__header {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  margin-bottom: 60px;
  margin-top: 40px;
  padding: 0;

  .ontology-item__header__title-segment {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .ontology-item__header__status {
    margin-left: -30px;
    margin-top: 40px;
  }

  // maturity alert
  .alert-maturity {
    color: rgba(0, 0, 0, 0.8);

    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    letter-spacing: 0.01em;

    background: #feb700;
    border: none;
    width: fit-content;
    block-size: fit-content;
    border-radius: 2px;

    margin-top: 0px;
    margin-bottom: 5px;
    padding: 5px 15px 5px 15px;
    // margin-right: 85px;

    a {
      text-decoration: underline;
    }

    &::before {
      content: '';
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

    &.informative {
      background: map-get($colors-map, 'orange');
    }
  }

  // deprecated alert
  .alert-deprecated {
    color: rgba(255, 255, 255, 0.8);

    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    letter-spacing: 0.01em;

    border: none;
    width: fit-content;
    block-size: fit-content;
    border-radius: 2px;

    margin-top: 0px;
    margin-bottom: 5px;
    padding: 5px 15px 5px 15px;

    a {
      text-decoration: underline;
    }

    &::before {
      content: '';
      display: none;
    }
  }

  // more button
  .resource-more {
    margin-top: 40px;
    margin-left: 20px;
    border-radius: 2px;
    padding: 0;
    border: none;
    text-decoration: none;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;

    &.centered {
      margin-top: 50px;
    }

    .btn.dropdown-toggle {
      border: none;
      outline: none;
      box-shadow: none;
      padding: 5px 15px 5px 15px;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 2px;
      color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      gap: 10px;
      transition: opacity 0.3s;

      &::after {
        display: none;
      }

      .icon-show-more-white {
        background-image: url('../../assets/icons/show-more-white.svg');
        background-size: 100%;
        width: 20px;
        height: 20px;
      }

      &.show {
        opacity: 0.8;
      }
    }

    .dropdown-menu {
      user-select: none;
      pointer-events: none;

      display: block;
      padding: 0;
      width: 320px;
      max-width: calc(100vw - 75px);
      border: none;
      background-color: map-get($colors-map, 'white');
      box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
      border-radius: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      inset: 0px 0px auto auto;
      opacity: 0;
      transform: translate3d(0px, 30px, 0px);

      transition:
        opacity 0.35s ease,
        margin-top 0.35s ease,
        transform 0.35s;

      &.show {
        user-select: unset;
        pointer-events: unset;

        opacity: 1;
        transform: translate3d(0px, 40px, 0px) !important;
      }

      .dropdown-item {
        font-family: 'Inter';
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 30px;
        cursor: pointer;

        color: map-get($colors-map, 'black-80');

        margin: 0;
        padding: 15px 30px;

        &:hover {
          color: map-get($colors-map, 'black-80');
          background-color: map-get($colors-map, 'black-5');
        }

        &:focus {
          color: map-get($colors-map, 'black-80');
          background-color: unset;
        }

        &:active {
          color: map-get($colors-map, 'black-80');
          background-color: map-get($colors-map, 'black-20');
        }
      }

      .report-a-problem {
        &::before {
          content: '';
          background-image: url('@/assets/icons/flag.svg');
          background-repeat: no-repeat;
          background-size: 20px;
          background-position: center;

          display: block;
          width: 24px;
          height: 30px;
          float: left;
          margin: 0 10px 0 0;
        }
      }
    }
  }

  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    line-height: 50px;
    margin-right: 15px;
    margin-top: 40px;
    margin-bottom: 40px;
    position: relative;
    max-width: 100%;

    &::before {
      content: '';

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
        background-image: url('@/assets/icons/provisional-maturity.svg');
      }
    }

    &.maturity-informative {
      &::before {
        background-image: url('@/assets/icons/informative-maturity.svg');
      }
    }

    &.maturity-mixed {
      &::before {
        background-image: url('@/assets/icons/mixed-maturity.svg');
      }
    }

    &.maturity-production {
      &::before {
        background-image: url('@/assets/icons/production-maturity.svg');
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
    word-break: break-all;
  }

  // qname
  .qname {
    margin: 0px 0px;
    padding: 0;
  }

  // copy url button
  .btn-copy-url {
    color: rgba(0, 0, 0, 0.8);
    margin-top: 15px;
    margin-bottom: 40px;
    border: none;
    background: none;
    font-size: 18px;
    line-height: 30px;

    &:hover {
      color: $link-hover-color;
    }

    &:active {
      color: $link-active-color;
    }

    &::before {
      content: '';
      background-image: url('@/assets/icons/copy-url-icon.svg');
      background-repeat: no-repeat;
      background-size: 24px;
      background-position: center;

      display: block;
      width: 24px;
      height: 30px;
      float: left;
      margin: 0 6px 0 0;
    }

    &:focus {
      outline: none;
      border: none;
    }
  }

  .url-buttons-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .card {
    background: none;
  }
}

@media (max-width: 991px) {
  .ontology-item__header {
    .ontology-item__header__title-segment {
      flex-direction: column;

      .resource-more {
        justify-content: flex-end;
        margin-top: 40px;
      }

      .ontology-item__header__status {
        margin-top: 40px;
        margin-left: 0px;
        margin-right: 55px;
      }
    }

    h2 {
      font-size: 30px;
      line-height: 36px;

      &.maturity-provisional {
        margin-left: 34px;
      }

      &.maturity-informative {
        margin-left: 34px;
      }

      &.maturity-production {
        margin-left: 34px;
      }

      &.maturity-mixed {
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
      align-items: flex-end;
      justify-content: right;
    }

    // copy url button
    .btn-copy-url {
      font-size: 16px;
      line-height: 24px;

      &::before {
        content: '';
        background-image: url('@/assets/icons/copy-url-icon.svg');
        background-repeat: no-repeat;
        background-size: 24px;

        display: block;
        width: 24px;
        height: 24px;
        float: right;
        margin-left: 6px;
      }
    }

    .card {
      background: none;
    }
  }
}
</style>
