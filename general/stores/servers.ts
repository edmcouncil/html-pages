import { defineStore } from 'pinia';
import { useConfigurationStore } from './configuration';

export const useServersStore = defineStore({
  id: 'servers-store',
  state: () => {
    return {
      searchSegment: 'find',
      ontologySegment: 'entity',
      modulesSegment: 'module',
      statsSegment: 'stats',
      missingImportsSegment: 'missingImports',
      graphSegment: 'graph',
      describeSegment: 'integration/dwDescribe',

      version: null as string | null,
      versionCompare: null as string | null,

      searchServer: '',
      ontologyServer: '',
      modulesServer: '',
      statsServer: '',
      missingImportsServer: '',
      graphServer: '',
      describeServer: '',

      searchServerCompare: '',
      ontologyServerCompare: '',
      modulesServerCompare: '',
      statsServerCompare: '',
      missingImportsServerCompare: '',
      graphServerCompare: '',
    }
  },
  actions: {
    updateServers(route: any, to: any): void {
      const configurationStore = useConfigurationStore();
      let internalRoute = route;
      let ontoviewerDefaultDomain = configurationStore.config.ontoviewerServerUrl;
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

      const searchServer = ontoviewerDefaultDomain + this.searchSegment;
      const ontologyServer = ontoviewerDefaultDomain + this.ontologySegment;
      const statsServer = ontoviewerDefaultDomain + this.statsSegment;
      const missingImportsServer = ontoviewerDefaultDomain + this.missingImportsSegment;
      const modulesServer = ontoviewerDefaultDomain + this.modulesSegment;
      const graphServer = ontoviewerDefaultDomain + this.graphSegment;
      const describeServer = ontoviewerDefaultDomain + this.describeSegment;

      this.version = version;
      this.searchServer = searchServer;
      this.ontologyServer = ontologyServer;
      this.modulesServer = modulesServer;
      this.statsServer = statsServer;
      this.missingImportsServer = missingImportsServer;
      this.graphServer = graphServer;
      this.describeServer = describeServer;
    },
    updateCompareServers(compareVersion: string | null): void {
      const configurationStore = useConfigurationStore();
      let ontoviewerDefaultDomain = configurationStore.config.ontoviewerServerUrl;
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

      const searchServer = ontoviewerDefaultDomain + this.searchSegment;
      const ontologyServer = ontoviewerDefaultDomain + this.ontologySegment;
      const statsServer = ontoviewerDefaultDomain + this.statsSegment;
      const missingImportsServer = ontoviewerDefaultDomain + this.missingImportsSegment;
      const modulesServer = ontoviewerDefaultDomain + this.modulesSegment;
      const graphServer = ontoviewerDefaultDomain + this.graphSegment;

      this.versionCompare = version;

      this.searchServerCompare = searchServer;
      this.ontologyServerCompare = ontologyServer;
      this.modulesServerCompare = modulesServer;
      this.statsServerCompare = statsServer;
      this.missingImportsServerCompare = missingImportsServer;
      this.graphServerCompare = graphServer;
    },
    getVersionedOntologyServer(version: string | null): string {
      return this.getVersionedServer(this.ontologySegment, version);
    },
    getVersionedServer(segment: string, version: string | null): string {
      const configurationStore = useConfigurationStore();
      let result = configurationStore.config.ontoviewerServerUrl;

      if (version !== null) {
        result = result.replace(
          '{version}',
          version,
        );
      } else {
        result = result.replace(
          '{version}/',
          '',
        );
        result = result.replace(
          '{version}',
          '',
        );
      }

      return result + segment;
    }
  },
})
