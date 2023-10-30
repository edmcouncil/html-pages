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

  await useAsyncData('configuration', () => configurationStore.initialize());
  await useAsyncData('content', () => contentStore.initialize());
</script>
