<template>
  <div class="graph-section">
    <div class="control-panel control-panel--minimal">
      <div ref="layoutsTitle" class="collapsible-section">
        <div class="collapsible-section-title" @click="toggleLayoutsCollapsed()">
          <h6>Layouts</h6>
          <div class="collapse-icon"></div>
        </div>

        <div class="collapsible-section-content">
          <button class="btn normal-button small" @click="toTree">Tree</button>
          <button class="btn normal-button small"
            @click="toClusterTree"
            :disabled="height < 2"
          >Cluster Tree</button>
          <button class="btn normal-button small" @click="toRadial">Radial</button>
          <button class="btn normal-button small"
            @click="toClusterRadial"
            :disabled="height < 2"
          >Cluster Radial</button>
          <button class="btn normal-button small" @click="toForce">Force</button>
        </div>
      </div>
      <div ref="connectionsTitle" class="collapsible-section collapsed">
        <div class="collapsible-section-title"  @click="toggleConnectionsCollapsed()">
          <h6>Connections</h6>
          <div class="collapse-icon"></div>
        </div>

        <div class="collapsible-section-content collapsed">
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
    <div class="fullscreen-btn-wrapper">
      <button
        type="button"
        class="btn normal-button icon-button fullscreen-button"
        v-on:click="showModal()"
      >
        Full screen
        <div class="b-icon"></div>
      </button>
    </div>

    <b-modal
      v-model="fullscreen"
      footer-class="d-none"
      @shown="modalShown()"
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
      <div class="open-control-panel-text">
        <p @click="isControlPanelOpen = !isControlPanelOpen">
          Show Control Panel
        </p>
      </div>
      <div class="control-panel control-panel--fullscreen" :class="{visible: isControlPanelOpen}">
        <h2 @click="isControlPanelOpen = !isControlPanelOpen">Control Panel</h2>
        <button class="btn normal-button small" @click="center">Center</button>
        <h3>Connections</h3>
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
        <h3>Layout</h3>
        <div class="layouts-container">
          <button class="btn normal-button small" @click="toTree">Tree</button>
          <button class="btn normal-button small"
            @click="toClusterTree"
            :disabled="height < 2"
          >Cluster Tree</button>
          <button class="btn normal-button small" @click="toRadial">Radial</button>
          <button class="btn normal-button small"
            @click="toClusterRadial"
            :disabled="height < 2"
          >Cluster Radial</button>
          <button class="btn normal-button small" @click="toForce">Force</button>
        </div>
        <h3>Sort</h3>
        <div class="layouts-container">
          <button class="btn normal-button small" @click="sortAZ" :disabled="layout == 'force'">A - Z</button>
          <button class="btn normal-button small" @click="sortHeight" :disabled="height < 2 || layout == 'force'">
            Height
          </button>
          <button class="btn normal-button small" @click="sortType" :disabled="layout == 'force'">
            Inherited
          </button>
          <button class="btn normal-button small" @click="sortInherited" :disabled="layout == 'force'">
            Optional
          </button>
        </div>

      </div>
      <div class="graph-modal-content" ref="graphModalTarget">

      </div>
    </b-modal>

  </div>
</template>

<script>
import { Ontograph } from '../../helpers/ontograph';

export default {
  name: "GraphVisualization",
  props: ["data", "title"],
  data() {
    return {
      isControlPanelOpen: true,
      fullscreen: false,
      ontograph: null,
      height: null,
      layout: null,

      internal: true,
      external: true,
      optional: true,
      required: true,
    };
  },
  mounted() {
    const target = this.$refs.ontograph;
    this.ontograph = new Ontograph(this.data, target, this.navigationHandler);

    this.height = this.ontograph.getHeight();
    this.layout = this.ontograph.getLayout();
  },
  methods: {
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
      const versionQueryStringPart =
          this.$route.query && this.$route.query.version
            ? `?version=${encodeURI(this.$route.query.version)}`
            : "";
      if(this.fullscreen) {
        this.hideModal();
      }
      if (to.startsWith(`https://spec.edmcouncil.org/${this.ontologyName}`)) {
        // internal ontology
        to = to.replace(`https://spec.edmcouncil.org/${this.ontologyName}`, "");
        window.location.href = `${to}${versionQueryStringPart}`;
      } else {
        // external ontology
        window.location.href = `/${this.ontologyName}/ontology?query=${to}${versionQueryStringPart}`;
      }
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
    showModal() {
      this.fullscreen = true;
    },
    hideModal() {
      const ontograph = this.$refs.ontograph;
      const modalOntograph = this.$refs.graphModalTarget.querySelector('svg');

      ontograph.appendChild(modalOntograph);

      this.fullscreen = false;
      this.ontograph.resizeHandler(ontograph);
    },
    modalShown() {
      const ontograph = this.$refs.ontograph.querySelector('svg');
      const modalOntograph = this.$refs.graphModalTarget;

      modalOntograph.appendChild(ontograph);
      this.ontograph.resizeHandler(modalOntograph);
    },
    toggleConnectionsCollapsed() {
      this.$refs.connectionsTitle.classList.toggle('collapsed');
    },
    toggleLayoutsCollapsed() {
      this.$refs.layoutsTitle.classList.toggle('collapsed');
    },
  },
  computed: {
    ontologyName() {
      return process.env.ontologyName.toLowerCase();
    },
  }
};
</script>

<style lang="scss">
.open-control-panel-text {
  position: absolute;
  right: 30px;
  top: 30px;
  user-select: none;
  opacity: 0.5;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}

.control-panel {
  padding: 30px;
  .normal-button.small {
    padding: 5px 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin: 0px 10px 10px 0px !important;
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

    h3 {
      margin-top: 30px;
      margin-bottom: 15px;
    }

    h2 {
      margin-bottom: 15px;
      user-select: none;
      &:hover {
        cursor: pointer;
      }

      &::after {
        position: absolute;

        content: "";
        background-image: url("../../assets/icons/return-arrow.svg");
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
  .b-icon {
    background-image: url("../../assets/icons/maximize.svg");
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

.modal {
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
