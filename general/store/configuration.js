const ontologyNameFallback = process.env.ontologyName.toLowerCase();
const uriSpaceFallback = process.env.ontologyResourcesBaseUri;
const ontoviewerServerUrlFallback = `/${ontologyNameFallback}/ontology/{version}/api/`;
const ontologyRepositoryUrlFallback = `https://github.com/edmcouncil/${ontologyNameFallback}`;

export default {
  state: () => ({
    ontpubFamily: ontologyNameFallback,
    ontologyLogoUrl: null,
    uriSpace: uriSpaceFallback,
    ontoviewerServerUrl: ontoviewerServerUrlFallback,
    ontologyRepositoryUrl: ontologyRepositoryUrlFallback,
  }),
  mutations: {
    SET_CONFIG_DATA (state, data) {
      state.ontpubFamily = data?.ontpubFamily || ontologyNameFallback;
      state.ontologyLogoUrl = data?.ontologyLogoUrl || null;
      state.uriSpace = data?.uriSpace || uriSpaceFallback;
      state.ontoviewerServerUrl = data?.ontoviewerServerUrl || ontoviewerServerUrlFallback;
      state.ontologyRepositoryUrl = data?.ontologyRepositoryUrl || ontologyRepositoryUrlFallback;
    },
  },
  actions: {
  },
};
