import * as d3 from "d3";

export class Ontograph {
  layout = "force";
  transitionSpeed = 500;
  mouseoverTransitionSpeed = 300;
  distance = 50;
  alertId = 0;

  constructor(data, target, navigationHandler, alertHandler, graphServer) {
    this.target = target;
    this.nav = navigationHandler;
    this.alertHandler = alertHandler;
    this.graphServer = graphServer;

    this.lastId = data.graph.lastId;

    this.parsedNodes = this.parseNodes(data.graph);

    this.root = d3
      .stratify()
      .id((d) => d.id)
      .parentId((d) => d.from)(this.parsedNodes);

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    this.simulation = this.getSimulation();

    this.width = target.clientWidth;
    this.height = target.clientHeight;
    this.svg = this.getSvg();

    this.svg.append("g").attr("class", "links");

    this.svg.append("g").attr("class", "nodes");

    this.initLinks();
    this.initNodes();
    this.toForce();

    const zoomHandler = (e) => {
      this.svg.select(".links").attr("transform", e.transform);
      this.svg.select(".nodes").attr("transform", e.transform);
    };

    this.zoomController = d3.zoom().on("zoom", zoomHandler);
    this.svg.call(this.zoomController).on("dblclick.zoom", null);

    target.append(this.svg.node());
  }

  parseNodes(graphData) {
    const edges = graphData.edges;
    const nodes = graphData.nodes;

    const newNodes = nodes.map((node) => {
      const edge = edges.find((e) => e.to === node.id);

      return edge
        ? {
            nodeIri: node.iri,
            nodeLabel: node.label,
            type: node.type,
            optional: node.optional,
            id: node.id,

            pathLabel: edge.label,
            pathIri: edge.iri,
            from: edge.from,
            dashes: edge.dashes,
          }
        : {
            nodeIri: node.iri,
            nodeLabel: node.label,
            type: node.type,
            optional: node.optional,
            id: node.id,

            from: "",
          };
    });

    return newNodes;
  }

  initLinks(at) {
    this.link = this.svg
      .select(".links")
      .attr("fill", "none")
      .selectAll(".link")
      .data(this.links, (d) => d.target.id)
      .join(
        (enter) => {
          const newLink = enter.append("g").attr("class", "link");

          newLink
            .append("path")
            .attr("id", (d) => `path-id-${d.target.id}`)
            .attr("stroke-opacity", "0.4")
            .attr("stroke", (d) => (d.target.data.dashes ? "#777" : "#777"))
            .attr("stroke-dasharray", (d) => (d.target.data.dashes ? 5 : null))
            .attr("d", (d) => {
              const x0 = at ? at.x : d.source.x;
              const y0 = at ? at.y : d.source.y;
              const x1 = at ? at.x : d.source.x;
              const y1 = at ? at.y : d.source.y;
              const xcontrol = x1 * 0.45 + x0 * 0.55;
              const ycontrol = y1 * 0.55 + y0 * 0.45;
              return [
                "M",
                x0,
                y0,
                "C",
                xcontrol,
                ycontrol,
                xcontrol,
                ycontrol,
                x1,
                y1,
              ].join(" ");
            })
            .each((d, i) => {
              d.target.data.linkPathElement = d;
            });

          newLink
            .append("text")
            .attr("dy", "2px")
            .attr("font-size", "8px")
            .attr("paint-order", "stroke")
            .attr("stroke", "#f2f2f2")
            .attr("stroke-width", "1px")
            .attr("text-anchor", "middle")
            .attr("fill", "#222")
            .attr("opacity", "0")
            .attr("pointer-events", "none")
            .text((d) => d.target.data.pathLabel)
            .each((d, i) => {
              d.target.data.linkLabelElement = d;
            });

          return newLink;
        },
        (update) => {
          const updatedLink = update;

          updatedLink
            .select("path")
            .attr("id", (d) => `path-id-${d.target.id}`)
            .attr("stroke-opacity", "0.4")
            .attr("stroke", (d) => (d.target.data.dashes ? "#777" : "#777"))
            .attr("stroke-dasharray", (d) => (d.target.data.dashes ? 5 : null))
            .each((d, i) => {
              d.target.data.linkPathElement = d;
            });

          updatedLink
            .select("text")
            .attr("dy", "2px")
            .attr("font-size", "8px")
            .attr("paint-order", "stroke")
            .attr("stroke", "#f2f2f2")
            .attr("stroke-width", "1px")
            .attr("text-anchor", "middle")
            .attr("fill", "#222")
            .attr("opacity", "0")
            .attr("pointer-events", "none")
            .text((d) => d.target.data.pathLabel)
            .each((d, i) => {
              d.target.data.linkLabelElement = d;
            });

          return updatedLink;
        },
        (exit) => {
          return exit.remove();
        }
      );

    this.linkPaths = this.link.selectAll("path");

    this.linkLabels = this.link.selectAll("text");
  }

  initNodes(at) {
    const drag = (simulation) => {
      const that = this;

      function dragStarted(event, d) {
        if (that.layout !== "force") return;
        if (!event.active) simulation.alphaTarget(0.6).restart();
        d.fx = d.x;
        d.fy = d.y;
        setTimeout(() => {
          d3.select(this).raise();
        }, 100);
      }

      function dragged(event, d) {
        if (that.layout !== "force") return;
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
    };

    this.node = this.svg
      .select(".nodes")
      .selectAll("g")
      .data(this.nodes, (d) => d.data.id)
      .join(
        (enter) => {
          const newNode = enter
            .append("g")
            .attr("class", "node")
            .attr(
              "transform",
              (d) => `translate(${at ? at.x : d.x},${at ? at.y : d.y})`
            );

          newNode
            .attr("fill", "#000")
            .attr("stroke", "#000")
            .append("circle")
            .attr("r", (d) => (d.parent ? 2 : 4))
            .attr("stroke-width", 0)
            .attr("fill", (d) => {
              if (d.data.type === "MAIN") {
                return "#222";
              } else if (d.data.type === "INTERNAL") {
                return "#222";
              } else {
                return "#999";
              }
            })
            .attr("filter", (d) =>
              d.parent
                ? null
                : "drop-shadow(0px 5px 20px -5px rgba(8, 84, 150, 0.15))"
            )
            .attr("stroke", (d) => (d.children ? null : "#000"));

          newNode
            .append("text")
            .attr("dy", "2px")
            .attr("font-size", "8px")
            .attr("paint-order", "stroke")
            .attr("stroke", "#f2f2f2")
            .attr("stroke-width", "2px")
            .attr("fill", (d) => {
              if (d.data.type === "MAIN") {
                return "#222";
              } else if (d.data.type === "INTERNAL") {
                return "#222";
              } else {
                return "#999";
              }
            })
            .text((d) => d.data.nodeLabel)
            .on("mouseover", (e, d) => {
              if (this.isShifting != null) return;

              this.link
                .transition()
                .duration(0)
                .attr("opacity", (l) => (l.target.id == d.id ? "1" : "0.2"))
                .select("path");
              this.linkLabels
                .transition()
                .duration(0)
                .attr("opacity", (l) =>
                  l == d.data.linkLabelElement ? "1" : "0"
                );
              this.node
                .transition()
                .duration(0)
                .attr("opacity", (n) =>
                  n.id == d.id || n.id == d.parent?.id ? "1" : "0.2"
                )
                .attr("font-weight", (n) =>
                  n.id == d.id || n.id == d.parent?.id ? "bold" : "normal"
                );
            })
            .on("mouseout", (e, d) => {
              if (this.isShifting != null) return;

              this.blurHighlight();
            })
            .on("click", (e, d) => this.nodeClick(e, d));

          newNode.call(drag(this.simulation));

          return newNode;
        },
        (update) => {
          return update;
        },
        (exit) => {
          return exit.remove();
        }
      );
  }

  getSvg() {
    return d3
      .create("svg")
      .attr("viewBox", [
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
      ]);
  }

  getHeight() {
    return this.root.height;
  }

  getLayout() {
    return this.layout;
  }

  getSimulation() {
    const newSimulation = d3
      .forceSimulation(this.nodes)
      .force(
        "link",
        d3
          .forceLink(this.links)
          .id((d) => d.id)
          .distance(0.5)
          .strength(0.5)
      )
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength(
            (d) => (-1600 * (d.parent ? 1 : 5)) / (d.children ? 0.5 : 3)
          )
      )
      .force("center", d3.forceCenter().strength(0.2))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .alphaDecay(0.055);

    newSimulation.on("tick", () => {
      if (this.layout != "force") return;

      this.linkPaths.attr("d", (d) => {
        const x0 = d.source.x;
        const y0 = d.source.y;
        const x1 = d.target.x;
        const y1 = d.target.y;
        const xcontrol = x1 * 0.45 + x0 * 0.55;
        const ycontrol = y1 * 0.55 + y0 * 0.45;
        return [
          "M",
          x0,
          y0,
          "C",
          xcontrol,
          ycontrol,
          xcontrol,
          ycontrol,
          x1,
          y1,
        ].join(" ");
      });

      this.linkLabels.attr(
        "transform",
        (d) =>
          `translate(${(d.target.x + d.source.x) / 2}, ${
            (d.target.y + d.source.y) / 2
          })`
      );

      this.node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    return newSimulation;
  }

  updateSimulation() {
    this.simulation
      .nodes(this.nodes)
      .force(
        "link",
        d3
          .forceLink(this.links)
          .id((d) => d.id)
          .distance(0.5)
          .strength(0.5)
      )
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength(
            (d) => ((-this.distance * 30) * (d.parent ? 1 : 5)) / (d.children ? 0.5 : 3)
          )
      )
      .force("center", d3.forceCenter().strength(0.2))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .restart();
  }

  setControlPanelOpen(isControlPanelOpen) {
    this.isControlPanelOpen = isControlPanelOpen;
  }

  distanceUpdate(value) {
    this.distance = value;

    if (this.layout === "tree") this.toTree();
    else if (this.layout === "clusterTree") this.toClusterTree();
    else if (this.layout === "radial") this.toRadial();
    else if (this.layout === "clusterRadial") this.toClusterRadial();
    else if (this.layout === "force") this.toForce();
  }

  blurHighlight() {
    this.link
      .transition()
      .duration(this.mouseoverTransitionSpeed)
      .attr("opacity", "1");
    this.linkLabels
      .transition()
      .duration(this.mouseoverTransitionSpeed)
      .attr("opacity", "0");
    this.node
      .transition()
      .duration(this.mouseoverTransitionSpeed)
      .attr("opacity", "1")
      .attr("font-weight", "normal");
  }

  sort(type) {
    this.isShifting = null;
    this.isShifting = setTimeout(() => {
      this.isShifting = null;
    }, this.transitionSpeed);

    if (type === "az") {
      this.root.sort((a, b) =>
        d3.ascending(a.data.nodeLabel, b.data.nodeLabel)
      );
    } else if (type === "height") {
      this.root.sort((a, b) => d3.descending(a.height, b.height));
    } else if (type === "type") {
      this.root.sort((a, b) => d3.descending(a.data.type, b.data.type));
    } else if (type === "inherited") {
      this.root.sort((a, b) => d3.descending(a.data.dashes, b.data.dashes));
    }

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    this.simulation.stop();
    this.updateSimulation();
    this.initLinks();
    this.initNodes();

    if (this.layout === "tree") this.toTree();
    else if (this.layout === "clusterTree") this.toClusterTree();
    else if (this.layout === "radial") this.toRadial();
    else if (this.layout === "clusterRadial") this.toClusterRadial();
    else if (this.layout === "force") this.toForce();
  }

  filter(filters) {
    this.filters = filters;
    let { external, internal, optional, required } = filters;

    let filteredData = this.parsedNodes.filter((n) => {
      if (n.type == "MAIN") return true;

      if (n.dashes && !optional) return false;
      if (!n.dashes && !required) return false;
      if (n.type == "EXTERNAL" && !external) return false;
      if (n.type == "INTERNAL" && !internal) return false;

      return true;
    });

    // find abandoned edges
    let repeat;
    do {
      repeat = false;
      filteredData = filteredData.filter((n) => {
        if (n.type == "MAIN") return true;

        if (filteredData.find((f) => f.id == n.from)) return true;
        else {
          repeat = true;
          return false;
        }
      });
    } while (repeat);

    this.isShifting = null;
    this.isShifting = setTimeout(() => {
      this.isShifting = null;
    }, this.transitionSpeed);

    this.root = d3
      .stratify()
      .id((d) => d.id)
      .parentId((d) => d.from)(filteredData);

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    this.simulation.stop();
    this.updateSimulation();
    this.initLinks();
    this.initNodes();

    if (this.sortType) this.sort(this.sortType);

    if (this.layout === "tree") this.toTree();
    else if (this.layout === "clusterTree") this.toClusterTree();
    else if (this.layout === "radial") this.toRadial();
    else if (this.layout === "clusterRadial") this.toClusterRadial();
    else if (this.layout === "force") this.toForce();
  }

  async expandGraph(d) {
    if (this.isShifting) {
      return;
    }
    this.isShifting = true;
    this.simulation.alphaTarget(0);

    // if node contains already collapsed children then expand them
    if (d._children) {
      d.children = d._children;
      d._children = null;
    }
    // if node contains expanded children hide them
    else if (d.children) {
      d._children = d.children;
      d.children = null;
    }
    // if node has no saved children and height equal to 0 then fetch nodes
    else if (!d.height || d.height == 0) {
      try {
        // add loader
        this.svg
          .select(".nodes")
          .selectAll("g")
          .data(this.nodes, n => n.data.id)
          .filter(n => {
              return n.data.id == d.data.id;
          })
          .append("g")
          .attr("class", "node-loader")
          .append("circle")
          .attr("r", 5)
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("class", "node-loader__circle");


        // fetch children from server
        const domain = `${this.graphServer}?iri=${encodeURI(
          d.data.nodeIri
        )}&nodeId=${d.id}&lastId=${this.lastId}`;
        const result = await fetch(domain, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        let body = null;

        try {
          body = await result.json();
        } catch (e) {
          this.pushAlert("noChildren", d.data.nodeLabel);
          this.isShifting = null;
          this.svg
            .select(".nodes")
            .selectAll("g")
            .data(this.nodes, n => n.data.id)
            .filter(n => {
                return n.data.id == d.data.id;
            })
            .select(".node-loader")
            .remove();
          this.blurHighlight();
          return;
        }

        if (body.nodes.length == 1) {
          this.pushAlert("noChildren", d.data.nodeLabel);
          this.isShifting = null;
          this.svg
            .select(".nodes")
            .selectAll("g")
            .data(this.nodes, n => n.data.id)
            .filter(n => {
                return n.data.id == d.data.id;
            })
            .select(".node-loader")
            .remove();
          this.blurHighlight();
          return;
        }

        this.lastId = body.lastId;

        let newNodes = this.parseNodes(body);
        this.parsedNodes.push(...newNodes.filter((n) => n.id != d.id));

        let childRoot = d3
          .stratify()
          .id((node) => node.id)
          .parentId((node) => node.from)(newNodes);

        d.height = childRoot.height;

        childRoot.each((node) => {
          if (node.parent?.id === d.id) node.parent = d;
          node.depth += d.depth;
        });

        d.children = childRoot.children;

        // update all heights
        let tmp = d;
        while (tmp.parent?.height < tmp.height + 1) {
          tmp.parent.height = tmp.height + 1;
          tmp = tmp.parent;
        }
      } catch (err) {
        this.pushAlert("noChildren");
        console.error(err);
      }

      this.svg
        .select(".nodes")
        .selectAll("g")
        .data(this.nodes, n => n.data.id)
        .filter(n => {
            return n.data.id == d.data.id;
        })
        .select(".node-loader")
        .remove();
    }

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    this.initLinks(d);
    this.initNodes(d);

    this.isShifting = setTimeout(() => {
      this.isShifting = null;
      this.blurHighlight();
    }, this.transitionSpeed);

    if (this.layout === "tree") this.toTree();
    else if (this.layout === "clusterTree") this.toClusterTree();
    else if (this.layout === "radial") this.toRadial();
    else if (this.layout === "clusterRadial") this.toClusterRadial();
    else if (this.layout === "force") {
      this.toForce();
      d.children?.forEach((node) => {
        node.x = d.x + (0.5 - Math.random()) * 100;
        node.y = d.y + (0.5 - Math.random()) * 100;
      });
    }
  }

  changeLayoutTo(to) {
    if (this.layout == to) return;

    if (this.isShifting != null) return;

    this.isShifting = null;
    this.isShifting = setTimeout(() => {
      this.isShifting = null;
    }, this.transitionSpeed);

    if (to === "tree") this.toTree();
    else if (to === "clusterTree") this.toClusterTree();
    else if (to === "radial") this.toRadial();
    else if (to === "clusterRadial") this.toClusterRadial();
    else if (to === "force") this.toForce();

    this.layout = to;
  }

  toTree() {
    this.simulation.stop();

    const dx = this.distance * 4;
    const dy = 12;

    const treeLayout = d3.tree().nodeSize([dy, dx])(this.root);

    this.nodes = treeLayout.descendants(this.root);
    this.links = treeLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr("transform", (d) => `translate(${d.y}, ${d.x})`);

    this.node
      .selectAll("text")
      .transition()
      .duration(this.transitionSpeed)
      .attr("x", (d) => (d.children?.length ? -6 : 6))
      .attr("text-anchor", (d) => (d.children?.length ? "end" : "start"))
      .attr("transform", "");

    this.nodes.forEach((node) => {
      const x = node.y;
      const y = node.x;
      node.x = x;
      node.y = y;
    });

    this.linkLabels
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "transform",
        (d) =>
          `translate(${(d.target.x + d.source.x) / 2}, ${
            (d.target.y + d.source.y) / 2
          })`
      );
  }

  toClusterTree() {
    this.simulation.stop();

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    const dx = this.distance * 4;
    const dy = 12;

    const treeLayout = d3.cluster().nodeSize([dy, dx])(this.root);

    this.nodes = treeLayout.descendants(this.root);
    this.links = treeLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr("transform", (d) => `translate(${d.y}, ${d.x})`);

    this.node
      .selectAll("text")
      .transition()
      .duration(this.transitionSpeed)
      .attr("x", (d) => (d.children?.length ? -6 : 6))
      .attr("text-anchor", (d) => (d.children?.length ? "end" : "start"))
      .attr("transform", "");

    this.nodes.forEach((node) => {
      const x = node.y;
      const y = node.x;
      node.x = x;
      node.y = y;
    });

    this.linkLabels
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "transform",
        (d) =>
          `translate(${(d.target.x + d.source.x) / 2}, ${
            (d.target.y + d.source.y) / 2
          })`
      );
  }

  toRadial() {
    this.simulation.stop();

    let radius = this.root.height * this.distance * 4;

    const radialLayout = d3
      .tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 4 : 8))(this.root);

    this.nodes = radialLayout.descendants(this.root);
    this.links = radialLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "d",
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y)
      );

    // .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    const x0 = (d) => Math.cos(d.x - Math.PI / 2) * d.y;
    const y0 = (d) => Math.sin(d.x - Math.PI / 2) * d.y;

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      );

    this.nodes.forEach((node) => {
      const x = x0(node);
      const y = y0(node);
      node.x = x;
      node.y = y;
    });

    this.node
      .select("text")
      // .transition()
      // .duration(this.transitionSpeed)
      .attr("transform", (d) => `rotate(${d.x <= 0 ? 180 : 0})`)
      .attr("dy", "2px")
      .attr("x", (d) => (d.x > 0 === !d.children ? 6 : -6))
      .attr("text-anchor", (d) => (d.x > 0 === !d.children ? "start" : "end"));

    this.linkLabels
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "transform",
        (d) =>
          `translate(${(d.target.x + d.source.x) / 2}, ${
            (d.target.y + d.source.y) / 2
          })`
      );
  }

  toClusterRadial() {
    this.simulation.stop();

    let radius = this.root.height * this.distance * 4;

    const radialLayout = d3
      .cluster()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 4 : 8))(this.root);

    this.nodes = radialLayout.descendants(this.root);
    this.links = radialLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "d",
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y)
      );

    const x0 = (d) => Math.cos(d.x - Math.PI / 2) * d.y;
    const y0 = (d) => Math.sin(d.x - Math.PI / 2) * d.y;

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      );

    this.nodes.forEach((node) => {
      const x = x0(node);
      const y = y0(node);
      node.x = x;
      node.y = y;
    });

    this.node
      .select("text")
      .attr("transform", (d) => `rotate(${d.x <= 0 ? 180 : 0})`)
      .attr("dy", "2px")
      .attr("x", (d) => (d.x > 0 === !d.children ? 6 : -6))
      .attr("text-anchor", (d) => (d.x > 0 === !d.children ? "start" : "end"));

    this.linkLabels
      .transition()
      .duration(this.transitionSpeed)
      .attr(
        "transform",
        (d) =>
          `translate(${(d.target.x + d.source.x) / 2}, ${
            (d.target.y + d.source.y) / 2
          })`
      );
  }

  toForce() {
    this.updateSimulation();
    this.simulation.alpha(1).alphaTarget(0.5);

    this.node
      .selectAll("text")
      .transition()
      .duration(this.transitionSpeed)
      .attr("x", 6)
      .attr("text-anchor", "start")
      .attr("transform", "");

    setTimeout(() => {
      this.simulation.alphaTarget(0);
    }, 50);
  }

  center() {
    this.simulation.stop();
    const nodesBBox = this.svg.select(".nodes").node().getBBox();

    const midX = nodesBBox.x + nodesBBox.width / 2;
    const midY = nodesBBox.y + nodesBBox.height / 2;

    const margin = 60;
    const controlPanelOffset = this.isControlPanelOpen ? 300 : 0;

    const scaleX = (this.width - controlPanelOffset - margin) / nodesBBox.width;
    const scaleY = (this.height - margin) / nodesBBox.height;
    const scale = d3.min([scaleX, scaleY]);

    this.svg
      .transition()
      .duration(this.transitionSpeed)
      .call(
        this.zoomController.transform,
        d3.zoomIdentity.translate(-midX * scale - controlPanelOffset / 2, -midY * scale).scale(scale)
      );
  }

  nodeClick(event, node) {
    if (event.defaultPrevented) return;
    this.expandGraph(node);
    //this.nav(node.data.nodeIri);
  }

  removeGraph() {
    this.svg.remove();
  }

  resizeHandler(target) {
    this.width = target.clientWidth;
    this.height = target.clientHeight;

    this.svg.attr("viewBox", [
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    ]);

    this.center();
  }

  pushAlert(type, source) {
    this.alertId++;
    this.alertHandler(type, this.alertId, source);
  }
}
