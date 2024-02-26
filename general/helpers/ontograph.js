import * as d3 from 'd3';

export default class Ontograph {
  layout = 'force';

  sortType = 'az';

  transitionSpeed = 400;

  mouseoverTransitionSpeed = 300;

  distance = 30;

  verticalDistance = 12;

  keepLabels = false;

  labelOpacity = 0.8;

  alertId = 0;

  filters = {
    external: true,
    internal: true,
    optional: true,
    required: true,
  };

  isFullscreen = false;

  constructor(
    data,
    target,
    navigationHandler,
    alertHandler,
    graphServer,
    onHeightUpdate,
  ) {
    this.target = target;
    this.nav = navigationHandler;
    this.alertHandler = alertHandler;
    this.graphServer = graphServer;
    this.onHeightUpdate = onHeightUpdate;

    this.lastId = data.graph.lastId;

    this.parsedNodes = Ontograph.parseNodes(data.graph);

    this.root = d3
      .stratify()
      .id((d) => d.id)
      .parentId((d) => d.from)(this.parsedNodes);

    this.root.each((node) => {
      if (node.children) node._totalChildren = node.children;
    });

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    this.simulation = this.getSimulation();

    this.width = target.clientWidth;
    this.height = target.clientHeight;
    this.svg = this.getSvg();

    this.svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 12)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#bbb')
      .style('stroke', 'none');

    this.svg.append('g').attr('class', 'links');
    this.svg.append('g').attr('class', 'nodes');

    this.initLinks();
    this.initNodes();
    this.toForce();

    // zoom specific functions
    const that = this;
    function wheelDelta(event) {
      return (
        -event.deltaY
        * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002)
      );
    }
    function filter(event) {
      return (
        that.isFullscreen
        || event.ctrlKey
        || event.metaKey
        || event.type === 'mousedown'
      );
    }

    const zoomHandler = (e) => {
      this.svg.select('.links').attr('transform', e.transform);
      this.svg.select('.nodes').attr('transform', e.transform);
    };

    this.zoomController = d3
      .zoom()
      .on('zoom', zoomHandler)
      .filter(filter)
      .wheelDelta(wheelDelta);
    this.svg.call(this.zoomController).on('dblclick.zoom', null);

    target.append(this.svg.node());

    setTimeout(() => {
      this.center(120);
    }, 1000);
  }

  static parseNodes(graphData) {
    const { edges } = graphData;
    const { nodes } = graphData;

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

          from: '',
        };
    });

    return newNodes;
  }

  initLinks(at) {
    this.link = this.svg
      .select('.links')
      .attr('fill', 'none')
      .selectAll('.link')
      .data(this.links, (d) => d.target.id)
      .join(
        (enter) => {
          const newLink = enter.append('g').attr('class', 'link');

          newLink
            .append('path')
            .attr('id', (d) => `path-id-${d.target.id}`)
            .attr('stroke-opacity', '0.4')
            .attr('stroke', (d) => (d.target.data.dashes ? '#777' : '#777'))
            .attr('stroke-dasharray', (d) => (d.target.data.dashes ? 5 : null))
            .attr('d', (d) => {
              const x0 = at ? at.x : d.source.x;
              const y0 = at ? at.y : d.source.y;
              const x1 = at ? at.x : d.source.x;
              const y1 = at ? at.y : d.source.y;
              const xcontrol = x1 * 0.45 + x0 * 0.55;
              const ycontrol = y1 * 0.55 + y0 * 0.45;
              return [
                'M',
                x0,
                y0,
                'C',
                xcontrol,
                ycontrol,
                xcontrol,
                ycontrol,
                x1,
                y1,
              ].join(' ');
            })
            .attr('marker-end', 'url(#arrowhead)')
            .each((d) => {
              d.target.data.linkPathElement = d;
            });

          newLink
            .append('text')
            .attr('dy', '2px')
            .attr('font-size', '6px')
            .attr('paint-order', 'stroke')
            .attr('stroke', '#f2f2f2')
            .attr('stroke-width', '1px')
            .attr('text-anchor', 'middle')
            .attr('fill', '#222')
            .attr('opacity', this.keepLabels ? this.labelOpacity : '0')
            .attr('pointer-events', 'none')
            .text((d) => d.target.data.pathLabel)
            .each((d) => {
              d.target.data.linkLabelElement = d;
            });

          return newLink;
        },
        (update) => {
          const updatedLink = update;

          updatedLink
            .select('path')
            .attr('id', (d) => `path-id-${d.target.id}`)
            // .attr("stroke-opacity", "0.4")
            .attr('stroke', (d) => (d.target.data.dashes ? '#bbb' : '#bbb'))
            .attr('stroke-dasharray', (d) => (d.target.data.dashes ? 5 : null))
            .attr('marker-end', 'url(#arrowhead)')
            .each((d) => {
              d.target.data.linkPathElement = d;
            });

          updatedLink
            .select('text')
            .attr('dy', '2px')
            .attr('font-size', '6px')
            .attr('paint-order', 'stroke')
            .attr('stroke', '#f2f2f2')
            .attr('stroke-width', '1px')
            .attr('text-anchor', 'middle')
            .attr('fill', '#222')
            .attr('opacity', this.keepLabels ? this.labelOpacity : '0')
            .attr('pointer-events', 'none')
            .text((d) => d.target.data.pathLabel)
            .each((d) => {
              d.target.data.linkLabelElement = d;
            });

          return updatedLink;
        },
        (exit) => exit.remove(),
      );

    this.linkPaths = this.link.selectAll('path');

    this.linkLabels = this.link.selectAll('text');
  }

  initNodes(at) {
    const drag = (simulation) => {
      const that = this;

      function dragStarted(event, d) {
        if (that.layout !== 'force') return;
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        setTimeout(() => {
          d3.select(this).raise();
        }, 100);
      }

      function dragged(event, d) {
        if (that.layout !== 'force') return;
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
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded);
    };

    this.node = this.svg
      .select('.nodes')
      .selectAll('g')
      .data(this.nodes, (d) => d.data.id)
      .join(
        (enter) => {
          const newNode = enter
            .append('g')
            .attr('class', 'node')
            .attr('id', (d) => `node-id-${d.data.id}`)
            .attr(
              'transform',
              (d) => `translate(${at ? at.x : d.parent ? d.parent.x : d.x},${
                at ? at.y : d.parent ? d.parent.y : d.y
              })`,
            );

          newNode
            .attr('fill', '#000')
            .attr('stroke', '#000')
            .append('circle')
            .attr('r', (d) => (d.parent ? 2 : 4))
            .attr('stroke-width', 0)
            .attr('fill', (d) => {
              if (d.data.type === 'MAIN') {
                return '#222';
              }
              if (d.data.type === 'INTERNAL') {
                return '#222';
              }
              return '#999';
            })
            .attr('filter', (d) => (d.parent
              ? null
              : 'drop-shadow(0px 5px 20px -5px rgba(8, 84, 150, 0.15))'))
            .attr('stroke', (d) => (d.children ? null : '#000'));

          newNode
            .append('text')
            .attr('dy', '2px')
            .attr('font-size', '8px')
            .attr('paint-order', 'stroke')
            .attr('stroke', '#f2f2f2')
            .attr('stroke-width', '2px')
            .attr('fill', (d) => {
              if (d.data.type === 'MAIN') {
                return '#222';
              }
              if (d.data.type === 'INTERNAL') {
                return '#222';
              }
              return '#999';
            })
            .text((d) => d.data.nodeLabel)
            .on('mouseover', (e, d) => {
              if (this.isShifting != null) return;

              this.link
                .transition()
                .duration(0)
                .attr('opacity', (l) => (l.target.id === d.id ? '1' : '0.2'))
                .select('path');
              this.linkLabels
                .transition()
                .duration(0)
                .attr('opacity', (l) => {
                  if (parseInt(l.target.id) === d.data.id)
                    return '1';
                  else {
                    return this.keepLabels ? this.labelOpacity : '0';
                  }
                });
              this.node
                .transition()
                .duration(0)
                .attr('opacity', (n) => (n.id === d.id || n.id === d.parent?.id ? '1' : '0.2'))
                .attr('font-weight', (n) => (n.id === d.id || n.id === d.parent?.id ? 'bold' : 'normal'));
            })
            .on('mouseout', () => {
              if (this.isShifting != null) return;

              this.blurHighlight();
            })
            .on('click', (e, d) => this.nodeClick(e, d));

          newNode.call(drag(this.simulation));

          return newNode;
        },
        (update) => update,
        (exit) => exit.remove(),
      );
  }

  getSvg() {
    return d3
      .create('svg')
      .attr('viewBox', [
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
        'link',
        d3
          .forceLink(this.links)
          .id((d) => d.id)
          .distance(0.5)
          .strength(0.5),
      )
      .force(
        'charge',
        d3
          .forceManyBody()
          .strength(
            (d) => (-1600 * (d.parent ? 1 : 5)) / (d.children ? 0.5 : 3),
          ),
      )
      .force('center', d3.forceCenter().strength(0.2))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .alphaDecay(0.055);

    newSimulation.on('tick', () => {
      if (this.layout !== 'force') return;

      this.linkPaths.attr('d', (d) => {
        const x0 = d.source.x;
        const y0 = d.source.y;
        const x1 = d.target.x;
        const y1 = d.target.y;
        const xcontrol = x1 * 0.45 + x0 * 0.55;
        const ycontrol = y1 * 0.55 + y0 * 0.45;
        return [
          'M',
          x0,
          y0,
          'C',
          xcontrol,
          ycontrol,
          xcontrol,
          ycontrol,
          x1,
          y1,
        ].join(' ');
      });

      this.linkLabels.attr(
        'transform',
        (d) => `translate(${(d.target.x + d.source.x) / 2}, ${
          (d.target.y + d.source.y) / 2
        })`,
      );

      this.node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    });

    return newSimulation;
  }

  updateSimulation() {
    this.simulation
      .nodes(this.nodes)
      .force(
        'link',
        d3
          .forceLink(this.links)
          .id((d) => d.id)
          .distance(0.5)
          .strength(0.5),
      )
      .force(
        'charge',
        d3
          .forceManyBody()
          .strength(
            (d) => (-this.distance * 30 * (d.parent ? 1 : 4)) / (d.children ? 1 : 3),
          ),
      )
      .force('center', d3.forceCenter().strength(0.2))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .restart();
  }

  setControlPanelOpen(isControlPanelOpen) {
    this.isControlPanelOpen = isControlPanelOpen;
  }

  setIsFullscreen(isFullscreen) {
    this.isFullscreen = isFullscreen;
  }

  distanceUpdate(value) {
    this.distance = value;

    if (this.layout === 'tree') this.toTree({ skipTransition: true });
    else if (this.layout === 'clusterTree') this.toClusterTree({ skipTransition: true });
    else if (this.layout === 'radial') this.toRadial({ skipTransition: true });
    else if (this.layout === 'clusterRadial') this.toClusterRadial({ skipTransition: true });
    else if (this.layout === 'force') this.toForce();
  }

  verticalDistanceUpdate(value) {
    this.verticalDistance = value;

    if (this.layout === 'tree') this.toTree({ skipTransition: true });
    else if (this.layout === 'clusterTree') this.toClusterTree({ skipTransition: true });
    else if (this.layout === 'radial') this.toRadial({ skipTransition: true });
    else if (this.layout === 'clusterRadial') this.toClusterRadial({ skipTransition: true });
    else if (this.layout === 'force') this.toForce();
  }

  keepLabelsUpdate(value) {
    this.keepLabels = value;

    this.linkLabels
      .transition()
      .duration(this.mouseoverTransitionSpeed)
      .attr('opacity', this.keepLabels ? this.labelOpacity : '0');
  }

  blurHighlight() {
    this.link
      .transition()
      .duration(this.mouseoverTransitionSpeed)
      .attr('opacity', '1');
    this.linkLabels
      .transition()
      .duration(this.mouseoverTransitionSpeed)
      .attr('opacity', this.keepLabels ? this.labelOpacity : '0');
    this.node
      .transition()
      .duration(this.mouseoverTransitionSpeed)
      .attr('opacity', '1')
      .attr('font-weight', 'normal');
  }

  sort(type) {
    this.isShifting = null;
    this.isShifting = setTimeout(() => {
      this.isShifting = null;
    }, this.transitionSpeed);

    this.sortType = type;

    if (type === 'az') {
      this.root.each((d) => {
        d._totalChildren?.sort((a, b) => d3.ascending(a.data.nodeLabel, b.data.nodeLabel));
      });
    } else if (type === 'height') {
      this.root.each((d) => {
        d._totalChildren?.sort((a, b) => d3.descending(a.height, b.height));
      });
    } else if (type === 'optional') {
      this.root.each((d) => {
        d._totalChildren?.sort((a, b) => d3.descending(a.data.dashes, b.data.dashes));
      });
    } else if (type === 'inherited') {
      this.root.each((d) => {
        d._totalChildren?.sort((a, b) => d3.descending(a.data.type, b.data.type));
      });
    }

    this.filter(this.filters);
  }

  filter(filters) {
    this.filters = filters;
    const {
      external, internal, optional, required,
    } = filters;

    this.root.each((d) => {
      if (!d._totalChildren) return;

      if (d._children) return;

      const totalChildren = d._totalChildren;

      const remaining = [];
      const filteredOut = [];

      totalChildren.forEach((child) => {
        if (
          (child.data.dashes && !optional)
          || (!child.data.dashes && !required)
          || (child.data.type === 'EXTERNAL' && !external)
          || (child.data.type === 'INTERNAL' && !internal)
        ) {
          filteredOut.push(child);
          return;
        }

        remaining.push(child);
      });

      d.children = remaining;
      d._children = null;
      d._filtered = filteredOut;

      if (d.children.length === 0) {
        delete d.children;
      }
    });

    this.isShifting = null;
    this.isShifting = setTimeout(() => {
      this.isShifting = null;
    }, this.transitionSpeed);

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    this.simulation.stop();
    this.updateSimulation();
    this.initLinks();
    this.initNodes();

    if (this.layout === 'tree') this.toTree();
    else if (this.layout === 'clusterTree') this.toClusterTree();
    else if (this.layout === 'radial') this.toRadial();
    else if (this.layout === 'clusterRadial') this.toClusterRadial();
    else if (this.layout === 'force') this.toForce();
  }

  async expandGraph(d) {
    if (this.isShifting) {
      return;
    }
    this.isShifting = true;
    this.simulation.alphaTarget(0);

    if (d._children) {
      // if node contains already collapsed children then expand them
      d.children = d._children;
      d._children = null;
    } else if (d.children) {
      // if node contains expanded children hide them
      // disable collapsing for root node
      if (!d.parent) {
        this.blurHighlight();
        this.isShifting = null;
        return;
      }

      d._children = d.children;
      d.children = null;
    } else if (!d.height || d.height === 0) {
      // if node has no saved children and height equal to 0 then fetch nodes
      // check if node is a duplicate to avoid infinite loops
      let tmp = d;
      while (tmp.parent) {
        tmp = tmp.parent;

        if (
          d.data.nodeIri === tmp.data.nodeIri
          && d.data.nodeLabel === tmp.data.nodeLabel
        ) {
          this.pushAlert('duplicate', d.data.nodeLabel);
          this.isShifting = null;
          this.blurHighlight();
          return;
        }
      }

      try {
        // add loader
        this.svg
          .select('.nodes')
          .selectAll('g')
          .data(this.nodes, (n) => n.data.id)
          .filter((n) => n.data.id === d.data.id)
          .append('g')
          .attr('class', 'node-loader')
          .append('circle')
          .attr('r', 5)
          .attr('fill', 'none')
          .attr('stroke-width', 2)
          .attr('class', 'node-loader__circle');

        // fetch children from server
        const domain = `${this.graphServer}?iri=${encodeURI(
          d.data.nodeIri,
        )}&nodeId=${d.id}&lastId=${this.lastId}`;
        const result = await fetch(domain, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        let body = null;

        try {
          body = await result.json();
        } catch (e) {
          this.pushAlert('noChildren', d.data.nodeLabel);
          this.isShifting = null;
          this.svg
            .select('.nodes')
            .selectAll('g')
            .data(this.nodes, (n) => n.data.id)
            .filter((n) => n.data.id === d.data.id)
            .select('.node-loader')
            .remove();
          this.blurHighlight();
          return;
        }

        if (body.nodes.length === 1) {
          this.pushAlert('noChildren', d.data.nodeLabel);
          this.isShifting = null;
          this.svg
            .select('.nodes')
            .selectAll('g')
            .data(this.nodes, (n) => n.data.id)
            .filter((n) => n.data.id === d.data.id)
            .select('.node-loader')
            .remove();
          this.blurHighlight();
          return;
        }

        this.lastId = body.lastId;

        const newNodes = Ontograph.parseNodes(body);
        this.parsedNodes.push(...newNodes.filter((n) => n.id !== d.id));

        const childRoot = d3
          .stratify()
          .id((node) => node.id)
          .parentId((node) => node.from)(newNodes);

        d.height = childRoot.height;

        childRoot.each((node) => {
          if (node.parent?.id === d.id) node.parent = d;
          node.depth += d.depth;
        });

        d.children = childRoot.children;

        d.each((node) => {
          if (node.children) node._totalChildren = node.children;
        });

        // update all heights
        let node = d;
        while (node.parent?.height < node.height + 1) {
          node.parent.height = node.height + 1;
          node = node.parent;
        }
      } catch (err) {
        this.pushAlert('noChildren');
        console.error(err);
      }

      this.svg
        .select('.nodes')
        .selectAll('g')
        .data(this.nodes, (n) => n.data.id)
        .filter((n) => n.data.id === d.data.id)
        .select('.node-loader')
        .remove();

      this.sort(this.sortType);
    }

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    this.initLinks(d);
    this.initNodes(d);

    this.isShifting = setTimeout(() => {
      this.isShifting = null;
      this.blurHighlight();
    }, this.transitionSpeed);

    this.filter(this.filters);

    if (this.layout === 'tree') this.toTree();
    else if (this.layout === 'clusterTree') this.toClusterTree();
    else if (this.layout === 'radial') this.toRadial();
    else if (this.layout === 'clusterRadial') this.toClusterRadial();
    else if (this.layout === 'force') {
      this.toForce();
      d.children?.forEach((node) => {
        node.x = d.x + (0.5 - Math.random()) * 100;
        node.y = d.y + (0.5 - Math.random()) * 100;
      });
    }

    this.onHeightUpdate();
  }

  changeLayoutTo(to) {
    if (this.layout === to) return;

    if (this.isShifting != null) return;

    this.isShifting = null;
    this.isShifting = setTimeout(() => {
      this.isShifting = null;
    }, this.transitionSpeed);

    if (to === 'tree') this.toTree();
    else if (to === 'clusterTree') this.toClusterTree();
    else if (to === 'radial') this.toRadial();
    else if (to === 'clusterRadial') this.toClusterRadial();
    else if (to === 'force') this.toForce();

    this.layout = to;
  }

  toTree({ skipTransition } = {}) {
    this.simulation.stop();

    const dx = this.distance * 4;
    const dy = this.verticalDistance;

    const treeLayout = d3.tree().nodeSize([dy, dx])(this.root);

    this.nodes = treeLayout.descendants(this.root);
    this.links = treeLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x),
      );

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr('transform', (d) => `translate(${d.y}, ${d.x})`);

    this.node
      .selectAll('text')
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr('x', (d) => (d.children?.length ? -6 : 6))
      .attr('text-anchor', (d) => (d.children?.length ? 'end' : 'start'))
      .attr('transform', '');

    this.nodes.forEach((node) => {
      const x = node.y;
      const y = node.x;
      node.x = x;
      node.y = y;
    });

    this.linkLabels
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'transform',
        (d) => `translate(${(d.target.x + d.source.x) / 2}, ${
          (d.target.y + d.source.y) / 2
        })`,
      );
  }

  toClusterTree({ skipTransition } = {}) {
    this.simulation.stop();

    this.links = this.root.links();
    this.nodes = this.root.descendants();

    const dx = this.distance * 4;
    const dy = this.verticalDistance;

    const treeLayout = d3.cluster().nodeSize([dy, dx])(this.root);

    this.nodes = treeLayout.descendants(this.root);
    this.links = treeLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x),
      );

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr('transform', (d) => `translate(${d.y}, ${d.x})`);

    this.node
      .selectAll('text')
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr('x', (d) => (d.children?.length ? -6 : 6))
      .attr('text-anchor', (d) => (d.children?.length ? 'end' : 'start'))
      .attr('transform', '');

    this.nodes.forEach((node) => {
      const x = node.y;
      const y = node.x;
      node.x = x;
      node.y = y;
    });

    this.linkLabels
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'transform',
        (d) => `translate(${(d.target.x + d.source.x) / 2}, ${
          (d.target.y + d.source.y) / 2
        })`,
      );
  }

  toRadial({ skipTransition } = {}) {
    this.simulation.stop();

    const radius = this.root.height * this.distance * 4;

    const radialLayout = d3
      .tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 4 : 8))(this.root);

    this.nodes = radialLayout.descendants(this.root);
    this.links = radialLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'd',
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y),
      );

    // .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    const x0 = (d) => Math.cos(d.x - Math.PI / 2) * d.y;
    const y0 = (d) => Math.sin(d.x - Math.PI / 2) * d.y;

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'transform',
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`,
      );

    this.nodes.forEach((node) => {
      const x = x0(node);
      const y = y0(node);
      node.x = x;
      node.y = y;
    });

    this.node
      .select('text')
      // .transition()
      // .duration(this.transitionSpeed)
      .attr('transform', (d) => `rotate(${d.x <= 0 ? 180 : 0})`)
      .attr('dy', '2px')
      .attr('x', (d) => (d.x > 0 === !d.children ? 6 : -6))
      .attr('text-anchor', (d) => (d.x > 0 === !d.children ? 'start' : 'end'));

    this.linkLabels
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'transform',
        (d) => `translate(${(d.target.x + d.source.x) / 2}, ${
          (d.target.y + d.source.y) / 2
        })`,
      );
  }

  toClusterRadial({ skipTransition } = {}) {
    this.simulation.stop();

    const radius = this.root.height * this.distance * 4;

    const radialLayout = d3
      .cluster()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 4 : 8))(this.root);

    this.nodes = radialLayout.descendants(this.root);
    this.links = radialLayout.links(this.nodes);

    this.linkPaths
      .data(this.links, (d) => d.target.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'd',
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y),
      );

    const x0 = (d) => Math.cos(d.x - Math.PI / 2) * d.y;
    const y0 = (d) => Math.sin(d.x - Math.PI / 2) * d.y;

    this.node
      .data(this.nodes, (d) => d.data.id)
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'transform',
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`,
      );

    this.nodes.forEach((node) => {
      const x = x0(node);
      const y = y0(node);
      node.x = x;
      node.y = y;
    });

    this.node
      .select('text')
      .attr('transform', (d) => `rotate(${d.x <= 0 ? 180 : 0})`)
      .attr('dy', '2px')
      .attr('x', (d) => (d.x > 0 === !d.children ? 6 : -6))
      .attr('text-anchor', (d) => (d.x > 0 === !d.children ? 'start' : 'end'));

    this.linkLabels
      .transition()
      .duration(skipTransition ? 0 : this.transitionSpeed)
      .attr(
        'transform',
        (d) => `translate(${(d.target.x + d.source.x) / 2}, ${
          (d.target.y + d.source.y) / 2
        })`,
      );
  }

  toForce() {
    this.updateSimulation();
    this.simulation.alpha(0.7).alphaTarget(0.5);

    this.node
      .selectAll('text')
      .transition()
      .duration(this.transitionSpeed)
      .attr('x', 6)
      .attr('text-anchor', 'start')
      .attr('transform', '');

    setTimeout(() => {
      this.simulation.alphaTarget(0);
    }, 250);
  }

  center(margin) {
    this.simulation.stop();
    const nodesBBox = this.svg.select('.nodes').node().getBBox();

    const midX = nodesBBox.x + nodesBBox.width / 2;
    const midY = nodesBBox.y + nodesBBox.height / 2;

    const finalMargin = margin || 60;
    const controlPanelOffset = this.isControlPanelOpen ? 300 : 0;

    const scaleX = (this.width - controlPanelOffset - finalMargin) / nodesBBox.width;
    const scaleY = (this.height - finalMargin) / nodesBBox.height;
    const scale = Math.min(d3.min([scaleX, scaleY]), 2.5);

    this.centerAtAndZoom(midX, midY, scale);
  }

  centerAtAndZoom(x, y, scale) {
    const controlPanelOffset = this.isControlPanelOpen ? 300 : 0;
    this.svg
      .transition()
      .duration(this.transitionSpeed)
      .call(
        this.zoomController.transform,
        d3.zoomIdentity
          .translate(-x * scale - controlPanelOffset / 2, -y * scale)
          .scale(scale),
      );
  }

  nodeClick(event, node) {
    if (event.defaultPrevented) return;
    this.expandGraph(node);
    // this.nav(node.data.nodeIri);
  }

  removeGraph() {
    this.svg.remove();
  }

  resizeHandler(target) {
    this.width = target.clientWidth;
    this.height = target.clientHeight;

    this.svg.attr('viewBox', [
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    ]);

    this.center();
  }

  pushAlert(type, source) {
    this.alertId += 1;
    this.alertHandler(type, this.alertId, source);
  }
}
