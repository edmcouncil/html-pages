export default {
  state: () => ({
    searchSegment: `find`,
    ontologySegment: `entity`,
    modulesSegment: `module`,
    statsSegment: `stats`,
    missingImportsSegment: `missingImports`,
    graphSegment: `graph`,

    version: null,
    versionCompare: null,

    searchServer: null,
    ontologyServer: null,
    modulesServer: null,
    statsServer: null,
    missingImportsServer: null,
    graphServer: null,

    searchServerCompare: null,
    ontologyServerCompare: null,
    modulesServerCompare: null,
    statsServerCompare: null,
    missingImportsServerCompare: null,
    graphServerCompare: null,
  }),
  mutations: {
    SET_VERSION(state, { version }) {
      state.version = version;
    },
    SET_SERVERS(
      state,
      {
        searchServer,
        ontologyServer,
        modulesServer,
        statsServer,
        missingImportsServer,
        graphServer,
      }
    ) {
      state.searchServer = searchServer;
      state.ontologyServer = ontologyServer;
      state.modulesServer = modulesServer;
      state.statsServer = statsServer;
      state.missingImportsServer = missingImportsServer;
      state.graphServer = graphServer;
    },
    SET_COMPARE_SERVERS(
      state,
      {
        searchServer,
        ontologyServer,
        modulesServer,
        statsServer,
        missingImportsServer,
        graphServer,
      }
    ) {
      state.searchServerCompare = searchServer;
      state.ontologyServerCompare = ontologyServer;
      state.modulesServerCompare = modulesServer;
      state.statsServerCompare = statsServer;
      state.missingImportsServerCompare = missingImportsServer;
      state.graphServerCompare = graphServer;
    },
  },
  actions: {
    async updateServers({ commit, state, rootState }, { route, to }) {
      let internalRoute = route;
      let ontoviewerDefaultDomain = rootState.configuration.ontoviewerServerUrl;
      let version = null;

      if (to !== undefined) {
        internalRoute = to;
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
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}/",
          ""
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}",
          ""
        );
        version = null;
      }

      let searchServer = ontoviewerDefaultDomain + state.searchSegment;
      let ontologyServer = ontoviewerDefaultDomain + state.ontologySegment;
      let statsServer = ontoviewerDefaultDomain + state.statsSegment;
      let missingImportsServer =
        ontoviewerDefaultDomain + state.missingImportsSegment;
      let modulesServer = ontoviewerDefaultDomain + state.modulesSegment;
      let graphServer = ontoviewerDefaultDomain + state.graphSegment;

      commit("SET_VERSION", { version });
      commit("SET_SERVERS", {
        searchServer,
        ontologyServer,
        modulesServer,
        statsServer,
        missingImportsServer,
        graphServer,
      });
    },
    async updateCompareServers({ commit, state, rootState }, { compareVersion }) {
      let ontoviewerDefaultDomain = rootState.configuration.ontoviewerServerUrl;

      if (compareVersion) {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}/",
          `${compareVersion}/`
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}",
          `${compareVersion}`
        );
      } else {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}/",
          ""
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          "{version}",
          ""
        );
      }

      let searchServer = ontoviewerDefaultDomain + state.searchSegment;
      let ontologyServer = ontoviewerDefaultDomain + state.ontologySegment;
      let statsServer = ontoviewerDefaultDomain + state.statsSegment;
      let missingImportsServer =
        ontoviewerDefaultDomain + state.missingImportsSegment;
      let modulesServer = ontoviewerDefaultDomain + state.modulesSegment;
      let graphServer = ontoviewerDefaultDomain + state.graphSegment;

      commit("SET_COMPARE_SERVERS", {
        searchServer,
        ontologyServer,
        modulesServer,
        statsServer,
        missingImportsServer,
        graphServer,
      });
    },
  },
};
