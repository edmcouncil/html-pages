<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { useConfigurationStore } from '@/stores/configuration';
  import { useContentStore } from '@/stores/content';

  const runtimeConfig = useRuntimeConfig();
  const configurationStore = useConfigurationStore();
  const contentStore = useContentStore();

  await configurationStore.initialize(runtimeConfig);
  await contentStore.initialize(runtimeConfig);
</script>
