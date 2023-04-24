const ontologyNameFallback = process.env.ontologyName.toLowerCase();
const uriSpaceFallback = process.env.ontologyResourcesBaseUri;
const ontoviewerServerUrlFallback = `/${ontologyNameFallback}/ontology/{version}/api/`;
const ontologyRepositoryUrlFallback = `https://github.com/edmcouncil/${ontologyNameFallback}`;
const defaultBranchNameFallback = 'current';

export default {
  state: () => ({
    config: {
      ontpubFamily: ontologyNameFallback,
      ontologyLogoUrl: null,
      uriSpace: uriSpaceFallback,
      ontoviewerServerUrl: ontoviewerServerUrlFallback,
      ontologyRepositoryUrl: ontologyRepositoryUrlFallback,
      defaultBranchName: defaultBranchNameFallback,
    }
  }),
  mutations: {
    SET_CONFIG_DATA (state, data) {
      state.config = {
        ...state.config,
        ...data
      }
    },
  },
};
