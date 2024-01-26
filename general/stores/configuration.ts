import { defineStore } from 'pinia';
import { getAppConfigurationData } from '@/api/strapi';

export const useConfigurationStore = defineStore({
  id: 'configuration-store',
  state: () => {
    return {
      config: {
        ontpubFamily: null as any,
        ontologyLogoUrl: null as any,
        uriSpace: null as any,
        ontoviewerServerUrl: null as any,
        ontologyRepositoryUrl: null as any,
        defaultBranchName: null as any,
        jenkinsJobUrl: null as any,
      }
    }
  },
  actions: {
    setConfigurationData(data: object) {
      this.config = {
        ...this.config,
        ...data,
      };
    },
    async initialize(runtimeConfig: any) {
      this.config.ontpubFamily = runtimeConfig.public.ontologyName?.toLowerCase() || 'fibo';
      this.config.ontologyLogoUrl = null;
      this.config.uriSpace = runtimeConfig.public.ontologyResourcesBaseUri;
      this.config.ontoviewerServerUrl = `http://localhost:3000/${this.config.ontpubFamily}/ontology/{version}/api/`;
      this.config.ontologyRepositoryUrl = `https://github.com/edmcouncil/${this.config.ontpubFamily}`;
      this.config.defaultBranchName = 'current';
      this.config.jenkinsJobUrl = null;

      const configData = await getAppConfigurationData(runtimeConfig);
      this.setConfigurationData(configData);
    }
  },
})
