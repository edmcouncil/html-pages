<template>
<div class="container px-0">
  <div class="row">
    <div class="col-2 ontology-item__header--compare header-fill"></div>
    <div class="col-5 ontology-item__header--compare header-left">
      <div class="card">
        <div class="card-body">
          <!-- header item title -->
          <h5
            class="card-title"
            :class="{
              'maturity-provisional':
                this.data.headerLeft.maturityLevel.label ===
                  'Provisional' ||
                this.data.headerLeft.maturityLevel.label === 'Preliminary',
              'maturity-informative':
                this.data.headerLeft.maturityLevel.label === 'Informative',
              'maturity-production':
                this.data.headerLeft.maturityLevel.label === 'Release',
              'maturity-mixed':
                this.data.headerLeft.maturityLevel.label === 'Mixed',
            }"
          >
            {{ data.headerLeft.label }}
          </h5>

          <div class="clearfix"></div>

          <h6 class="card-subtitle data-iri" v-if="data.headerLeft.iri">
            {{ data.headerLeft.iri }}
          </h6>
          <div class="url-buttons-container">
            <CopyButton
              :copyContent="data.headerLeft.iri"
              :text="'Copy IRI'"
            />
          </div>
          <h6
            class="card-subtitle data-iri"
            v-if="
              this.$route.query &&
              this.$route.query.version &&
              data.headerLeft.iri &&
              data.headerLeft.iri.startsWith(uriSpace)
            "
          >
            {{
              this.uriSpace +
              this.$route.query.version +
              "/" +
              data.headerLeft.iri.replace(this.uriSpace, "")
            }}
          </h6>
          <div
            class="url-buttons-container"
            v-if="
              this.$route.query &&
              this.$route.query.version &&
              data.headerLeft.iri.startsWith(uriSpace)
            "
          >
            <CopyButton
              :copyContent="
                this.uriSpace +
                this.$route.query.version +
                '/' +
                data.headerLeft.iri.replace(this.uriSpace, '')
              "
              :text="'Copy versioned IRI'"
              class="btn-copy-iri"
            />
          </div>

          <h6
            class="card-subtitle qname"
            v-if="data.headerLeft.qName && data.headerLeft.qName !== ''"
          >
            {{ data.headerLeft.qName }}
          </h6>
        </div>
      </div>
    </div>
    <div class="col-5 ontology-item__header--compare header-right">
      <div class="card">
        <div class="card-body">
          <!-- header item title -->
          <h5
            class="card-title"
            :class="{
              'maturity-provisional':
                this.data.headerRight.maturityLevel.label ===
                  'Provisional' ||
                this.data.headerRight.maturityLevel.label === 'Preliminary',
              'maturity-informative':
                this.data.headerRight.maturityLevel.label === 'Informative',
              'maturity-production':
                this.data.headerRight.maturityLevel.label === 'Release',
              'maturity-mixed':
                this.data.headerRight.maturityLevel.label === 'Mixed',
            }"
          >
            {{ data.headerRight.label }}
          </h5>

          <div class="clearfix"></div>

          <h6 class="card-subtitle data-iri" v-if="data.headerRight.iri">
            {{ data.headerRight.iri }}
          </h6>
          <div class="url-buttons-container">
            <CopyButton
              :copyContent="data.headerRight.iri"
              :text="'Copy IRI'"
            />
          </div>
          <h6
            class="card-subtitle data-iri"
            v-if="
              this.$route.query &&
              this.$route.query.version &&
              data.headerRight.iri &&
              data.headerRight.iri.startsWith(uriSpace)
            "
          >
            {{
              this.uriSpace +
              this.$route.query.version +
              "/" +
              data.headerRight.iri.replace(this.uriSpace, "")
            }}
          </h6>
          <div
            class="url-buttons-container"
            v-if="
              this.$route.query &&
              this.$route.query.version &&
              data.headerRight.iri.startsWith(uriSpace)
            "
          >
            <CopyButton
              :copyContent="
                this.uriSpace +
                this.$route.query.version +
                '/' +
                data.headerRight.iri.replace(this.uriSpace, '')
              "
              :text="'Copy versioned IRI'"
              class="btn-copy-iri"
            />
          </div>

          <h6
            class="card-subtitle qname"
            v-if="data.headerRight.qName && data.headerRight.qName !== ''"
          >
            {{ data.headerRight.qName }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'ResourceHeader',
  props: [
    'data',
  ],
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      // configuration
      uriSpace: (state) => state.configuration.uriSpace,
    }),
  }
};
</script>

<style lang="scss" scoped>
.ontology-item__header--compare {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  margin-bottom: 60px;
  margin-top: 40px;
  padding: 0;

  .ontology-item__header__status {
    float: left;
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

    &.informative {
      background: map-get($colors-map, "orange");
    }
  }

  // deprecated alert
  .alert-deprecated {
    color: rgba(0, 0, 0, 0.8);

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
      content: "";
      display: none;
    }
  }

  // report a problem
  .btn-report-a-problem {
    float: right;
    margin-top: 40px;
    margin-left: 10px;
    border-radius: 2px;
    padding: 5px 15px;
    border: none;
    text-decoration: none;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.01em;
  }

  h5 {
    float: left;
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    line-height: 50px;
    margin-right: 30px;
    margin-top: 35px;
    position: relative;
    max-width: 100%;
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
        background-image: url("@/assets/icons/provisional-maturity.svg");
      }
    }
    &.maturity-informative {
      &::before {
        background-image: url("@/assets/icons/informative-maturity.svg");
      }
    }
    &.maturity-mixed {
      &::before {
        background-image: url("@/assets/icons/mixed-maturity.svg");
      }
    }
    &.maturity-production {
      &::before {
        background-image: url("@/assets/icons/production-maturity.svg");
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
      content: "";
      background-image: url("@/assets/icons/copy-url-icon.svg");
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

  &.header-right {
    border-left: 2px solid white;
  }

  &.header-fill {
    border-right: 2px solid white;
  }
}

@media (max-width: 991px) {
  .ontology-item__header--compare {
    // maturity alert
    .ontology-item__header__status {
      margin-top: 40px;
      margin-left: 0px;
    }

    h5 {
      padding-right: 30px;
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
        content: "";
        background-image: url("@/assets/icons/copy-url-icon.svg");
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
</style>
