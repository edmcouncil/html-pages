const ontologyName = process.env.ontologyName.toLowerCase();

export default {
  state: () => ({
    searchDefaultDomain: `/${ontologyName}/ontology/{version}api/find`,
    ontologyDefaultDomain: `/${ontologyName}/ontology/{version}api/entity`,
    modulesDefaultDomain: `/${ontologyName}/ontology/{version}api/module`,
    statsDefaultDomain: `/${ontologyName}/ontology/{version}api/stats`,
    missingImportsDefaultDomain: `/${ontologyName}/ontology/{version}api/missingImports`,

    version: null,

    searchServer: null,
    ontologyServer: null,
    modulesServer: null,
    statsServer: null,
    missingImportsServer: null,
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
  },
  actions: {
    updateServers({ commit, state }, { route, to }) {
      let internalRoute = route;

      let searchServer = state.searchDefaultDomain;
      let ontologyServer = state.ontologyDefaultDomain;
      let statsServer = state.statsDefaultDomain;
      let missingImportsServer = state.missingImportsDefaultDomain;
      let modulesServer = state.modulesDefaultDomain;
      let version = null;

      if (to !== undefined) {
        internalRoute = to;
      }

      if (internalRoute.query?.domain) {
        searchServer = internalRoute.query.domain;
        ontologyServer = internalRoute.query.domain;
        statsServer = internalRoute.query.domain;
        missingImportsServer = internalRoute.query.domain;
      }

      if (internalRoute.query?.modules) {
        modulesServer = internalRoute.query.modules;
      }

      if (internalRoute.query?.version) {
        ontologyServer = ontologyServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        searchServer = searchServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        modulesServer = modulesServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        statsServer = statsServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        missingImportsServer = missingImportsServer.replace(
          "{version}",
          `${internalRoute.query.version}/`
        );
        version = internalRoute.query.version;
      } else {
        ontologyServer = ontologyServer.replace("{version}", "");
        searchServer = searchServer.replace("{version}", "");
        modulesServer = modulesServer.replace("{version}", "");
        statsServer = statsServer.replace("{version}", "");
        missingImportsServer = missingImportsServer.replace("{version}", "");
        version = null;
      }

      commit("SET_VERSION", { version });
      commit("SET_SEARCH_SERVER", { searchServer });
      commit("SET_ONTOLOGY_SERVER", { ontologyServer });
      commit("SET_MODULES_SERVER", { modulesServer });
      commit("SET_STATS_SERVER", { statsServer });
      commit("SET_MISSING_IMPORTS_SERVER", { missingImportsServer });
    },
  },
};
