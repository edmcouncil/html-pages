import { defineStore } from 'pinia';
import { useServersStore } from './servers';
import { useConfigurationStore } from './configuration';
import { getEntity } from '~/api/ontology';

export const useOntologyStore = defineStore({
  id: 'ontology-store',
  state: () => {
    return {
      iri: '' as string,
      entityData: {} as Record<string, any>,
      releases: [] as (string | null)[],
    }
  },
  actions: {
    async getEntityData(version: string | null, iri: string): Promise<any> {
      if (this.iri !== iri) {
        this.clearData();
        this.iri = iri;
      }
      const configuration = useConfigurationStore();
      let versionIdentifier: string = version ? version : configuration.config.defaultBranchName;

      if (
        this.entityData[versionIdentifier]
        || this.entityData[versionIdentifier] === null
      ) {
        return this.entityData[versionIdentifier];
      } else {
        const data = await this.fetchData(version, iri);
        this.entityData[versionIdentifier] = data;
        return this.entityData[versionIdentifier];
      }

    },
    async fetchData(version: string | null, iri: string): Promise<any> {
      const servers = useServersStore();
      const configuration = useConfigurationStore();
      try {
        const versionIdentifier = version === configuration.config.defaultBranchName ? null : version;
        const domain = `${servers.getVersionedOntologyServer(versionIdentifier)}?iri=${iri}`;
        const response = await getEntity(domain);

        if (response.ok) {
          return await response.json();
        } else {
          return null;
        }
      } catch (error) {
        // Resource doesn't exist in this version
        return null;
      }
    },
    async preloadEntityData(iri: string): Promise<void> {
      const promises = this.releases.map(release => this.getEntityData(release, iri));
      await Promise.all(promises);
    },
    async initialEntityLoad(version: string | null, iri: string): Promise<any> {
      if (this.releases.length)
        this.preloadEntityData(iri);

      return await this.getEntityData(version, iri);
    },
    setReleases(releases: (string | null)[]) {
      this.releases = releases;
    },
    clearData(): void {
      this.entityData = {};
    }
  },
})
