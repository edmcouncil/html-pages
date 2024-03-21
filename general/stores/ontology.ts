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
      releases: [] as Array<string | null>,
      errorFlags: {} as Record<string, boolean>
    };
  },
  actions: {
    async getEntityData(version: string | null, iri: string): Promise<any> {
      if (this.iri !== iri) {
        this.clearData();
        this.iri = iri;
      }
      const configuration = useConfigurationStore();
      const versionIdentifier: string = version
        ? version
        : configuration.config.defaultBranchName;

      if (
        this.entityData[versionIdentifier] ||
        this.entityData[versionIdentifier] === null
      ) {
        return this.entityData[versionIdentifier];
      } else {
        const data = await this.fetchEntityData(versionIdentifier, iri);
        this.entityData[versionIdentifier] = data;
        return this.entityData[versionIdentifier];
      }
    },
    async fetchEntityData(
      versionIdentifier: string,
      iri: string
    ): Promise<any> {
      const servers = useServersStore();
      const configuration = useConfigurationStore();
      try {
        const version =
          versionIdentifier === configuration.config.defaultBranchName
            ? null
            : versionIdentifier;
        const domain = `${servers.getVersionedOntologyServer(version)}?iri=${iri}`;
        const response = await getEntity(domain);

        if (response.ok) {
          this.errorFlags[versionIdentifier] = false;
          return await response.json();
        } else {
          this.errorFlags[versionIdentifier] = true;
          return null;
        }
      } catch (error: any) {
        if (error.status == 404) {
          // Resource doesn't exist in this version
          this.errorFlags[versionIdentifier] = false;
          return null;
        } else if (error.status == 503) {
          // Server error
          this.errorFlags[versionIdentifier] = true;
          return null;
        }
      }
    },
    async preloadEntityData(iri: string): Promise<void> {
      const promises = this.releases.map((release) =>
        this.getEntityData(release, iri)
      );
      await Promise.all(promises);
    },
    async initialEntityLoad(version: string | null, iri: string): Promise<any> {
      if (this.releases.length) await this.preloadEntityData(iri);

      return await this.getEntityData(version, iri);
    },
    clearData(): void {
      this.entityData = {};
    },
    setReleases(releases: Array<string | null>) {
      this.releases = releases;
    },
    getErrorFlags(): Record<string, boolean> {
      return this.errorFlags;
    }
  }
});
