<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
  //  Initialize stores
  import { useConfigurationStore } from './stores/configuration';
  import { useContentStore } from './stores/content';

  const configurationStore = useConfigurationStore();
  const contentStore = useContentStore();
  const runtimeConfig = useRuntimeConfig();

  await useAsyncData('config', () => configurationStore.initialize(runtimeConfig));
  await useAsyncData('content', () => contentStore.initialize(runtimeConfig));
</script>
