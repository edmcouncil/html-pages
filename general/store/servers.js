export default {
  state: () => ({
    searchSegment: 'find',
    ontologySegment: 'entity',
    modulesSegment: 'module',
    statsSegment: 'stats',
    missingImportsSegment: 'missingImports',
    graphSegment: 'graph',
    describeSegment: 'integration/dwDescribe',

    version: null,
    versionCompare: null,

    searchServer: null,
    ontologyServer: null,
    modulesServer: null,
    statsServer: null,
    missingImportsServer: null,
    graphServer: null,
    describeServer: null,

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
    SET_COMPARE_VERSION(state, { version }) {
      state.versionCompare = version;
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
        describeServer,
      },
    ) {
      state.searchServer = searchServer;
      state.ontologyServer = ontologyServer;
      state.modulesServer = modulesServer;
      state.statsServer = statsServer;
      state.missingImportsServer = missingImportsServer;
      state.graphServer = graphServer;
      state.describeServer = describeServer;
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
      },
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
      let ontoviewerDefaultDomain = rootState.configuration.config.ontoviewerServerUrl;
      let version = null;

      if (to !== undefined) {
        internalRoute = to;
      }

      if (internalRoute.query?.version) {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}/',
          `${internalRoute.query.version}/`,
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}',
          `${internalRoute.query.version}`,
        );
        version = internalRoute.query.version;
      } else {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}/',
          '',
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}',
          '',
        );
        version = null;
      }

      const searchServer = ontoviewerDefaultDomain + state.searchSegment;
      const ontologyServer = ontoviewerDefaultDomain + state.ontologySegment;
      const statsServer = ontoviewerDefaultDomain + state.statsSegment;
      const missingImportsServer = ontoviewerDefaultDomain + state.missingImportsSegment;
      const modulesServer = ontoviewerDefaultDomain + state.modulesSegment;
      const graphServer = ontoviewerDefaultDomain + state.graphSegment;
      const describeServer = ontoviewerDefaultDomain + state.describeSegment;

      commit('SET_VERSION', { version });
      commit('SET_SERVERS', {
        searchServer,
        ontologyServer,
        modulesServer,
        statsServer,
        missingImportsServer,
        graphServer,
        describeServer,
      });
    },
    async updateCompareServers(
      { commit, state, rootState },
      { compareVersion },
    ) {
      let ontoviewerDefaultDomain = rootState.configuration.config.ontoviewerServerUrl;
      let version = null;

      if (compareVersion) {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}/',
          `${compareVersion}/`,
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}',
          `${compareVersion}`,
        );
        version = compareVersion;
      } else {
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}/',
          '',
        );
        ontoviewerDefaultDomain = ontoviewerDefaultDomain.replace(
          '{version}',
          '',
        );
        version = null;
      }

      const searchServer = ontoviewerDefaultDomain + state.searchSegment;
      const ontologyServer = ontoviewerDefaultDomain + state.ontologySegment;
      const statsServer = ontoviewerDefaultDomain + state.statsSegment;
      const missingImportsServer = ontoviewerDefaultDomain + state.missingImportsSegment;
      const modulesServer = ontoviewerDefaultDomain + state.modulesSegment;
      const graphServer = ontoviewerDefaultDomain + state.graphSegment;

      commit('SET_COMPARE_VERSION', { version });
      commit('SET_COMPARE_SERVERS', {
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
