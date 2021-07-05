<template>
  <div id="graphWindowWraper">
    <b class="mr-1 ml-4">Connections:</b>
    <br />
    <div class="ml-4">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          name="edgesFilter"
          id="internal"
          value="internal"
        />
        <label class="form-check-label" for="internal">class specific</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          name="edgesFilter"
          id="external"
          value="external"
        />
        <label class="form-check-label" for="external">inherited</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          name="edgesFilter"
          id="optional"
          value="optional"
        />
        <label class="form-check-label" for="optional">optional</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          name="edgesFilter"
          id="non_optional"
          value="non_optional"
        />
        <label class="form-check-label" for="non_optional">required</label>
      </div>
    </div>

    <div id="smallGraph">
      <div id="ontograph"></div>
    </div>

    <div class="row justify-content-md-center">

            <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          v-on:click="swapGraphContent()"
        >
          Expand diagram
        </button>
    </div>

    <div
      class="modal down"
      id="graphModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="graphModalLabel"
      aria-hidden="true"
      v-bind:class="{ fade: !modalVisible }"
    >
      <div
        class="modal-dialog-full-width modal-dialog momodel modal-fluid"
        role="document"
      >
        <div class="modal-content-full-width modal-content">
          <div class="modal-header-full-width modal-header">
            <h5 class="modal-title w-100" id="graphModalLabel">
              <b class="mr-1 ml-4">Data model for "<i>{{title}}</i>"</b>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              v-on:click="hideModal()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="graphModalBody" class="modal-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vis from 'vis-network';

export default {
  name: 'vis-network',
  props: ['data', 'title'],
  data() {
    return {
      modalVisible: false,
    };
  },
  mounted() {
    if (this.data) {
      const nodes = new vis.DataSet(this.data.nodes);
      const edges = new vis.DataSet(this.data.edges);

      const container = document.getElementById('ontograph');
      const edgeFilters = document.getElementsByName('edgesFilter');

      const isSomeGreenSquare = this.data.nodes.some(
        node => node.color == '#C2FABC',
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
      const edgesFilter = edge => edgesFilterValues[edge.optional] && edgesFilterValues[edge.type];

      edgeFilters.forEach(filter => filter.addEventListener('change', (e) => {
        const { value, checked } = e.target;
        edgesFilterValues[value] = checked;
        edgesView.refresh();
      }));
      const edgesView = new vis.DataView(edges, { filter: edgesFilter });
      const data = {
        nodes,
        edges: edgesView,
      };
      const options = {
        edges: {
          smooth: {
            type: 'cubicBezier',
            forceDirection: 'none',
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
          solver: 'forceAtlas2Based',
        },
      };
      const network = new vis.Network(container, data, options);

      window.network = network;

      network.redraw();

      network.on('doubleClick', (params) => {
        const versionQueryStringPart = this.$route.query && this.$route.query.version
          ? `version=${encodeURI(this.$route.query.version)}`
          : null;
        params.event = '[original event]';
        const selectedNodes = params.nodes;
        const selectedEdges = params.edges;

        if (selectedNodes[0] !== undefined) {
          const sNode = selectedNodes[0];
          nodes.forEach((entry) => {
            if (entry.id === sNode) {
              if (entry.iri.match(/^https:\/\/spec\.edmcouncil\.org\/fibo/)) {
                window.location.href = `/fibo${entry.iri.replace(
                  'https://spec.edmcouncil.org/fibo',
                  '',
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
                  'https://spec.edmcouncil.org/fibo',
                  '',
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
      document
        .getElementById('graphModalBody')
        .appendChild(document.getElementById('ontograph'));

      const options = {
        edges: {
          smooth: {
            type: 'cubicBezier',
            forceDirection: 'none',
            roundness: 0.15,
          },
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -95,
            centralGravity: 0.005,
            springLength: 400,
            springConstant: 0.41,
          },
          minVelocity: 0.75,
          solver: 'forceAtlas2Based',
        },
      };

      window.network.setOptions(options);
      this.modalVisible = true;

      setTimeout(() => {
        window.network.fit();
      }, 100);
    },
    hideModal() {
      document
        .getElementById('smallGraph')
        .appendChild(document.getElementById('ontograph'));
      const options = {
        edges: {
          smooth: {
            type: 'cubicBezier',
            forceDirection: 'none',
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
          solver: 'forceAtlas2Based',
        },
      };
      window.network.setOptions(options);
      window.network.fit();
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="scss">
.modal {
  padding: 10px;
  display: block;

  .modal-dialog {
    max-width: 100%;
  }
  &.fade {
    display: none;
  }
}
</style>
