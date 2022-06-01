<template>
  <div
    class="
      secondary-column__tree
      multiselect-xxl-container multiselect-container
      container
    "
  >
    <div class="menu-box">
      <div class="menu-box__label">Browse logs</div>
      <div class="menu-box__content-text">FIBO Instrumentation</div>
      <div class="menu-box__icons">
        <div class="menu-box__icons__icon icon-warning"></div>
      </div>
    </div>

    <div class="stats">
      <div class="stats-box stats-box--numbers">
        <div
          class="stats-box__title"
          @click="numbersExpanded = !numbersExpanded"
        >
          <div class="stats-box__title__text">Statistics</div>
          <div
            class="stats-box__title__icon"
            :class="{ expanded: numbersExpanded }"
          ></div>
        </div>
        <div class="stats-box__content" v-if="numbersExpanded">
          <div class="stats-box__entry" v-for="stat in stats" :key="stat.label">
            <div class="stats-box__entry__label">{{ stat.label }}</div>
            <div class="stats-box__entry__value">{{ stat.value }}</div>
          </div>
        </div>
      </div>

      <div class="stats-box stats-box--imports">
        <div
          class="stats-box__title"
          @click="importsExpanded = !importsExpanded"
        >
          <div class="stats-box__title__text">
            Missing Imports ({{ missingImports.length }})
          </div>
          <div
            class="stats-box__title__icon"
            :class="{ expanded: importsExpanded }"
          ></div>
        </div>
        <div class="stats-box__content" v-if="importsExpanded">
          <div
            class="stats-box__content__wrapper"
            v-if="missingImports.length > 0"
          >
            <div
              class="stats-box__entry"
              v-for="item in missingImports"
              :key="item.iri"
            >
              <div class="stats-box__entry__label">{{ item.iri }}</div>
            </div>
          </div>
          <div class="stats-box__content__no-missing-import" v-else>
            Everything is loaded correctly!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStats, getMissingImports } from "../api/ontology";
export default {
  name: "StatsComponent",
  props: ["statsServer", "missingImportsServer"],
  data() {
    return {
      numbersExpanded: false,
      importsExpanded: false,
      stats: {},
      missingImports: [],
    };
  },
  mounted() {
    this.fetchStats();
    this.fetchMissingImports();
  },
  methods: {
    async fetchStats() {
      try {
        const result = await getStats(this.statsServer);
        const body = await result.json();
        for (const key in body.stats) {
          this.stats[key] = {
            label: body.labels[key],
            value: body.stats[key],
          };
        }
      } catch (err) {
        console.error(err);
      }
    },
    async fetchMissingImports() {
      try {
        const result = await getMissingImports(this.missingImportsServer);
        this.missingImports = await result.json();
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.stats {
  margin: 30px;
  .stats-box {
    margin-bottom: 5px;
    border-radius: 2px;
    .stats-box__content {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .stats-box__title {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
      .stats-box__title__text {
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        color: #000000;
      }
      .stats-box__title__icon {
        width: 30px;
        height: 30px;
        position: absolute;
        left: -30px;
        background-image: url("../assets/icons/arrow.svg");
        background-position: center;
        &.expanded {
          transform: rotate(90deg);
        }
      }
    }
  }
  .stats-box--numbers {
    .stats-box__entry {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.01em;
      .stats-box__entry__label {
        padding-right: 20px;
        color: rgba(0, 0, 0, 0.4);
        &:first-letter {
          text-transform: uppercase;
        }
      }
    }
  }
  .stats-box--imports {
    .stats-box__content {
      .stats-box__entry {
        background: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.8);
        border-radius: 2px;
        margin-top: 15px;
        padding: 15px;
        word-wrap: break-word;
        word-break: break-all;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.01em;
      }
      .stats-box__content__no-missing-import {
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
