<template>
  <div id="graphWindowWraper" class="graph-parent">


    <div class="smallGraphWraper">

      <div id="connectionsMenu" ref="connectionsElement" class="collapsed">
        <div
          class="connections-title"
          @click="toggleConnectionsCollapsed()"
        >
          <h6>Connections</h6>
          <div class="collapse-icon"></div>
        </div>

        <div class="connections-list">
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="internal"
              value="internal"
            />
            <label class="custom-control-label" for="internal">Class specific</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="edgesFilter"
              id="external"
              value="external"
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
            />
            <label class="custom-control-label" for="non_optional">Required</label>
          </div>
        </div>

      </div>

      <div id="smallGraph">
        <div id="ontograph"></div>
      </div>
    </div>

    <div class="row">
      <button
        type="button"
        class="btn normal-button icon-button fullscreen-button"
        v-on:click="swapGraphContent()"
      >
        Full screen
        <div class="b-icon"></div>
      </button>
    </div>

    <div
      class="modal"
      id="graphModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="graphModalLabel"
      aria-hidden="true"
      v-show="modalVisible"
    >
      <div class="modal-dialog-full-width" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div
                type="button"
                class="close-btn"
                data-dismiss="modal"
                aria-label="Close"
                v-on:click="hideModal()"
              ></div>
            <h5 class="modal-title" id="graphModalLabel">
              Data model for {{ title }}
            </h5>
          </div>
          <div id="graphModalBody" class="modal-body graph-parent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vis from "vis-network";

export default {
  name: "vis-network",
  props: ["data", "title"],
  data() {
    return {
      modalVisible: false,
      connectionsCollapsed: true,
    };
  },
  mounted() {
    if (this.data) {
      // console.log(this.data.nodes);
      // console.log(this.data.edges);

      this.data.nodes.forEach(function(part, index) {

        this[index].shape = "box";
        this[index].shapeProperties = { borderRadius : 40 };

        if(this[index].id === 1){
          this[index].color = "#ffffff";
          this[index].font.size = this[index].font.size + 5;
          this[index].heightConstraint = 25;
        }
        if(this[index].color === null){
          this[index].color = "#616161"
          this[index].font.color = "#ffffff"
        }
        if(this[index].color === "#C2FABC"){
          this[index].color = "#ffffff"
        }
      }, this.data.nodes);


      const nodes = new vis.DataSet(this.data.nodes);
      const edges = new vis.DataSet(this.data.edges);

      const container = document.getElementById("ontograph");
      const edgeFilters = document.getElementsByName("edgesFilter");

      const isSomeGreenSquare = this.data.nodes.some(
        (node) => node.color == "#C2FABC"
      );

      // initial checkboxes setting
      const edgesFilterValues = {
        optional: true,
        non_optional: true,
        internal: true,
        external: !isSomeGreenSquare || false,
      };
      edgeFilters.forEach((filter) => {
        filter.checked = edgesFilterValues[filter.value];
      });
      const edgesFilter = (edge) =>
        edgesFilterValues[edge.optional] && edgesFilterValues[edge.type];

      edgeFilters.forEach((filter) =>
        filter.addEventListener("change", (e) => {
          const { value, checked } = e.target;
          edgesFilterValues[value] = checked;
          edgesView.refresh();
          nodeView.refresh();
        })
      );
      const edgesView = new vis.DataView(edges, { filter: edgesFilter });

      var nodeView = new vis.DataView(nodes, {
        filter: function (node) {
          let connEdges = edgesView.get({
            filter: function (edge) {
              return edge.to === node.id || edge.from === node.id;
            },
          });
          return connEdges.length > 0 || node.id === 1;
        },
      });

      const data = {
        nodes: nodeView,
        edges: edgesView,
      };
      const options = {
        edges: {
          smooth: {
            type: "cubicBezier",
            forceDirection: "none",
            roundness: 0.15,
          },
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -95,
            centralGravity: 0.005,
            springLength: 200,
            springConstant: 0.415,
          },
          minVelocity: 0.75,
          solver: "forceAtlas2Based",
        },
      };
      const network = new vis.Network(container, data, options);

      window.network = network;

      network.redraw();

      network.on("doubleClick", (params) => {
        const versionQueryStringPart =
          this.$route.query && this.$route.query.version
            ? `version=${encodeURI(this.$route.query.version)}`
            : null;
        params.event = "[original event]";
        const selectedNodes = params.nodes;
        const selectedEdges = params.edges;

        if (selectedNodes[0] !== undefined) {
          const sNode = selectedNodes[0];
          nodes.forEach((entry) => {
            if (entry.id === sNode) {
              if (entry.iri.match(/^https:\/\/spec\.edmcouncil\.org\/fibo/)) {
                window.location.href = `/fibo${entry.iri.replace(
                  "https://spec.edmcouncil.org/fibo",
                  ""
                )}?${versionQueryStringPart}`; // &scrollToTop=true
              } else {
                window.location.href = `/fibo/ontology?query=${entry.iri}&${versionQueryStringPart}`; // &scrollToTop=true
              }
            }
          });
        } else if (selectedEdges[0] !== undefined) {
          const sEgde = selectedEdges[0];
          edgesView.forEach((entry) => {
            if (entry.id === sEgde) {
              if (entry.iri.match(/^https:\/\/spec\.edmcouncil\.org\/fibo/)) {
                window.location.href = `/fibo${entry.iri.replace(
                  "https://spec.edmcouncil.org/fibo",
                  ""
                )}?${versionQueryStringPart}`; // &scrollToTop=true
              } else {
                window.location.href = `/fibo/ontology?query=${entry.iri}&${versionQueryStringPart}`; // &scrollToTop=true
              }
            }
          });
        }
      });
    }
  },
  methods: {
    swapGraphContent() {
      const graphModalElement = document.getElementById("graphModalBody");
      const connectionsMenuElement = document.getElementById("connectionsMenu");
      const ontographElement = document.getElementById("ontograph");

      document.body.style.overflowY = "hidden";

      graphModalElement.appendChild(connectionsMenuElement);
      graphModalElement.appendChild(ontographElement);

      const options = {
        edges: {
          smooth: {
            type: "cubicBezier",
            forceDirection: "none",
            roundness: 0.15,
          },
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -95,
            centralGravity: 0.005,
            springLength: 300,
            springConstant: 0.412,
          },
          minVelocity: 0.75,
          solver: "forceAtlas2Based",
        },
      };

      window.network.setOptions(options);
      this.modalVisible = true;

      this.$nextTick(() => {
        this.adjustGraphSize();
        window.network.fit();
      });
      setTimeout(() => {
        window.network.fit({
          animation: {
            duration: 50,
          }
        });
      }, 100);
    },
    hideModal() {
      document.body.style.overflowY = "scroll";

      document
        .getElementById("graphWindowWraper").querySelector('.smallGraphWraper')
        .insertBefore(
          document.getElementById("connectionsMenu"),
          document.getElementById("graphWindowWraper").querySelector('.smallGraphWraper').childNodes[0]
        );
      document
        .getElementById("smallGraph")
        .appendChild(document.getElementById("ontograph"));
      const options = {
        edges: {
          smooth: {
            type: "cubicBezier",
            forceDirection: "none",
            roundness: 0.15,
          },
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -95,
            centralGravity: 0.005,
            springLength: 200,
            springConstant: 0.415,
          },
          minVelocity: 0.75,
          solver: "forceAtlas2Based",
        },
      };
      window.network.setOptions(options);

      this.modalVisible = false;
      this.adjustGraphSize();
      window.network.fit();
    },
    toggleConnectionsCollapsed() {
      this.$refs.connectionsElement.classList.toggle('collapsed');
      this.adjustGraphSize();
    },
    adjustGraphSize(){
      if(this.modalVisible){
        const graphModalElement = document.getElementById("graphModalBody");
        const connectionsMenuElement = document.getElementById("connectionsMenu");

        const adjustedHeight = graphModalElement.clientHeight-connectionsMenuElement.clientHeight;
        window.network.setSize('100%',`${adjustedHeight}px`);
      }else{
        window.network.setSize('100%', '100%');
      }
      window.network.redraw();
    }
  },
};
</script>

<style lang="scss">
#graphWindowWraper {
  background: rgba(0, 0, 0, 0.05);
  padding: 40px 0px;
  .fullscreen-button {
    margin-top: 40px;
    margin-left: 40px;
    .b-icon {
      background-image: url("../assets/icons/maximize.svg");
    }
  }
}
#smallGraph {
  height: 500px;
}
#ontograph {
  height: 100%;
}


// global/not in modal
#connectionsMenu {
  padding-left: 40px;
  padding-right: 40px;
    h6{
        padding: 0;
        margin: 0;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 30px;
        color: #000000;
    }
    .connections-title {
      padding-bottom: 40px;
    }
    .connections-list {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      .custom-control {
        padding-right: 40px;
        padding-bottom: 40px;

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

//global in modal
.modal {
  display: block;

  .modal-header {
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border: none;
    padding: 18px 30px;
    z-index:2;

    justify-content:start;

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
          background-image: url("../assets/icons/return-arrow.svg");
          background-repeat: no-repeat;
          background-size: 24px 24px;
          width: 24px;
          height: 24px;
        }
      }

    h5 {
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

    #connectionsMenu {

      width: 100%;
      background: rgb(242,242,242);
      z-index: 1;
      .connections-title {
        padding: 20px 0px;
      }
    }
  }
}


//mobile
@media (max-width: 768px) {
  .modal .modal-header {
    h5 {
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

  #connectionsMenu {
    padding-left: 30px;
    padding-right: 30px;

    .connections-title {
      padding-bottom: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .collapse-icon {
        content: "";
        background-image: url("../assets/icons/triangle-up.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    .connections-list {
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
      .connections-title .collapse-icon  {
          background-image: url("../assets/icons/triangle-down.svg");
      }
      .connections-list {
        height: 0px;
        overflow: hidden;
      }
    }
  }

}

@media (max-width: 1300px) {
.smallGraphWraper{
  #connectionsMenu {
    padding-left: 30px;
    padding-right: 30px;

    .connections-title {
      padding-bottom: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor:pointer;

      .collapse-icon {
        content: "";
        background-image: url("../assets/icons/triangle-up.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    .connections-list {
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
      .connections-title .collapse-icon  {
          background-image: url("../assets/icons/triangle-down.svg");
      }
      .connections-list {
        height: 0px;
        overflow: hidden;
      }
    }
  }
}
}
</style>
