<template>
  <div class="graph-section">
    <div class="control-panel control-panel--minimal">
      <div class="layouts-and-guide-container">
        <div ref="layoutsTitle" class="collapsible-section collapsed">
          <div
            class="collapsible-section-title"
            @click="toggleLayoutsCollapsed()"
          >
            <h6>Layouts</h6>
            <div class="collapse-icon"></div>
          </div>

          <div class="collapsible-section-content">
            <button class="btn normal-button small" @click="toTree">
              Tree
            </button>
            <button
              class="btn normal-button small"
              @click="toClusterTree"
              :disabled="height < 2"
            >
              Cluster Tree
            </button>
            <button class="btn normal-button small" @click="toRadial">
              Radial
            </button>
            <button
              class="btn normal-button small"
              @click="toClusterRadial"
              :disabled="height < 2"
            >
              Cluster Radial
            </button>
            <button class="btn normal-button small" @click="toForce">
              Force
            </button>
          </div>
        </div>
        <div class="minimal-user-guide">
          <button
            class="btn normal-button small"
            @click="openGuide('guide-main')"
          >
            User Guide
          </button>
        </div>
      </div>

      <div ref="connectionsTitle" class="collapsible-section collapsed">
        <div
          class="collapsible-section-title"
          @click="toggleConnectionsCollapsed()"
        >
          <h6>Connections</h6>
          <div class="collapse-icon"></div>
        </div>

        <div class="collapsible-section-content">
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="internal"
              value="internal"
              v-model="internal"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="internal">
              Class specific
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="external"
              value="external"
              v-model="external"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="external">Inherited</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="optional"
              value="optional"
              v-model="optional"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="optional">Optional</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="non_optional"
              value="non_optional"
              v-model="required"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="non_optional">
              Required
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="ontograph-minimal" ref="ontograph"></div>
    <div class="fullscreen-btn-wrapper row">
      <button
        type="button"
        class="btn normal-button icon-button fullscreen-button"
        v-on:click="showModal()"
      >
        Full screen
        <div class="b-icon"></div>
      </button>
      <button
        type="button"
        class="btn normal-button icon-button fullscreen-button"
        v-on:click="downloadAsPng()"
      >
        Download as PNG
        <div class="b-icon download"></div>
      </button>
    </div>

    <b-modal
      v-model="fullscreen"
      footer-class="d-none"
      modal-class="fullscreen"
      @shown="modalShown()"
      @hidden="modalHidden()"
    >
      <template v-slot:modal-header>
        <div
          type="button"
          class="close-btn"
          data-dismiss="modal"
          aria-label="Close"
          @click="hideModal()"
        ></div>
        <h5 class="modal-title">
          Data model for {{ data.label }}
          <slot name="label"></slot>
        </h5>
      </template>
      <div class="alerts-container">
        <div class="node-alert" v-for="alert in alerts" :key="alert.id">
          <p v-if="alert.type=='noChildren'">
            Child nodes not found in "{{ alert.source }}".
          </p>
          <p v-if="alert.type=='duplicate'">
            Node "{{ alert.source }}" is already expanded.
          </p>
        </div>
      </div>
      <div class="open-control-panel-text">
        <button
          class="btn normal-button small"
          @click="toggleControlPanelOpen()"
        >
          Open Control Panel
        </button>
      </div>
      <div
        class="control-panel control-panel--fullscreen"
        :class="{ visible: isControlPanelOpen }"
      >
        <h2 @click="toggleControlPanelOpen()">Control Panel</h2>
        <div class="panel-section-title">
          <h3>Menu</h3>
        </div>
        <button class="btn normal-button small" @click="center">Center</button>
        <button
          class="btn normal-button small"
          @click="openGuide('guide-main')"
        >
          User Guide
        </button>
        <button
          class="btn normal-button small icon-button fullscreen-button"
          v-on:click="downloadAsPng()"
        >
          Download as PNG
          <div class="b-icon download"></div>
        </button>
        <div class="panel-section-title">
          <h3>Connections</h3>
          <div class="help-icon" @click="openGuide('guide-connections')"></div>
        </div>
        <div class="filters-container">
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="internal"
              value="internal"
              v-model="internal"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="internal">
              Class specific
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="external"
              value="external"
              v-model="external"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="external">Inherited</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="optional"
              value="optional"
              v-model="optional"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="optional">Optional</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="non_optional"
              value="non_optional"
              v-model="required"
              @change="filterHandler()"
            />
            <label class="custom-control-label" for="non_optional">
              Required
            </label>
          </div>
        </div>
        <div class="panel-section-title">
          <h3>Layout</h3>
          <div class="help-icon" @click="openGuide('guide-layouts')"></div>
        </div>
        <div class="layouts-container">
          <button class="btn normal-button small" @click="toTree">Tree</button>
          <button
            class="btn normal-button small"
            @click="toClusterTree"
            :disabled="height < 2"
          >
            Cluster Tree
          </button>
          <button class="btn normal-button small" @click="toRadial">
            Radial
          </button>
          <button
            class="btn normal-button small"
            @click="toClusterRadial"
            :disabled="height < 2"
          >
            Cluster Radial
          </button>
          <button class="btn normal-button small" @click="toForce">
            Force
          </button>
        </div>
        <div class="panel-section-title">
          <h3>Sort</h3>
          <div class="help-icon" @click="openGuide('guide-sorting')"></div>
        </div>
        <div class="layouts-container">
          <button
            class="btn normal-button small"
            @click="sortAZ"
            :disabled="layout == 'force'"
          >
            A - Z
          </button>
          <button
            class="btn normal-button small"
            @click="sortHeight"
            :disabled="height < 2 || layout == 'force'"
          >
            Height
          </button>
          <button
            class="btn normal-button small"
            @click="sortType"
            :disabled="layout == 'force'"
          >
            Inherited
          </button>
          <button
            class="btn normal-button small"
            @click="sortInherited"
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
          <div class="configuration-distance">
            <p>Node distance: {{ distanceValue }}</p>
            <input v-model="distanceValue" type="range" min="10" max="300" step="2" class="custom-slider" @input="handleDistanceUpdate()">
          </div>
          <div class="configuration-labels">
            <p>Display all edge labels</p>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="keep-labels-switch"
                v-model="isKeepLabels"
                @change="handleKeepLabelsUpdate()"
              />
              <label
                class="custom-control-label"
                for="keep-labels-switch"
              ></label>
            </div>
          </div>
        </div>
      </div>
      <div class="graph-modal-content" ref="graphModalTarget"></div>
    </b-modal>

    <GraphGuide ref="graphGuide" />
  </div>
</template>

<script>
import { Ontograph } from "../../helpers/ontograph";
import { mapState } from "vuex";
const d3ToPng = require('d3-svg-to-png');

export default {
  name: "GraphVisualization",
  props: ["data", "title"],
  data() {
    return {
      isControlPanelOpen: false,
      fullscreen: false,

      ontograph: null,
      height: null,
      layout: null,

      // used when modal needs to be closed before navigation
      navigatingOutFlag: false,
      navigatingOutUrl: null,

      resizeDebounce: null,

      internal: true,
      external: true,
      optional: true,
      required: true,

      distanceValue: 50,
      isKeepLabels: false,

      alerts: [],
    };
  },
  mounted() {
    const target = this.$refs.ontograph;
    this.ontograph = new Ontograph(
      this.data,
      target,
      this.navigationHandler,
      this.alertHandler,
      this.graphServer
    );
    this.height = this.ontograph.getHeight();
    this.layout = this.ontograph.getLayout();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    openGuide(id) {
      this.$refs.graphGuide.openGuide(id);
    },
    toTree() {
      this.ontograph.changeLayoutTo("tree");
      this.layout = this.ontograph.getLayout();
    },
    toClusterTree() {
      this.ontograph.changeLayoutTo("clusterTree");
      this.layout = this.ontograph.getLayout();
    },
    toRadial() {
      this.ontograph.changeLayoutTo("radial");
      this.layout = this.ontograph.getLayout();
    },
    toClusterRadial() {
      this.ontograph.changeLayoutTo("clusterRadial");
      this.layout = this.ontograph.getLayout();
    },
    toForce() {
      this.ontograph.changeLayoutTo("force");
      this.layout = this.ontograph.getLayout();
    },
    center() {
      this.ontograph.center();
    },
    handleDistanceUpdate() {
      this.ontograph.distanceUpdate(this.distanceValue);
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
        source
      });
      setTimeout(() => {
        this.alerts.shift();
      }, 3500);
    },
    sortAZ() {
      this.ontograph.sort("az");
    },
    sortHeight() {
      this.ontograph.sort("height");
    },
    sortType() {
      this.ontograph.sort("type");
    },
    sortInherited() {
      this.ontograph.sort("inherited");
    },
      downloadAsPng(){
      d3ToPng('svg', `${this.data.label}`, { scale: 1,
        format: 'png',
        quality: 1,
        download: false,
      background: 'white'})
      .then(fileData => {
        var download = document.createElement('a');
        download.href = fileData;
        download.download = `${this.data.label}.png`;
        download.click();
  //do something with the data
});;
    },
    showModal() {
      this.fullscreen = true;
      this.ontograph.setControlPanelOpen(this.isControlPanelOpen);
    },
    hideModal() {
      const ontograph = this.$refs.ontograph;
      const modalOntograph = this.$refs.graphModalTarget.querySelector("svg");

      ontograph.appendChild(modalOntograph);

      this.fullscreen = false;
      this.ontograph.setControlPanelOpen(false);
      this.ontograph.resizeHandler(ontograph);
    },
    toggleConnectionsCollapsed() {
      this.$refs.connectionsTitle.classList.toggle("collapsed");
    },
    toggleLayoutsCollapsed() {
      this.$refs.layoutsTitle.classList.toggle("collapsed");
    },
    toggleControlPanelOpen() {
      this.isControlPanelOpen = !this.isControlPanelOpen;
      this.ontograph.setControlPanelOpen(this.isControlPanelOpen);
    },
    routingHandler(to) {
      if (to.startsWith(this.uriSpace)) {
        // internal ontology
        to = to.replace(this.uriSpace, "");
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
          path: "/ontology",
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
      const ontograph = this.$refs.ontograph.querySelector("svg");
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
  },
  computed: {
    ...mapState({
      graphServer: (state) => state.servers.graphServer,
    }),
    uriSpace() {
      return this.$store.state.configuration.uriSpace;
    },
    ontologyName() {
      return this.$store.state.configuration.ontpubFamily.toLowerCase();
    },
  },
};
</script>

<style lang="scss">
.graph-section {
  background: rgba(0, 0, 0, 0.05);
}

.normal-button.small {
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 0px 10px 10px 0px !important;
}

.open-control-panel-text {
  position: absolute;
  right: 30px;
  top: 30px;
  user-select: none;
  opacity: 0.5;

  .normal-button.small {
    margin: 0 !important;
  }

  &:hover {
    opacity: 1;
  }
}

.alerts-container {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  pointer-events: none;

  p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;

    color: map-get($colors-map, "black-80");
    background: map-get($colors-map, "white");
    width: max-content;
    border-radius: 2px;
    padding: 5px 15px;
    margin-top: 10px;

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
  padding: 30px;

  .configuration-container {
    .custom-switch {
      margin-top: 5px;
    }

    .custom-slider {
      margin-top: 10px;
      margin-bottom: 25px;
    }
  }

  &.control-panel--minimal {
    .layouts-and-guide-container {
      display: flex;
      justify-content: space-between;
    }
  }

  &.control-panel--fullscreen {
    position: absolute;
    right: -300px;
    top: 0;
    width: 300px;
    height: 100%;
    background: white;
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    transition: right 0.3s ease;

    overflow-y: scroll;

    .panel-section-title {
      position: relative;

      h3 {
        margin-top: 30px;
        margin-bottom: 15px;
      }

      .help-icon {
        position: absolute;

        content: "";
        background-image: url("../../assets/icons/help.svg");
        opacity: 0.4;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px 16px;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;

        &:hover {
          cursor: pointer;
          opacity: 0.6;
        }
      }
    }

    h2 {
      margin-bottom: 40px;
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
        transform: rotate(180deg);
        right: 30px;
        width: 24px;
        height: 36px;
      }
    }

    &.visible {
      right: 0px;
    }
  }
}

.ontograph-minimal {
  width: 100%;
  height: 500px;
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
  bottom: 100px;
  left: 100px;
}

.fullscreen-button {
  bottom: 100px;
  margin-right: 5px;
  .b-icon {
    background-image: url("../../assets/icons/maximize.svg");
  }
  .b-icon.download {
    background-image: url("../../assets/icons/download.svg");
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
    padding-bottom: 15px;
  }
  .collapsible-section-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-bottom: 20px;
    .custom-control {
      padding-right: 40px;
      // padding-bottom: 15px;

      .custom-control-label {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}

.modal.fullscreen {
  display: block;

  .modal-header {
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border: none;
    padding: 18px 30px;
    z-index: 2;

    justify-content: start;

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

    h5.modal-title {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 30px;
      color: #000000;

      padding: 0;
      margin: 0;
      position: relative;
    }
  }
  .modal-dialog {
    margin: 0;
  }
  .modal-content {
    border-radius: 0;
    border: none;
    height: 100vh;
    width: 100vw;
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
  .modal .modal-header {
    h5.modal-title {
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.6);
    }
    .close-btn {
      height: 24px;
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

      .custom-control {
        padding-right: 0px;
        padding-bottom: 20px;

        .custom-control-label {
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

@media (max-width: 1300px) {
  .control-panel--minimal {
    .layouts-and-guide-container {
      flex-direction: column-reverse;
      align-items: stretch;

      button {
        margin: 0 0 45px 0 !important;
        width: 100%;
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

        .custom-control {
          padding-right: 0px;
          padding-bottom: 20px;

          .custom-control-label {
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
    bottom: 80px;
    left: 55px;
  }
}
</style>
