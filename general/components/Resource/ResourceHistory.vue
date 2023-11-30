<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">History</h5>
    </div>
    <div class="card-content" :class="{ loaded: !isLoading }">
      <div class="overlay-left"></div>
      <div class="overlay-right"></div>
      <div class="history-banner" ref="historyBanner">
        <div class="timeline">
          <div class="line start-line"></div>
          <div v-for="release of versionsData" class="line">
            <div @click="handleVersionClick(release)" class="version" :class="{
              exists: release && release.maturityLevel && release.maturityLevel.label,
              selected: release.version == (version || defaultBranchName)
            }">
              <BsTooltip text="Resource doesn't exist in this version" placement="top" offset="0,20">
                <div class="circle" :class="getCircleClass(release)"></div>
              </BsTooltip>
              <div class="value">{{ release.version }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useServersStore } from '@/stores/servers';
import { useConfigurationStore } from '~/stores/configuration';
import { useOntologyStore } from '~/stores/ontology';

export default {
  name: 'CompareBanner',
  props: ['ontologyVersions', 'data'],
  emits: ['versionChanged'],
  data() {
    return {
      isLoading: true,
      versionsData: {},
    }
  },
  async mounted() {
    await this.fetchVersionsData();
    this.initializeScroll();
  },
  methods: {
    ...mapActions(useOntologyStore, ['getEntityData']),
    async fetchVersionsData() {
      this.isLoading = true;

      const promises = this.releases.map(release => this.getEntityData(release['@id'], this.data.iri));
      const versionsData = await Promise.all(promises);

      this.versionsData = this.releases.map((release, index) => {
        return {
          version: release['@id'],
          maturityLevel: versionsData[index] ? versionsData[index].result.maturityLevel : null,
        }
      })

      this.isLoading = false;
    },
    handleVersionClick(release) {
      const version = { '@id': release.version };
      this.$emit('versionChanged', version);
    },
    initializeScroll() {
      const slider = this.$refs.historyBanner;
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });
      slider.scrollLeft = slider.scrollWidth
    },
    getCircleClass(release) {
      if (!release || !release.maturityLevel) return '';

      switch (release.maturityLevel.label) {
        case 'Provisional':
        case 'Preliminary':
          return 'maturity maturity-provisional';
        case 'Informative':
          return 'maturity maturity-informative';
        case 'Release':
          return 'maturity maturity-production';
        case 'Mixed':
          return 'maturity maturity-mixed';
      }
      return '';
    },
  },
  computed: {
    ...mapState(useServersStore, {
      version: store => store.version,
      versionCompare: store => store.versionCompare,
    }),
    ...mapState(useConfigurationStore, {
      defaultBranchName: store => store.config.defaultBranchName,
    }),
    releases() {
      const data = [...this.ontologyVersions.data];
      const releasesArray = data.find(v => v.group === 'Releases')?.versions.slice().reverse() || [];
      return [...releasesArray, { '@id': this.defaultBranchName }];
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  position: relative;

  opacity: 0;
  transition: opacity 0.5s;

  &.loaded {
    opacity: 1;
  }
}

.overlay-left {
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 20%;
  width: 100px;
  height: 172px;
  z-index: 50;
  background-image: linear-gradient(90deg,
      rgba(242, 242, 242, 1) 15%, rgba(0, 0, 0, 0) 100%);
}

.overlay-right {
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  max-width: 20%;
  width: 100px;
  height: 172px;
  z-index: 50;
  background-image: linear-gradient(270deg,
      rgba(242, 242, 242, 1) 15%, rgba(0, 0, 0, 0) 100%);
}

.history-banner {
  // margin-top: 30px;
  // padding: 40px;
  font-style: normal;
  font-size: 18px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.8);
  text-overflow: ellipsis;
  background-color: rgba(242, 242, 242, 1);
  overflow-x: scroll;
  user-select: none;
  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: map-get($colors-map, "black-20");
    border-radius: 4px;

    &:hover {
      background: map-get($colors-map, "black-40");
      cursor: default;
    }
  }

  &.active {
    cursor: grabbing;

    .timeline {
      pointer-events: none;
    }
  }

  .title {
    color: rgba(0, 0, 0, 0.8);
    font-size: 18px;
    font-weight: 700;
  }

  .timeline {
    min-width: 100%;
    width: max-content;
    padding: 30px !important;
    display: flex;

    .line {
      flex: 1;
      position: relative;
      margin-top: 20px;
      margin-bottom: 90px;
      height: 2px;
      width: 100px;
      background-color: rgba(0, 0, 0, 0.4);

      &.start-line {
        flex: 1;
        min-width: 150px;
        border-bottom: 2px dashed rgba(0, 0, 0, 0.4);
        background: transparent;
      }

      &:last-child {
        flex: 1;
        min-width: 180px;
        border-bottom: 2px dashed rgba(0, 0, 0, 0.4);
        background: transparent;
      }

      .version {
        cursor: default;
        position: absolute;
        width: 16px;
        height: 16px;
        top: -6px;
        left: -6px;
        pointer-events: all;

        .circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          border-radius: 16px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          background: rgba(242, 242, 242, 1);
          transition: scale 0.15s;
        }

        .value {
          user-select: none;
          position: absolute;
          font-size: 16px;
          top: -2px;
          left: 18px;
          padding-left: 15px;
          transform-origin: top left;
          transform: rotate(35deg);
          color: map-get($colors-map, "black-40");
        }

        &.exists {
          cursor: pointer;

          &:hover .circle {
            border: 2px solid rgba(0, 0, 0, 1);
          }

          &:hover .value {
            color: black;
          }

          .circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 16px;
            height: 16px;
            border-radius: 16px;
            border: 2px solid rgba(0, 0, 0, .6);
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;

            &.maturity {
              border: 2px solid rgba(242, 242, 242, 1);
            }

            &.maturity-provisional {
              background-color: map-get($colors-map, "yellow");
            }

            &.maturity-production {
              background-color: map-get($colors-map, "green");
            }

            &.maturity-informative {
              background-color: map-get($colors-map, "orange");
            }

            &.maturity-mixed {
              background-image: url("@/assets/icons/mixed-maturity.svg");
              background-size: 100%;
            }
          }

          .value {
            user-select: none;
            position: absolute;
            font-size: 16px;
            top: -2px;
            left: 18px;
            padding-left: 15px;
            transform-origin: top left;
            transform: rotate(35deg);
            color: map-get($colors-map, "black-80");
          }
        }

        &.selected {
          .value {
            font-weight: 700;
          }
        }
      }
    }
  }

  .version-name {
    padding: 25px 20px;
    text-align: center;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
    background: rgb(255, 255, 255);

    &.right {
      border-left: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
}

// @media (max-width: 991px) {
//   .history-banner {
//     margin: 60px 30px;
//   }
// }

// @media (max-width: 1254px) {
//   .history-banner {
//     .title {
//       color: rgba(0, 0, 0, 0.6);
//       font-size: 14px;
//       background: rgb(255, 255, 255);
//       border-right: 2px solid rgba(0, 0, 0, 0.05);
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }

//     .version-name {
//       text-align: center;
//       font-weight: bold;
//       font-size: 14px;
//       color: rgba(0, 0, 0, 0.8);
//       background: rgb(255, 255, 255);

//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//   }
// }
</style>
