<template>
  <div>
    <GraphGuideModal
      modalId="guide-main"
      :open="currentPage=='guide-main'"
      @closeEvent="closeHandler()"
    >
      <template v-slot:label> User Guide: Overview </template>

      <template v-slot:content>
        <article>
          <div class="see-also-box">
            <h3>User Guide pages:</h3>
            <p><b>1. Overview</b></p>
            <p>
              2.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-connections')"
                @keydown="navigateToPage('guide-connections')"
              >Connections</span
              >
            </p>
            <p>
              3.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-layouts')"
                @keydown="navigateToPage('guide-layouts')"
              >Layouts</span
              >
            </p>
            <p>
              4.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-sorting')"
                @keydown="navigateToPage('guide-sorting')"
              >Sorting</span
              >
            </p>
            <p>
              5.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-configuration')"
                @keydown="navigateToPage('guide-configuration')"
              >Configuration</span
              >
            </p>
          </div>
          <h1>Overview</h1>
          <h2>1. Introduction</h2>
          <p>
            This guide explains how to explore the graph data and conventions
            used.
          </p>
          <p>
            Ontoviewer graph is the visualization tool that shows connections
            and relationships between resources. Initially it will contain all
            resources that are directly connected to the currently viewed
            resource - the root.
          </p>

          <h2>2. Graph section</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-basics-0.png"
              fluid
              center
              alt="Graph general image"
              style="transform-origin: top left"
            ></b-img>
          </div>
          <p>
            In the graph section the user has access to
            <span
              class="guide-navigation"
              @click="navigateToPage('guide-connections')"
              @keydown="navigateToPage('guide-connections')"
            >connections</span
            >
            filters. The graph visualization is fully interactive and the data
            can be explored. The viewport can be panned by dragging with left
            mouse button outside nodes. It can be zoomed in and out with mouse
            wheel.
          </p>
          <p>
            To expand the view press the "Full screen" button. It will open a
            more advanced and comfortable full screen window.
          </p>

          <h2>3. Full screen view</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-basics-1.png"
              fluid
              center
              alt="Graph general image"
              style="transform-origin: top left"
            ></b-img>
          </div>
          <p>
            In the full screen view the graph is expanded to fit the whole
            screen which translates to more comfortable experience.
          </p>
          <p>
            The "View options" button in top right corner can be used to
            open the <b>View options</b> menu.
          </p>

          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-basics-3.png"
              fluid
              center
              alt="Graph general image"
              style="transform-origin: top right"
            ></b-img>
          </div>
          <p>The view options menu is divided into four sections:</p>
          <ul>
            <li>
              <b>Connections</b> - filter nodes based on connection type to the
              root element. Read more in the
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-connections')"
                @keydown="navigateToPage('guide-connections')"
              >Connections</span
              >
              section,
            </li>
            <li>
              <b>Layout</b> - shift the nodes placement to a predefined
              hierarchical layout or physics based force layout. Read more in
              the
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-layouts')"
                @keydown="navigateToPage('guide-layouts')"
              >Layouts</span
              >
              section,
            </li>
            <li>
              <b>Sort</b> - change the order in which nodes are displayed based
              on your preference. Read more in the
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-sorting')"
                @keydown="navigateToPage('guide-sorting')"
              >Sorting</span
              >
              section,
            </li>
            <li>
              <b>Configuration</b> - configure node distance and toggle all labels visibility.
              Read more in the
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-configuration')"
                @keydown="navigateToPage('guide-configuration')"
              >Configuration</span
              >
              section,
            </li>
          </ul>

          <p>
            The view options menu can be closed at any moment with the close "X"
            icon next to the title.
          </p>

          <h2>4. Nodes</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-basics-2.png"
              fluid
              center
              alt="Graph general image"
              style="transform-origin: center"
            ></b-img>
          </div>

          <p>
            You can hover over a node to highlight it. When a node is
            highlighted the relation label will appear. You can click on the
            node to show or hide it's children.
          </p>
          <p>
            Nodes have two visual traits that express connection type they have
            with their parent node: the link path (solid or dashed) depending on
            whether it's required or optional, and color (dark or light)
            depending on whether the resource is class specific or inherited.
            Read more about graphical representation of nodes in the
            <span
              class="guide-navigation"
              @click="navigateToPage('guide-connections')"
              @keydown="navigateToPage('guide-connections')"
            >Connections</span
            >
            section.
          </p>

          <br />

          <p>
            Graph is powered by the
            <a href="https://d3js.org/">d3.js</a> library
          </p>
        </article>
      </template>
    </GraphGuideModal>

    <GraphGuideModal
      modalId="guide-connections"
      :open="currentPage=='guide-connections'"
      @closeEvent="closeHandler()"
    >
      <template v-slot:label> User Guide: Connections </template>
      <template v-slot:content>
        <article>
          <div class="see-also-box">
            <h3>User Guide pages:</h3>
            <p>
              1.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-main')"
                @keydown="navigateToPage('guide-main')"
              >Overview</span
              >
            </p>
            <p><b>2. Connections</b></p>
            <p>
              3.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-layouts')"
                @keydown="navigateToPage('guide-layouts')"
              >Layouts</span
              >
            </p>
            <p>
              4.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-sorting')"
                @keydown="navigateToPage('guide-sorting')"
              >Sorting</span
              >
            </p>
            <p>
              5.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-configuration')"
                @keydown="navigateToPage('guide-configuration')"
              >Configuration</span
              >
            </p>
          </div>
          <h1>Connections</h1>
          <h2>1. Introduction</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-0.png"
              fluid
              alt="Graph general image"
              style="transform-origin: top right"
            ></b-img>
          </div>
          <p>
            The graph is a visual representation of class restrictions.
            Connections can be divided into two groups: based on whether the
            node is inherited and based on whether it is required.
          </p>

          <h2>2. Class Specific</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-connections-class-specific.png"
              fluid
              alt="Graph general image"
              style="transform-origin: 90% 30%"
            ></b-img>
          </div>
          <p>
            The node is Class Specific when it's listed in the
            <b>IS-A Restrictions</b> section of Ontological characteristic. This
            mean that the node entity is defined directly in this class.
          </p>
          <p>
            The visual representation of Class Specific connection is
            <b>dark node color</b>.
          </p>
          <p>
            Note that link type doesn't matter when considering inheritance.
          </p>

          <h2>3. Inherited</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-connections-inherited.png"
              fluid
              alt="Graph general image"
              style="transform-origin: 90% 30%"
            ></b-img>
          </div>
          <p>
            The node is Inherited when it's listed in the
            <b>IS-A Restrictions Inherited From Superclasses</b> section of
            Ontological characteristic. This mean that the node entity was
            inherited from another class.
          </p>
          <p>
            The visual representation of Inherited connection is a
            <b>light node color</b>.
          </p>
          <p>
            Note that link type doesn't matter when considering inheritance.
          </p>

          <h2>4. Optional</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-connections-optional.png"
              fluid
              alt="Graph general image"
              style="transform-origin: 60% 50%"
            ></b-img>
          </div>
          <p>
            The node is Optional when the restrictions describes a relation
            where the node entity <b>is not</b> required to define the class.
          </p>
          <p>
            The visual representation of Optional connection is a
            <b>dashed link line</b>.
          </p>
          <p>
            Note that node color doesn't matter when considering if it's
            required.
          </p>

          <h2>5. Required</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-connections-required.png"
              fluid
              alt="Graph general image"
              style="transform-origin: 60% 50%"
            ></b-img>
          </div>
          <p>
            The node is Required when the restrictions describes a relation
            where the node entity <b>is</b> required to define the class.
          </p>
          <p>
            The visual representation of Optional connection is a
            <b>solid link line</b>.
          </p>
          <p>
            Note that node color doesn't matter when considering if it's
            required.
          </p>
        </article>
      </template>
    </GraphGuideModal>

    <GraphGuideModal
      modalId="guide-layouts"
      :open="currentPage=='guide-layouts'"
      @closeEvent="closeHandler()"
    >
      <template v-slot:label> User Guide: Layouts </template>
      <template v-slot:content>
        <article>
          <div class="see-also-box">
            <h3>User Guide pages:</h3>
            <p>
              1.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-main')"
                @keydown="navigateToPage('guide-main')"
              >Overview</span
              >
            </p>
            <p>
              2.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-connections')"
                @keydown="navigateToPage('guide-connections')"
              >Connections</span
              >
            </p>
            <p><b>3. Layouts</b></p>
            <p>
              4.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-sorting')"
                @keydown="navigateToPage('guide-sorting')"
              >Sorting</span
              >
            </p>
            <p>
              5.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-configuration')"
                @keydown="navigateToPage('guide-configuration')"
              >Configuration</span
              >
            </p>
          </div>
          <h1>Layouts</h1>
          <h2>1. Introduction</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-0.png"
              fluid
              alt="Graph general image"
              style="transform-origin: right"
            ></b-img>
          </div>
          <p>
            The visualization tool offers multiple node layouts. The user can
            select node placement most optimal for his use. The layouts can be
            selected by pressing corresponding buttons in Layout view options
            section.
          </p>

          <h2>2. Tree layout</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-tree.png"
              fluid
              alt="Graph general image"
              style="transform-origin: left 60%"
            ></b-img>
          </div>
          <p>
            The tree layout places nodes in a hierarchical tree shape. The nodes
            have their parent on the left side and children on the right side.
          </p>

          <h2>3. Cluster Tree layout</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-tree-cluster.png"
              fluid
              alt="Graph general image"
              style="transform-origin: left 65%"
            ></b-img>
          </div>
          <p>
            The Cluster Tree layout renders a hierarchical tree diagram with all
            leaf nodes placed at the same level. Usually the cluster tree is
            less compact than a regular tree layout.
          </p>

          <h2>4. Radial layout</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-radial.png"
              fluid
              alt="Graph general image"
              style="transform-origin: 50% 90%"
            ></b-img>
          </div>
          <p>
            The Radial layout places nodes on a circular shape with the same
            hierarchy as regular tree layout.
          </p>

          <h2>5. Cluster Radial layout</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-radial-cluster.png"
              fluid
              alt="Graph general image"
              style="transform-origin: center 70%"
            ></b-img>
          </div>
          <p>
            The Cluster Radial layout places nodes similarly to Radial layout
            but all leaf nodes are kept at the same level.
          </p>

          <h2>6. Force layout</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-force.png"
              fluid
              alt="Graph general image"
              style="transform-origin: 40% 85%"
            ></b-img>
          </div>
          <p>
            The Force layout places nodes based on physical force simulation
            running in real time. The nodes can be interacted with by dragging
            them with cursor.
          </p>
        </article>
      </template>
    </GraphGuideModal>

    <GraphGuideModal
      modalId="guide-sorting"
      :open="currentPage=='guide-sorting'"
      @closeEvent="closeHandler()"
    >
      <template v-slot:label> User Guide: Sorting </template>
      <template v-slot:content>
        <article>
          <div class="see-also-box">
            <h3>User Guide pages:</h3>
            <p>
              1.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-main')"
                @keydown="navigateToPage('guide-main')"
              >Overview</span
              >
            </p>
            <p>
              2.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-connections')"
                @keydown="navigateToPage('guide-connections')"
              >Connections</span
              >
            </p>
            <p>
              3.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-layouts')"
                @keydown="navigateToPage('guide-layouts')"
              >Layouts</span
              >
            </p>
            <p><b>4. Sorting</b></p>
            <p>
              5.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-configuration')"
                @keydown="navigateToPage('guide-configuration')"
              >Configuration</span
              >
            </p>
          </div>
          <h1>Sorting</h1>
          <h2>1. Introduction</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-sort-0.png"
              fluid
              alt="Graph general image"
              style="transform-origin: right bottom"
            ></b-img>
          </div>
          <p>
            Sorting allows user to select order in which nodes appear in a
            hierarchy. This feature is available in calculated layouts (Tree,
            Cluster Tree, Radial, Cluster Radial) and is unavailable in Force
            layout.
          </p>
          <p>
            The nodes can be sorted by pressing corresponding buttons in the
            Sort section of view options.
          </p>

          <h2>2. A - Z</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-sort-1.png"
              fluid
              alt="Graph general image"
              style="transform-origin: right 50%"
            ></b-img>
          </div>
          <p>This is basic alphabetical order sorting.</p>

          <h2>3. Height</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-layouts-tree-cluster.png"
              fluid
              alt="Graph general image"
              style="transform-origin: 70% top"
            ></b-img>
          </div>
          <p>
            Nodes get sorted based on height - maximum distance from any child
            node to the root. This means that more nested nodes will appear
            first in a hierarchy.
          </p>
          <p>
            Sorting based on height can be helpful in cluster layouts where it
            minimizes link crossing.
          </p>

          <h2>4. Inherited</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-sort-1.png"
              fluid
              alt="Graph general image"
              style="transform-origin: right 50%"
            ></b-img>
          </div>
          <p>
            When sorting based on inheritance the Class Specific nodes will
            appear first. You can read more about inheritance in the
            <span
              class="guide-navigation"
              @click="navigateToPage('guide-connections')"
              @keydown="navigateToPage('guide-connections')"
            >Connections</span
            >
            section.
          </p>

          <h2>5. Optional</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-sort-2.png"
              fluid
              alt="Graph general image"
              style="transform-origin: right 50%"
            ></b-img>
          </div>
          <p>
            In Optional sorting the optional nodes will appear first. You can
            read more about required and optional nodes in the
            <span
              class="guide-navigation"
              @click="navigateToPage('guide-connections')"
              @keydown="navigateToPage('guide-connections')"
            >Connections</span
            >
            section.
          </p>
        </article>
      </template>
    </GraphGuideModal>

    <GraphGuideModal
      modalId="guide-configuration"
      :open="currentPage=='guide-configuration'"
      @closeEvent="closeHandler()"
    >
      <template v-slot:label> User Guide: Configuration </template>
      <template v-slot:content>
        <article>
          <div class="see-also-box">
            <h3>User Guide pages:</h3>
            <p>
              1.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-main')"
                @keydown="navigateToPage('guide-main')"
              >Overview</span
              >
            </p>
            <p>
              2.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-connections')"
                @keydown="navigateToPage('guide-connections')"
              >Connections</span
              >
            </p>
            <p>
              3.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-layouts')"
                @keydown="navigateToPage('guide-layouts')"
              >Layouts</span
              >
            </p>
            <p>
              4.
              <span
                class="guide-navigation"
                @click="navigateToPage('guide-sorting')"
                @keydown="navigateToPage('guide-sorting')"
              >Sorting</span
              >
            </p>
            <p><b>5. Configuration</b></p>
          </div>
          <h1>Configuration</h1>
          <h2>1. Introduction</h2>
          <div class="img-zoom">
            <b-img
              src="../../assets/img/graph-guide-configuration-0.png"
              fluid
              alt="Graph general image"
              style="transform-origin: right bottom"
            ></b-img>
          </div>
          <p>
            In the configuration section the user can adjust visualization to
            his preferences by changing graph variables.
          </p>

          <h2>2. Node distance</h2>
          <p>
            Node distance range slider determines how far nodes are placed from
            each other.
          </p>

          <h2>3. Keep edge labels</h2>
          <p>
            The user can toggle between the edge labels being always visible or
            if they should hide when user is not hovering over related entity.
          </p>
        </article>
      </template>
    </GraphGuideModal>
  </div>
</template>

<script>
import { useConfigurationStore } from '~/stores/configuration';
import { mapState } from 'pinia';

export default {
  name: 'GraphGuide',
  data() {
    return {
      currentPage: null,
    };
  },
  mounted() {},
  methods: {
    openGuide(id) {
      this.currentPage = id;
    },
    closeHandler() {
      this.currentPage = null;
    },
    navigateToPage(id) {
      this.closeHandler();
      this.openGuide(id);
    },
  },
  computed: {
    ...mapState(useConfigurationStore, {
      ontologyName: store => store.config.ontpubFamily.toLowerCase(),
    }),
  },
};
</script>

<style lang="scss">
.normal-button.small {
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

span.guide-navigation {
  color: rgba(0, 0, 0, 0.8);
  text-decoration: underline;

  &:hover {
    color: $link-hover-color;
    cursor: pointer;
  }

  &:active {
    color: $link-active-color;
  }
}

.modal.help article {
    .see-also-box {
      h3 {
        margin-bottom: 15px;
      }
      p {
        padding: 7px 0;
      }
    }
  }

@media (max-width: 991px) {
  .modal.help article {
    .see-also-box {
      margin-bottom: 45px;
      padding: 15px;
    }
  }
}
</style>
