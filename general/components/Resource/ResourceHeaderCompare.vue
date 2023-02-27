<template>
  <div class="container px-0 ontology-item__header--compare">
    <div class="row">
      <div class="col-2 title-column"></div>
      <div class="col-5 heading-container">
        <h5
          v-if="data.headerLeft.iri"
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
        <div v-else class="not-found">
          <h2>404</h2>
          <p>Entity not found</p>
        </div>
      </div>
      <div class="col-5 heading-container right">
        <h5
          v-if="data.headerRight.iri"
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
        <div v-else class="not-found">
          <h2>404</h2>
          <p>Entity not found</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2 title-column">
        <div class="sticky-top">IRI</div>
      </div>
      <div class="col-5 value-column">
        {{ data.headerLeft.iri }}
      </div>
      <div class="col-5 value-column right">
        {{ data.headerRight.iri }}
      </div>
    </div>
    <div class="row">
      <div class="col-2 title-column">
        <div class="sticky-top">Versioned IRI</div>
      </div>
      <div class="col-5 value-column">
        {{ data.headerLeft.versionIri }}
      </div>
      <div class="col-5 value-column right">
        {{ data.headerRight.versionIri }}
      </div>
    </div>
    <div class="row">
      <div class="col-2 title-column">
        <div class="sticky-top">QName</div>
      </div>
      <div class="col-5 value-column">
        {{ data.headerLeft.qName }}
      </div>
      <div class="col-5 value-column right">
        {{ data.headerRight.qName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceHeader',
  props: [
    'data',
  ],
};
</script>

<style lang="scss" scoped>
.ontology-item__header--compare {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  margin-bottom: 60px;
  margin-top: 40px;
  padding: 0;

  .heading-container {
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .title-column {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    color: map-get($colors-map, "black-60");

    border-right: 2px solid white;
    padding: 20px 20px;

    .sticky-top {
      top: 75px!important;
      z-index: 1!important;
    }
  }
  .value-column {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    letter-spacing: 0.01em;
    color: rgba(0, 0, 0, 0.6);

    word-break: break-all;

    padding: 20px 20px;
  }
  .right {
    border-left: 2px solid white;
  }
  .not-found {
    text-align: center;
    h2 {
      color: map-get($colors-map, "black-20");
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 50px;
      padding-top: 40px;
    }
    p {
      color: map-get($colors-map, "black-40");
      padding-top: 5px;
    }
  }

  h5 {
    float: left;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    margin-right: 30px;
    margin-top: 35px;
    margin-left: 0;
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
      top: 6.83px;

      position: absolute;
    }
    &.maturity-provisional {
      margin-left: 29px;
      &::before {
        background-image: url("@/assets/icons/provisional-maturity.svg");
      }
    }
    &.maturity-informative {
      margin-left: 29px;
      &::before {
        background-image: url("@/assets/icons/informative-maturity.svg");
      }
    }
    &.maturity-mixed {
      margin-left: 29px;
      &::before {
        background-image: url("@/assets/icons/mixed-maturity.svg");
      }
    }
    &.maturity-production {
      margin-left: 29px;
      &::before {
        background-image: url("@/assets/icons/production-maturity.svg");
      }
    }
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
    .card {
      background: none;
    }
  }
}
</style>
