<template>
  <div class="graph-section">
    <div class="control-panel control-panel--minimal">
      <div class="connections-and-guide-container">
        <div ref="connectionsTitle" class="collapsible-section collapsed">
          <div
            class="collapsible-section-title"
            @click="toggleConnectionsCollapsed()"
            @keydown="toggleConnectionsCollapsed()"
          >
            <h6>Connections</h6>
            <div class="collapse-icon"></div>
          </div>

          <div class="collapsible-section-content">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="edgesFilter"
                id="internal-minimal"
                value="internal"
                v-model="internal"
                @change="filterHandler()"
              />
              <label class="form-check-label" for="internal-minimal">
                Class specific
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="edgesFilter"
                id="external-minimal"
                value="external"
                v-model="external"
                @change="filterHandler()"
              />
              <label class="form-check-label" for="external-minimal"
              >Inherited</label
              >
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="edgesFilter"
                id="optional-minimal"
                value="optional"
                v-model="optional"
                @change="filterHandler()"
              />
              <label class="form-check-label" for="optional-minimal"
              >Optional</label
              >
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="edgesFilter"
                id="non_optional-minimal"
                value="non_optional"
                v-model="required"
                @change="filterHandler()"
              />
              <label class="form-check-label" for="non_optional-minimal">
                Required
              </label>
            </div>
          </div>
        </div>
        <div class="minimal-menu">
          <button
            type="button"
            class="btn normal-button small icon-button download-png-button"
            v-on:click="downloadAsPng()"
          >
            Download as PNG
            <div class="b-icon download"></div>
          </button>
          <button
            class="btn normal-button small"
            @click="openGuide('guide-main')"
          >
            User Guide
          </button>
        </div>
      </div>
    </div>

    <div
      class="scrollPreventedInfo"
      :class="{ visible: scrollPreventedVisible }"
    >
      <div>Use <kbd>CTRL/⌘</kbd> + <kbd>scroll</kbd> to zoom</div>
      <div>or open Fullscreen mode</div>
    </div>
    <div
      class="ontograph-minimal"
      ref="ontograph"
      @wheel="handleScrollOnMinimal()"
    ></div>
    <div class="fullscreen-btn-wrapper row">
      <button
        type="button"
        class="btn normal-button icon-button fullscreen-button"
        v-on:click="showModal()"
      >
        Full screen
        <div class="b-icon"></div>
      </button>
    </div>

    <bs-modal
      :open="fullscreen"
      footerClass="d-none"
      modalClass="fullscreen graph-visualization"
      @shown="modalShown()"
      @hidden="modalHidden()"
    >
      <template v-slot:modal-header>
        <div class="left">
          <div
            type="button"
            class="close-btn"
            data-dismiss="modal"
            aria-label="Close"
            @click="hideModal()"
            @keydown="hideModal()"
          ></div>
          <h3 class="modal-title">
            Data model for {{ data.label }}
            <slot name="label"></slot>
          </h3>
        </div>
        <div class="right" :class="{ visible: isControlPanelOpen }">
          <button
            class="btn normal-button small icon-button download-png-button"
            v-on:click="downloadAsPng()"
          >
            Download as PNG
            <div class="b-icon download"></div>
          </button>
          <button
            class="btn normal-button small"
            @click="openGuide('guide-main')"
          >
            User Guide
          </button>
          <button
            class="btn normal-button small"
            @click="toggleControlPanelOpen()"
            :disabled="isControlPanelOpen"
          >
            View options
          </button>
          <div
            class="control-panel control-panel--fullscreen"
            :class="{ visible: isControlPanelOpen }"
          >
            <div class="control-panel-header">
              <h3 class="control-panel-title" @click="toggleControlPanelOpen()">View options</h3>
            </div>
            <div class="control-panel-content">
              <div class="panel-section-title">
                <h3>Connections</h3>
                <div class="help-icon" @click="openGuide('guide-connections')"></div>
              </div>
              <div class="filters-container">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="edgesFilter"
                    id="internal"
                    value="internal"
                    v-model="internal"
                    @change="filterHandler()"
                  />
                  <label class="form-check-label" for="internal">
                    Class specific
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="edgesFilter"
                    id="external"
                    value="external"
                    v-model="external"
                    @change="filterHandler()"
                  />
                  <label class="form-check-label" for="external">Inherited</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="edgesFilter"
                    id="optional"
                    value="optional"
                    v-model="optional"
                    @change="filterHandler()"
                  />
                  <label class="form-check-label" for="optional">Optional</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="edgesFilter"
                    id="non_optional"
                    value="non_optional"
                    v-model="required"
                    @change="filterHandler()"
                  />
                  <label class="form-check-label" for="non_optional">
                    Required
                  </label>
                </div>
              </div>
              <div class="panel-section-title">
                <h3>Layout</h3>
                <div class="help-icon" @click="openGuide('guide-layouts')"></div>
              </div>
              <div class="panel-flex-container layouts-container">
                <button
                  class="btn chip-button"
                  :class="{ selected: layout === 'tree' }"
                  @click="toTree">
                  Tree
                </button>
                <button
                  class="btn chip-button"
                  :class="{ selected: layout === 'clusterTree' }"
                  @click="toClusterTree"
                  :disabled="height < 2"
                >
                  Cluster Tree
                </button>
                <button
                  class="btn chip-button"
                  :class="{ selected: layout === 'radial' }"
                  @click="toRadial">
                  Radial
                </button>
                <button
                  class="btn chip-button"
                  :class="{ selected: layout === 'clusterRadial' }"
                  @click="toClusterRadial"
                  :disabled="height < 2"
                >
                  Cluster Radial
                </button>
                <button
                  class="btn chip-button"
                  :class="{ selected: layout === 'force' }"
                  @click="toForce">
                  Force
                </button>
              </div>
              <div class="panel-section-title">
                <h3>Sort</h3>
                <div class="help-icon" @click="openGuide('guide-sorting')"></div>
              </div>
              <div class="panel-flex-container layouts-container">
                <button
                  class="btn chip-button"
                  @click="sort('az')"
                  :class="{ selected: sortType === 'az' && layout !== 'force' }"
                  :disabled="layout == 'force'"
                >
                  A - Z
                </button>
                <button
                  class="btn chip-button"
                  @click="sort('height')"
                  :class="{ selected: sortType === 'height' && layout !== 'force' }"
                  :disabled="height < 2 || layout == 'force'"
                >
                  Height
                </button>
                <button
                  class="btn chip-button"
                  @click="sort('inherited')"
                  :class="{ selected: sortType === 'inherited' && layout !== 'force' }"
                  :disabled="layout == 'force'"
                >
                  Inherited
                </button>
                <button
                  class="btn chip-button"
                  @click="sort('optional')"
                  :class="{ selected: sortType === 'optional' && layout !== 'force' }"
                  :disabled="layout == 'force'"
                >
                  Optional
                </button>
              </div>
              <div class="panel-section-title">
                <h3>Configuration</h3>
                <div
                  class="help-icon"
                  @click="openGuide('guide-configuration')"
                ></div>
              </div>
              <div class="configuration-container">
                <div class="configuration-labels">
                  <p>Display all edge labels</p>
                  <div class="form-check form-switch">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="keep-labels-switch"
                      v-model="isKeepLabels"
                      @change="handleKeepLabelsUpdate()"
                    />
                    <label
                      class="form-check-label"
                      for="keep-labels-switch"
                    ></label>
                  </div>
                </div>
                <div class="configuration-distance">
                  <p>
                    Node distance
                    <button
                      class="btn chip-button"
                      disabled
                    >
                      {{ distanceValue }}
                    </button>
                  </p>
                  <input
                    v-model="distanceValue"
                    type="range"
                    min="10"
                    max="300"
                    step="2"
                    class="custom-slider"
                    @input="handleDistanceUpdate()"
                  />
                </div>
                <div
                  v-if="hasVerticalDistanceControl"
                  class="configuration-vertical-distance"
                >
                  <p>
                    Vertical distance
                    <button
                      class="btn chip-button"
                      disabled
                    >
                      {{ verticalDistanceValue }}
                    </button>
                  </p>
                  <input
                    v-model="verticalDistanceValue"
                    type="range"
                    min="6"
                    max="40"
                    step="2"
                    class="custom-slider"
                    @input="handleVerticalDistanceUpdate()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </template>
      <div class="alerts-container">
        <div class="node-alert" v-for="alert in alerts" :key="alert.id">
          <p v-if="alert.type == 'noChildren'">
            Child nodes not found in "{{ alert.source }}".
          </p>
          <p v-if="alert.type == 'duplicate'">
            Node "{{ alert.source }}" is already expanded.
          </p>
        </div>
      </div>

      <button class="btn normal-button small center-btn" @click="center">Center</button>
      <div class="graph-modal-content" ref="graphModalTarget"></div>
    </bs-modal>

    <GraphGuide ref="graphGuide" />
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useServersStore } from '@/stores/servers';
import { useConfigurationStore } from '@/stores/configuration';
import d3ToPng from 'd3-svg-to-png';
import Ontograph from '../../helpers/ontograph';

export default {
  name: 'GraphVisualization',
  props: ['data', 'title'],
  data() {
    return {
      isControlPanelOpen: false,
      fullscreen: false,

      ontograph: null,
      height: null,
      layout: null,
      sortType: 'az',

      // used when modal needs to be closed before navigation
      navigatingOutFlag: false,
      navigatingOutUrl: null,

      resizeDebounce: null,

      internal: true,
      external: true,
      optional: true,
      required: true,

      distanceValue: 30,
      verticalDistanceValue: 12,
      isKeepLabels: false,

      alerts: [],

      scrollPreventedVisible: false, // overlay on graph when scrolling without ctrl
      scrollPreventedTimeout: null,
    };
  },
  mounted() {
    const target = this.$refs.ontograph;
    this.ontograph = new Ontograph(
      this.data,
      target,
      this.navigationHandler,
      this.alertHandler,
      this.graphServer,
      this.onHeightUpdate,
    );
    this.ontograph.sort(this.sortType);
    this.height = this.ontograph.getHeight();
    this.layout = this.ontograph.getLayout();
    window.addEventListener('resize', this.onResize);

    if (localStorage.distanceValue) {
      this.distanceValue = localStorage.distanceValue;
      this.handleDistanceUpdate();
    }
    if (localStorage.isKeepLabels && localStorage.isKeepLabels === 'true') {
      this.isKeepLabels = true;
      this.handleKeepLabelsUpdate();
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    openGuide(id) {
      this.$refs.graphGuide.openGuide(id);
    },
    toTree() {
      this.ontograph.changeLayoutTo('tree');
      this.layout = this.ontograph.getLayout();
    },
    toClusterTree() {
      this.ontograph.changeLayoutTo('clusterTree');
      this.layout = this.ontograph.getLayout();
    },
    toRadial() {
      this.ontograph.changeLayoutTo('radial');
      this.layout = this.ontograph.getLayout();
    },
    toClusterRadial() {
      this.ontograph.changeLayoutTo('clusterRadial');
      this.layout = this.ontograph.getLayout();
    },
    toForce() {
      this.ontograph.changeLayoutTo('force');
      this.layout = this.ontograph.getLayout();
    },
    center() {
      this.ontograph.center();
    },
    handleDistanceUpdate() {
      this.ontograph.distanceUpdate(this.distanceValue);
    },
    handleVerticalDistanceUpdate() {
      this.ontograph.verticalDistanceUpdate(this.verticalDistanceValue);
    },
    handleKeepLabelsUpdate() {
      this.ontograph.keepLabelsUpdate(this.isKeepLabels);
    },
    filterHandler() {
      this.ontograph.filter({
        external: this.external,
        internal: this.internal,
        optional: this.optional,
        required: this.required,
      });
      this.height = this.ontograph.getHeight();
      this.layout = this.ontograph.getLayout();
    },
    navigationHandler(to) {
      if (this.fullscreen) {
        this.hideModal();
        this.navigatingOutFlag = true;
        this.navigatingOutUrl = to;
      } else {
        this.routingHandler(to);
      }
    },
    alertHandler(type, id, source) {
      this.alerts.push({
        type,
        id,
        source,
      });
      setTimeout(() => {
        this.alerts.shift();
      }, 3500);
    },
    sort(type) {
      this.sortType = type;
      this.ontograph.sort(type);
    },
    downloadAsPng() {
      d3ToPng('svg', `${this.data.label}`, {
        scale: 1,
        format: 'png',
        quality: 1,
        download: false,
        background: 'white',
      }).then((fileData) => {
        const download = document.createElement('a');
        download.href = fileData;
        download.download = `${this.data.label}.png`;
        download.click();
      });
    },
    showModal() {
      this.fullscreen = true;
      this.ontograph.setControlPanelOpen(this.isControlPanelOpen);
      this.ontograph.setIsFullscreen(this.fullscreen);
    },
    hideModal() {
      const { ontograph } = this.$refs;
      const modalOntograph = this.$refs.graphModalTarget.querySelector('svg');

      ontograph.appendChild(modalOntograph);

      this.fullscreen = false;
      this.ontograph.setControlPanelOpen(false);
      this.ontograph.resizeHandler(ontograph);
      this.ontograph.setIsFullscreen(this.fullscreen);
    },
    toggleConnectionsCollapsed() {
      this.$refs.connectionsTitle.classList.toggle('collapsed');
    },
    toggleLayoutsCollapsed() {
      this.$refs.layoutsTitle.classList.toggle('collapsed');
    },
    toggleControlPanelOpen() {
      this.isControlPanelOpen = !this.isControlPanelOpen;
      this.ontograph.setControlPanelOpen(this.isControlPanelOpen);
    },
    routingHandler(to) {
      if (to.startsWith(this.uriSpace)) {
        // internal ontology
        to = to.replace(this.uriSpace, '');
        this.$router.push({
          path: `/ontology/${to}`,
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
            ...{ query: encodeURI(to) },
            ...(this.$route.query && this.$route.query.version
              ? { version: encodeURI(this.$route.query.version) }
              : null),
          },
        });
      }
    },
    modalShown() {
      const ontograph = this.$refs.ontograph.querySelector('svg');
      const modalOntograph = this.$refs.graphModalTarget;

      modalOntograph.appendChild(ontograph);
      this.ontograph.resizeHandler(modalOntograph);
    },
    modalHidden() {
      if (!this.navigatingOutFlag) return;
      this.routingHandler(this.navigatingOutUrl);
    },
    onResize() {
      clearTimeout(this.resizeDebounce);
      this.resizeDebounce = setTimeout(() => {
        let target;
        if (this.fullscreen) {
          target = this.$refs.graphModalTarget;
        } else {
          target = this.$refs.ontograph;
        }

        this.ontograph.resizeHandler(target);
      }, 300);
    },
    onHeightUpdate() {
      this.height = this.ontograph.getHeight();
    },
    handleScrollOnMinimal() {
      this.scrollPreventedVisible = true;
      clearTimeout(this.scrollPreventedTimeout);
      this.scrollPreventedTimeout = setTimeout(() => {
        this.scrollPreventedVisible = false;
      }, 1500);
    },
  },
  computed: {
    ...mapState(useServersStore, {
      graphServer: store => store.graphServer,
    }),
    ...mapState(useConfigurationStore, {
      uriSpace: store => store.config.uriSpace,
      ontologyName: store => store.config.ontpubFamily.toLowerCase(),
    }),
    hasVerticalDistanceControl() {
      return this.layout === 'tree' || this.layout === 'clusterTree';
    }
  },
  watch: {
    distanceValue(newValue) {
      localStorage.distanceValue = newValue;
    },
    isKeepLabels(newValue) {
      localStorage.isKeepLabels = newValue;
    },
  },
};
</script>

<style lang="scss">
.graph-section {
  background: rgba(0, 0, 0, 0.05);
  position: relative;
}

.alerts-container {
  position: absolute;
  left: 0;
  top: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  pointer-events: none;

  p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;

    color: map-get($colors-map, "black-80");
    background: map-get($colors-map, "white");
    width: max-content;
    border-radius: 2px;
    padding: 5px 15px;
    margin-bottom: 10px;

    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
  }

  .node-alert {
    animation-name: alert-appear;
    animation-duration: 0.3s;
  }
}

@keyframes alert-appear {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

.control-panel {
  padding: 40px;

  .configuration-container {
    .custom-switch {
      margin-top: 10px;
    }

    .chip-button {
      width: 40px;
      margin-left: 10px;
      padding: 6px 0;
      text-align: center;
    }
  }

  &.control-panel--minimal {
    .connections-and-guide-container {
      display: flex;
      justify-content: space-between;
    }

    .minimal-menu {
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }
  }

  &.control-panel--fullscreen {
    position: absolute;
    right: -320px;
    top: 0;
    width: 320px;
    height: 100%;
    background: white;
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    transition: right 0.3s ease;
    z-index: 10;
    padding: 0;

    .control-panel-header {
      box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
      padding: 15px 30px;
    }

    .control-panel-content {
      padding: 0 30px 40px 30px;
      height: calc(100% - 60px);
      overflow-y: scroll;

      .panel-flex-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .filters-container {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .form-check {
          padding-bottom: 0;
        }
      }
    }

    .panel-section-title {
      position: relative;

      h3 {
        margin-top: 40px;
        margin-bottom: 20px;
      }

      .help-icon {
        position: absolute;
        content: "";
        background-image: url("../../assets/icons/help.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 24px 24px;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    h3.control-panel-title {
      padding: 0;
      user-select: none;
      &:hover {
        cursor: pointer;
      }

      &::after {
        position: absolute;

        content: "";
        background-image: url("../../assets/icons/close.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 24px 24px;
        right: 30px;
        width: 24px;
        height: 30px;
      }
    }

    &.visible {
      right: 0px;
    }
  }
}

.scrollPreventedInfo {
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 700px;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: large;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  opacity: 0;
  transition: opacity 0.5s;

  pointer-events: none;

  kbd {
    margin: 0 5px 0 5px;
    border: 1px solid white;
    color: rgba(255, 255, 255, 0.8);
  }

  &.visible {
    opacity: 1;
  }
}

.ontograph-minimal {
  width: 100%;
  height: 700px;
  overflow: hidden;

  .node text {
    user-select: none;
  }

  .node:hover {
    cursor: pointer;
  }
}

.graph-modal-content {
  height: 100%;

  .node text {
    user-select: none;
  }

  .node:hover {
    cursor: pointer;
  }
}

.fullscreen-btn-wrapper {
  position: absolute;
  bottom: 40px;
  left: 40px;
}

.fullscreen-button {
  bottom: 100px;
  margin-right: 5px;
  .b-icon {
    background-image: url("../../assets/icons/maximize.svg");
  }
}

.download-png-button {
  .b-icon.download {
    background-image: url("../../assets/icons/download.svg");
    width: 20px;
    height: 20px;
  }
}

.collapsible-section {
  h6 {
    padding: 0;
    margin: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #000000;
  }
  .collapsible-section-title {
    padding-bottom: 40px;
  }
  .collapsible-section-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .form-check {
      padding-right: 40px;

      .form-check-label {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}

.modal.graph-visualization.fullscreen {
  .modal-header {
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border: none;
    padding: 15px 40px;
    z-index: 2;

    justify-content: space-between;

    .left {
      display: flex;
      overflow: hidden;

      .close-btn {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 24px;
        height: 30px;
        padding: 0;
        margin-right: 20px;

        &::before {
          content: "";
          background-image: url("../../assets/icons/return-arrow.svg");
          background-repeat: no-repeat;
          background-size: 24px 24px;
          width: 24px;
          height: 24px;
        }
      }

      h3.modal-title {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 30px;
        color: #000000;

        padding: 0;
        margin: 0;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .right {
      display: flex;
      gap: 20px;
      margin-right: 0;
      transition: margin-right 0.3s ease;

      .normal-button.small {
        white-space: nowrap;
      }
    }
  }
  .modal-dialog {
    max-width: unset;
    margin: 0;
  }
  .modal-content {
    border-radius: 0;
    border: none;
    height: 100vh;
    width: 100vw;

    .center-btn {
      position: absolute;
      left: 40px;
      bottom: 40px;
    }
  }
  .modal-body {
    background: rgba(0, 0, 0, 0.05);
    padding: 0;
    height: 100%;
    position: relative;
    overflow: hidden;

    .collapsible-section {
      width: 100%;
      background: rgb(242, 242, 242);
      z-index: 1;
      .collapsible-section-title {
        padding: 20px 0px;
      }
    }
  }
}

.node-loader {
  animation: rotate 2s linear infinite;
  stroke: #fff;
}
.node-loader__circle {
  stroke: rgba(0, 0, 0, 0.8);
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 5, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 20, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 40, 150;
    stroke-dashoffset: -124;
  }
}

//mobile
@media (max-width: 768px) {
  .modal.fullscreen .modal-header {
    padding: 15px 40px 20px 40px;
    .left {
      h3.modal-title {
        color: var(--black-100, #000);
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0.32px;
        white-space: normal;
      }
      .close-btn {
        height: 24px;
      }
    }
  }

  #graphWindowWraper {
    .fullscreen-button {
      margin-left: 20px;
    }
  }

  .collapsible-section {
    .collapsible-section-title {
      padding-bottom: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .collapse-icon {
        content: "";
        background-image: url("../../assets/icons/triangle-up.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    .collapsible-section-content {
      flex-direction: column;

      .form-check {
        padding-right: 0px;
        padding-bottom: 20px;

        .form-check-label {
          padding-top: 3px;
          padding-bottom: 3px;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }

    &.collapsed {
      .collapsible-section-title .collapse-icon {
        background-image: url("../../assets/icons/triangle-down.svg");
      }
      .collapsible-section-content {
        height: 0px;
        overflow: hidden;
      }
    }
  }
}

@media (max-width: 991px) {
  .control-panel.control-panel--minimal .minimal-menu {
    display: none;
  }
  .modal-header {
    flex-wrap: wrap;
    gap: 15px;

    .right {
      flex-wrap: wrap;
    }
  }
}
@media (min-width: 991px) {
  .modal.fullscreen .modal-header {
    height: 60px;

    .right.visible {
      margin-right: 320px;
    }
  }
}
@media (min-width: 1300px) {
  .control-panel.control-panel--minimal .minimal-menu {
    position: absolute;
    right: 40px;
  }
}

@media (max-width: 1300px) {
  .control-panel.control-panel--minimal {
    .connections-and-guide-container {
      flex-direction: column-reverse;
      align-items: stretch;

      button {
        margin: 0 10px 20px 0 !important;
      }
    }
  }
  .graph-section {
    .collapsible-section {
      .collapsible-section-title {
        padding-bottom: 20px;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        .collapse-icon {
          content: "";
          background-image: url("../../assets/icons/triangle-up.svg");
          background-repeat: no-repeat;
          background-size: 24px 24px;
          width: 24px;
          height: 24px;
        }
      }

      .collapsible-section-content {
        flex-direction: column;

        .form-check {
          padding-right: 0px;
          padding-bottom: 20px;

          .form-check-label {
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }

      &.collapsed {
        .collapsible-section-title .collapse-icon {
          background-image: url("../../assets/icons/triangle-down.svg");
        }
        .collapsible-section-content {
          height: 0px;
          overflow: hidden;
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .fullscreen-btn-wrapper {
    bottom: 40px;
    left: 20px;
  }
}
</style>
