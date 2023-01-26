export default {
  state: () => ({
    ontoviewerDefaultDomain: '',

    searchSegment: `find`,
    ontologySegment: `entity`,
    modulesSegment: `module`,
    statsSegment: `stats`,
    missingImportsSegment: `missingImports`,
    graphSegment: `graph`,

    version: null,

    searchServer: null,
    ontologyServer: null,
    modulesServer: null,
    statsServer: null,
    missingImportsServer: null,
    graphServer: null,
  }),
  mutations: {
    SET_VERSION(state, { version }) {
      state.version = version;
    },
    SET_SEARCH_SERVER(state, { searchServer }) {
      state.searchServer = searchServer;
    },
    SET_ONTOLOGY_SERVER(state, { ontologyServer }) {
      state.ontologyServer = ontologyServer;
    },
    SET_MODULES_SERVER(state, { modulesServer }) {
      state.modulesServer = modulesServer;
    },
    SET_STATS_SERVER(state, { statsServer }) {
      state.statsServer = statsServer;
    },
    SET_MISSING_IMPORTS_SERVER(state, { missingImportsServer }) {
      state.missingImportsServer = missingImportsServer;
    },
    SET_GRAPH_SERVER(state, { graphServer }) {
      state.graphServer = graphServer;
    },
  },
  actions: {
    async updateServers({ commit, state, rootState }, { route, to }) {
      let internalRoute = route;
      let ontoviewerDefaultDomain = rootState.configuration.ontoviewerServerUrl;

      if (to !== undefined) {
        internalRoute = to;
      }

      if (internalRoute.query?.domain) {
        ontoviewerDefaultDomain = internalRoute.query.domain;
      }

      if (internalRoute.query?.modules) {
        modulesServer = internalRoute.query.modules;
      }

      if (internalRoute.query?.version) {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}/",
          `${internalRoute.query.version}/`
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}",
          `${internalRoute.query.version}`
        );
        version = internalRoute.query.version;
      } else {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace("{version}/", "");
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace("{version}", "");
        version = null;
      }

      let searchServer = ontoviewerDefaultDomain + state.searchSegment;
      let ontologyServer = ontoviewerDefaultDomain + state.ontologySegment;
      let statsServer = ontoviewerDefaultDomain + state.statsSegment;
      let missingImportsServer = ontoviewerDefaultDomain + state.missingImportsSegment;
      let modulesServer = ontoviewerDefaultDomain + state.modulesSegment;
      let graphServer = ontoviewerDefaultDomain + state.graphSegment;
      let version = null;

      commit("SET_VERSION", { version });
      commit("SET_SEARCH_SERVER", { searchServer });
      commit("SET_ONTOLOGY_SERVER", { ontologyServer });
      commit("SET_MODULES_SERVER", { modulesServer });
      commit("SET_STATS_SERVER", { statsServer });
      commit("SET_MISSING_IMPORTS_SERVER", { missingImportsServer });
      commit("SET_GRAPH_SERVER", { graphServer });
    },
  },
};
