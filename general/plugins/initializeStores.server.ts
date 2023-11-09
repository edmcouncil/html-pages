import { defineNuxtPlugin } from '#app';
import { useConfigurationStore } from '@/stores/configuration';
import { useContentStore } from '@/stores/content';

export default defineNuxtPlugin(async (nuxtApp: any) => {
  const runtimeConfig = useRuntimeConfig();
  const configurationStore = useConfigurationStore(nuxtApp.$pinia);
  const contentStore = useContentStore(nuxtApp.$pinia);

  await configurationStore.initialize(runtimeConfig);
  await contentStore.initialize(runtimeConfig);
})
