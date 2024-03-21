<template>
  <div>
    <GraphGuideModal
      modal-id="guide-main"
      :open="currentPage == 'guide-main'"
      @close-event="closeHandler()"
    >
      <template #label> User Guide: Overview </template>

      <template #content>
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
            <div
              class="img-zoom__content basics-0"
              style="transform-origin: top left"
            ></div>
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
            <div
              class="img-zoom__content basics-1"
              style="transform-origin: top left"
            ></div>
          </div>
          <p>
            In the full screen view the graph is expanded to fit the whole
            screen which translates to more comfortable experience.
          </p>
          <p>
            The "View options" button in top right corner can be used to open
            the <b>View options</b> menu.
          </p>

          <div class="img-zoom">
            <div
              class="img-zoom__content basics-3"
              style="
                transform-origin: top right;
                background-position: right top;
              "
            ></div>
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
              <b>Configuration</b> - configure node distance and toggle all
              labels visibility. Read more in the
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
            <div
              class="img-zoom__content basics-2"
              style="transform-origin: center"
            ></div>
          </div>

          <p>
            You can hover over a node to highlight it. When a node is
            highlighted the relation label will appear. You can click on the
            node to show or hide it's children.
          </p>
          <p>
            Nodes have <b>two visual traits</b> that express connection type
            they have with their parent node: the <b>link path</b> (solid or
            dashed) depending on whether it's required or optional, and
            <b>color</b> (dark or light) depending on whether the resource is
            class specific or inherited. Read more about graphical
            representation of nodes in the
            <span
              class="guide-navigation"
              @click="navigateToPage('guide-connections')"
              @keydown="navigateToPage('guide-connections')"
              >Connections</span
            >
            section.
          </p>

          <h2>5. Context menu</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content basics-4"
              style="transform-origin: right"
            ></div>
          </div>

          <p>
            You can right click on a node to open the context menu. In the
            context menu there are two options:
          </p>
          <ul>
            <li>
              <b>Expand/Collapse</b> - show or hide node's children, the same as
              clicking on a node.
            </li>
            <li><b>Navigate...</b> - open the resource's page.</li>
          </ul>

          <br />

          <p>
            Graph is powered by the
            <a href="https://d3js.org/">d3.js</a> library
          </p>
        </article>
      </template>
    </GraphGuideModal>

    <GraphGuideModal
      modal-id="guide-connections"
      :open="currentPage == 'guide-connections'"
      @close-event="closeHandler()"
    >
      <template #label> User Guide: Connections </template>
      <template #content>
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
            <div
              class="img-zoom__content layouts-0"
              style="
                transform-origin: top right;
                background-position: right top;
              "
            ></div>
          </div>
          <p>
            The graph is a visual representation of class restrictions.
            Connections can be divided into two groups: based on whether the
            node is inherited and based on whether it is required.
          </p>

          <h2>2. Class Specific</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content connections-class-specific"
              style="transform-origin: 90% 30%"
            ></div>
          </div>
          <p>
            The node is Class Specific when it's listed in the
            <b>IS-A Restrictions</b> section of Ontological characteristic. This
            means that the node entity is defined directly in this class.
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
            <div
              class="img-zoom__content connections-inherited"
              style="transform-origin: 90% 30%"
            ></div>
          </div>
          <p>
            The node is Inherited when it's listed in the
            <b>IS-A Restrictions Inherited From Superclasses</b> section of
            Ontological characteristic. This means that the node entity was
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
            <div
              class="img-zoom__content connections-optional"
              style="transform-origin: 60% 50%"
            ></div>
          </div>
          <p>
            The node is Optional when the restrictions describe a relation where
            the node entity <b>is not</b> required to define the class.
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
            <div
              class="img-zoom__content connections-required"
              style="transform-origin: 60% 50%"
            ></div>
          </div>
          <p>
            The node is Required when the restrictions describe a relation where
            the node entity <b>is</b> required to define the class.
          </p>
          <p>
            The visual representation of Required connection is a
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
      modal-id="guide-layouts"
      :open="currentPage == 'guide-layouts'"
      @close-event="closeHandler()"
    >
      <template #label> User Guide: Layouts </template>
      <template #content>
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
            <div
              class="img-zoom__content layouts-0"
              style="
                transform-origin: center right;
                background-position: right center;
              "
            ></div>
          </div>
          <p>
            The visualization tool offers multiple node layouts. The user can
            select node placement most optimal for his use. The layouts can be
            selected by pressing corresponding buttons in the Layout view
            options section.
          </p>

          <h2>2. Tree layout</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content layouts-tree"
              style="transform-origin: left bottom"
            ></div>
          </div>
          <p>
            The tree layout places nodes in a hierarchical tree shape. The nodes
            have their parent on the left side and children on the right side.
          </p>

          <h2>3. Cluster Tree layout</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content layouts-tree-cluster"
              style="transform-origin: left bottom"
            ></div>
          </div>
          <p>
            The Cluster Tree layout renders a hierarchical tree diagram with all
            leaf nodes placed at the same level. Usually, the cluster tree is
            less compact than a regular tree layout.
          </p>

          <h2>4. Radial layout</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content layouts-radial"
              style="transform-origin: 50% 90%"
            ></div>
          </div>
          <p>
            The Radial layout places nodes on a circular shape with the same
            hierarchy as a regular tree layout.
          </p>

          <h2>5. Cluster Radial layout</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content layouts-radial-cluster"
              style="transform-origin: center bottom"
            ></div>
          </div>
          <p>
            The Cluster Radial layout places nodes similarly to Radial layout
            but all leaf nodes are kept at the same level.
          </p>

          <h2>6. Force layout</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content layouts-force"
              style="transform-origin: center bottom"
            ></div>
          </div>
          <p>
            The Force layout places nodes based on a physical force simulation
            running in real time. The nodes can be interacted with by dragging
            them with the cursor.
          </p>
        </article>
      </template>
    </GraphGuideModal>

    <GraphGuideModal
      modal-id="guide-sorting"
      :open="currentPage == 'guide-sorting'"
      @close-event="closeHandler()"
    >
      <template #label> User Guide: Sorting </template>
      <template #content>
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
            <div
              class="img-zoom__content sort-0"
              style="
                transform-origin: right center;
                background-position: right center;
              "
            ></div>
          </div>
          <p>
            Sorting allows the user to select order in which nodes appear in a
            hierarchy. This feature is available in calculated layouts (Tree,
            Cluster Tree, Radial, Cluster Radial) and is unavailable in the
            Force layout.
          </p>
          <p>
            The nodes can be sorted by pressing corresponding buttons in the
            Sort section of view options.
          </p>

          <h2>2. A - Z</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content sort-3"
              style="transform-origin: right 50%"
            ></div>
          </div>
          <p>This is basic alphabetical order sorting.</p>

          <h2>3. Height</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content layouts-tree-cluster"
              style="transform-origin: 40% top"
            ></div>
          </div>
          <p>
            Nodes get sorted based on height - the maximum distance from any
            child node to the root. This means that more nested nodes will
            appear first in a hierarchy.
          </p>
          <p>
            Sorting based on height can be helpful in cluster layouts where it
            minimizes link crossing.
          </p>

          <h2>4. Inherited</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content sort-1"
              style="transform-origin: right 50%"
            ></div>
          </div>
          <p>
            When sorting based on inheritance, the Class Specific nodes will
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
            <div
              class="img-zoom__content sort-2"
              style="transform-origin: right 50%"
            ></div>
          </div>
          <p>
            In Optional sorting, the optional nodes will appear first. You can
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
      modal-id="guide-configuration"
      :open="currentPage == 'guide-configuration'"
      @close-event="closeHandler()"
    >
      <template #label> User Guide: Configuration </template>
      <template #content>
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
            <div
              class="img-zoom__content configuration-0"
              style="transform-origin: right bottom"
            ></div>
          </div>
          <p>
            In the configuration section the user can adjust visualization to
            his preferences by changing graph variables.
          </p>

          <h2>2. Display all edge labels</h2>
          <p>
            The user can toggle between the edge labels being always visible or
            if they should hide when user is not hovering over related entity.
          </p>

          <h2>3. Node distance</h2>
          <p>
            Node distance range slider determines how far nodes are placed from
            each other.
          </p>

          <h2>4. Vertical distance</h2>
          <div class="img-zoom">
            <div
              class="img-zoom__content configuration-1"
              style="transform-origin: right bottom"
            ></div>
          </div>
          <p>
            In the Tree and Cluster Tree layouts, the user can adjust the
            vertical spacing between nodes.
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
      currentPage: null
    };
  },
  computed: {
    ...mapState(useConfigurationStore, {
      ontologyName: (store) => store.config.ontpubFamily.toLowerCase()
    })
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
    }
  }
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
  padding-bottom: 15px;

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
