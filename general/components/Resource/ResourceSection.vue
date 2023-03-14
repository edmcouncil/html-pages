<template>
  <div class="card" :class="{'px-0 d-none d-lg-block': isComparing}">
    <div class="card-body">
      <h5
        class="card-title section-title"
        :class="{ 'section-collapse': collapsed }"
        @click="toggleCollapsed"
      >
        {{ sectionName }}
      </h5>
      <div class="card-content" v-if="isComparing">
        <dl
          class="row content-item"
          v-for="(property, name) in section"
          :key="name"
        >
          <dt class="col-md-2 col-sm-12">
            <div class="content-item__title sticky-top" :class="{ isComparing }">{{ name }}</div>
          </dt>
          <dd class="col-md-10 col-sm-12">
            <PropertiesListCompare
              :list="property"
              :limit="5"
              :sectionId="
                'section_' + sectionName + '_' + sectionIndex + '_' + name
              "
            />
          </dd>
        </dl>
      </div>
      <div class="card-content" v-else>
        <dl
          class="row content-item"
          v-for="(property, name) in section"
          :key="name"
        >
          <dt class="col-md-3 col-sm-12">
            <div class="content-item__title sticky-top" :class="{ isComparing }">{{ name }}</div>
          </dt>
          <dd class="col-md-9 col-sm-12">
            <PropertiesList
              :list="property"
              :limit="5"
              :sectionId="
                'section_' + sectionName + '_' + sectionIndex + '_' + name
              "
            />
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import PropertiesList from './PropertiesList';

export default {
  components: {
    PropertiesList
  },
  name: 'ResourceSection',
  props: [
    'section',
    'sectionName',
    'sectionIndex',
    'isComparing',
  ],
  data() {
    return {
      collapsed: false,
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  },
};
</script>

<style lang="scss">
.card-body .card-content .content-item {
  background: rgba(0, 0, 0, 0.05);
  padding: 0px;
  margin-bottom: 6px;

  dt {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    color: map-get($colors-map, "black-60");

    margin: 0;
    padding: 0 20px 0 20px;

    border-right: 2px solid white;

    .content-item__title {
      padding-top: 10px;
      padding-bottom: 10px;
      z-index: 1;

      &.isComparing {
        top: 75px!important;
      }
    }
  }
  dd {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;

    margin: 0;
    padding: 0;

    .see-more-btn-wrapper {
      padding: 10px 0 10px 12px;
    }
    .see-less-btn,
    .see-more-btn {
      margin-top: 0;
    }

    .show-more-list .top-level {
      padding: 10px 20px 10px 20px;
      display: block;
      border-bottom: 2px solid white;
      background-repeat: no-repeat;
      background-size: 24px 24px;
      background-position: 12px 12px;

      &:last-child {
        border-bottom: none;
      }

      &.top-level--list {
        padding: 10px 20px 10px 44px;
        background-image: url("@/assets/icons/dot.svg");
      }

      &.has-list {
        padding: 10px 20px 10px 44px;
        background-image: url("@/assets/icons/triangle-down.svg");
      }
    }

    .show-more-list-compare {
      height: 100%;

      .compare-item {
        border-bottom: 2px solid white;

        .compare-right {
          border-left: 2px solid white;
        }

        &:last-child {
          border-bottom: none;
          height: 100%;
        }
      }
    }

    .show-more-list-compare .top-level {
      padding: 10px 20px 10px 20px;
      display: block;
      background-repeat: no-repeat;
      background-size: 24px 24px;
      background-position: 12px 12px;

      &.top-level--list {
        padding: 10px 20px 10px 44px;
        background-image: url("@/assets/icons/dot.svg");
      }

      &.has-list {
        padding: 10px 20px 10px 44px;
        background-image: url("@/assets/icons/triangle-down.svg");
      }
    }

    ul:not(.animated-list) > li:first-child {
      margin-top: 0px;
    }

    ul {
      margin-bottom: 0;
      padding-left: 0px;

      &.is-show-more {
        border-bottom: 2px solid white;
      }

      .see-less-btn,
      .see-more-btn {
        margin-top: 10px;
        margin-left: -7px;
      }

      & > li {
        list-style: none;

        ul {
          padding-left: 20px;
          border: none;

          &.string-list {
            padding-left: 0;
          }
        }

        li {
          margin-top: 10px !important;
          background: none;
          list-style: disc;
          padding: 0 0 0 5px;

          &.string-item {
            margin-top: 0!important;
            background: none;
            list-style: none;
            padding: 0;
          }

          &::marker {
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    a {
      text-decoration: underline;
    }
  }
}

// --------------------------
// Mobile
// --------------------------
@media (max-width: 991px) {
  .card-body .card-content .content-item {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 5px;

    dt {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      border-right: none;
      color: black;

      .content-item__title {
        padding-bottom: 10px;
      }
    }
    dd {
      padding-left: 10px;
      font-size: 16px;
      line-height: 24px;
      a {
        text-decoration: underline;
      }
      .see-more-btn-wrapper {
        margin-left: 0;
      }

      .show-more-list .top-level {
        padding: 5px 20px 5px 40px;
        display: block;
        border-bottom: none;
        background-image: url("@/assets/icons/dot.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-position: 12px 6px;

        &:last-child {
          border-bottom: none;
        }

        &.has-list {
          background-image: url("@/assets/icons/triangle-down.svg");
        }
      }

      .show-more-list .top-level.top-level--list {
        padding: 5px 20px 5px 40px;
      }

      .show-more-list .top-level.top-level--single {
        padding: 5px 20px 5px 40px;
      }

      ul {
        padding-left: 0px;
        padding-bottom: 10px;
        &.is-show-more {
          border-bottom: none;
        }

        .see-less-btn,
        .see-more-btn {
          margin-left: -7px;
        }

        .top-level {
          padding: 5px 20px 5px 40px;
          display: block;
          border-bottom: none;
          background-image: url("@/assets/icons/dot.svg");
          background-repeat: no-repeat;
          background-size: 24px 24px;
          background-position: 8px 6px;

          &:last-child {
            border-bottom: none;
          }

          &.has-list {
            background-image: url("@/assets/icons/triangle-down.svg");
          }
        }

        & > li {
          background: url("@/assets/icons/dot.svg") no-repeat 0px 0px;
          list-style: none;
          padding: 0px 0px 0px 30px;

          ul {
            padding-left: 20px;
          }

          li {
            margin-top: 10px !important;
            background: none;
            list-style: disc;
            padding: 0 0 0 5px;

            &::marker {
              color: rgba(0, 0, 0, 0.8);
            }
          }
        }
      }
    }
  }
}
</style>
