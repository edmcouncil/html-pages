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
      <div class="menu-box__content-text">
        {{ ontologyNameUppercase }} Instrumentation
      </div>
      <div class="menu-box__icons">
        <div class="menu-box__icons__icon icon-info"></div>
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
            class="stats-box__title__arrow"
            :class="{ expanded: numbersExpanded }"
          ></div>
        </div>
        <b-collapse v-model="numbersExpanded">
          <transition name="list">
            <div class="stats-box__content" v-if="numbersExpanded">
              <div
                v-if="isComparing"
                class="stats-box__entry stats-box__comparing-title"
              >
                <div class="stats-box__entry__label">Comparing</div>
                <div class="stats-box__entry__value">
                  {{ limitSize(version || defaultBranchName, 24) }}
                  <div class="stats-box__entry__value__arrow-right"></div>
                  {{ limitSize(versionCompare || defaultBranchName, 24) }}</div>
              </div>
              <div
                class="stats-box__entry"
                v-for="stat in stats"
                :key="stat.label"
              >
                <div class="stats-box__entry__label">{{ stat.label }}</div>
                <div class="stats-box__entry__value">
                  {{ stat.value }}
                  <span
                    v-if="isComparing"
                  >
                    <div class="stats-box__entry__value__arrow-right"></div>
                    <span
                      :class="{
                        'value-decrease': stat.value > stat.compareValue,
                        'value-increase': stat.value < stat.compareValue
                      }"
                    >
                      {{ stat.compareValue || 0 }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </b-collapse>
      </div>

      <div class="stats-box stats-box--status">
        <div class="stats-box__title" @click="statusExpanded = !statusExpanded">
          <div
            class="stats-box__title__text"
            :class="{ importsPresent: missingImports.length > 0 }"
          >
            Status
          </div>
          <div
            class="stats-box__title__arrow"
            :class="{ expanded: statusExpanded }"
          ></div>
        </div>
        <b-collapse v-model="statusExpanded">
          <transition name="list">
            <div class="stats-box__content" v-if="statusExpanded">
              <div
                class="stats-box__content__wrapper"
                v-if="missingImports.length > 0"
              >
                <div class="stats-box stats-box--status__imports">
                  <div
                    class="stats-box__title"
                    @click="importsExpanded = !importsExpanded"
                  >
                    <div class="stats-box__title__text">
                      Missing Imports ({{ missingImports.length }})
                    </div>
                    <div
                      class="stats-box__title__arrow"
                      :class="{ expanded: importsExpanded }"
                    ></div>
                  </div>
                  <b-collapse v-model="importsExpanded">
                    <transition name="list">
                      <div class="stats-box__content" v-if="importsExpanded">
                        <div class="stats-box__content__wrapper">
                          <div
                            class="stats-box__entry"
                            v-for="item in missingImports"
                            :key="item.iri"
                          >
                            <div class="stats-box__entry__label">
                              {{ item.iri }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </b-collapse>
                </div>
              </div>
              <div class="stats-box__content__no-missing-import" v-else>
                Everything is loaded correctly!
              </div>
            </div>
          </transition>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { getStats, getMissingImports } from "../api/ontology";
import { mapState } from 'vuex';

export default {
  name: 'StatsComponent',
  props: ['isComparing'],
  data() {
    return {
      numbersExpanded: false,
      statusExpanded: false,
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
      this.stats = await this.getStatsObject(this.statsServer);

      if (this.isComparing) {
        const compareStats = await this.getStatsObject(this.statsServerCompare);

        for (const key in compareStats) {
          if (!this.stats[key]) {
            this.stats[key] = {};
            this.$set(this.stats[key], 'label', compareStats[key].label);
            this.$set(this.stats[key], 'value', 0);
          }
          this.$set(this.stats[key], 'compareValue', compareStats[key].value);
        }
      }
    },
    async getStatsObject(server) {
      const output = {};
      try {
        const result = await getStats(server);
        const body = await result.json();
        for (const key in body.stats) {
          output[key] = {};
          output[key].label = body.labels[key];
          output[key].value = body.stats[key];
        }
      } catch (err) {
        console.error(err);
      }
      return output;
    },
    async fetchMissingImports() {
      try {
        const result = await getMissingImports(this.missingImportsServer);
        this.missingImports = await result.json();
      } catch (err) {
        console.error(err);
      }
    },
    limitSize(str, maxLength) {
      return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
    }
  },
  watch: {
    versionsString: function() {
      if (this.statsServer == this.statsServerCompare)
        return;
      this.fetchStats();
      this.fetchMissingImports();
    },
  },
  computed: {
    ...mapState({
      version: (state) => state.servers.version,
      versionCompare: (state) => state.servers.versionCompare,
      // servers
      statsServer: (state) => state.servers.statsServer,
      statsServerCompare: (state) => state.servers.statsServerCompare,
      missingImportsServer: (state) => state.servers.missingImportsServer,
      missingImportsServerCompare: (state) => state.servers.missingImportsServerCompare,
      // configuration
      defaultBranchName: (state) => state.configuration.config.defaultBranchName,
    }),
    ontologyNameUppercase() {
      return this.$store.state.configuration.config.ontpubFamily.toUpperCase();
    },
    versionsString() {
      return this.version + this.versionCompare;
    }
  }
};
</script>

<style scoped lang="scss">
.stats {
  margin: 25px 30px;

  .stats-box {
    padding-bottom: 5px;
    border-radius: 2px;

    .stats-box__content {
      padding-top: 7px;
      padding-bottom: 20px;
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

        &.importsPresent {
          font-weight: 700;
        }
      }

      .stats-box__title__arrow {
        width: 30px;
        height: 30px;

        position: absolute;
        left: -30px;

        background-image: url("../assets/icons/arrow.svg");
        background-position: center;

        transition: transform 0.4s;

        &.expanded {
          transform: rotate(90deg);
        }
      }
    }
  }

  .stats-box--numbers {
    .stats-box__entry {
      padding-top: 5px;
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
        max-width: 70%;

        &:first-letter {
          text-transform: uppercase;
        }
      }

      .stats-box__entry__value {
        white-space: nowrap;
        .stats-box__entry__value__arrow-right {
          display: inline-block;
          width: 16px;
          height: 20px;
          background-image: url("@/assets/icons/arrow-right.svg");
          background-size: 12px 12px;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.4;
          vertical-align: bottom;
        }
        .value-decrease {
          color: #EC241D;
        }
        .value-increase {
          color: #00b855;
        }
      }
    }
    .stats-box__comparing-title {
      margin-top: 5px;
      margin-bottom: 10px;
      flex-wrap: wrap;

      .stats-box__entry__label{
        color: rgba(0, 0, 0, 0.4);
      }
      .stats-box__entry__value {
        color: rgba(0, 0, 0, 0.8);
        font-weight: bold;
      }
    }
  }

  .stats-box--status {
    .stats-box__content {
      padding-top: 5px;

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

      .stats-box--status__imports {
        padding-left: 20px;
      }
    }
  }
}
</style>
