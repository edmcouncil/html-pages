<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
  </Head>
  <div>
    <div class="container px-0">
      <main>
        <div ref="articleTopElement"></div>
        <article class="full-page">
          <section
            v-for="sectionItem in page"
            :key="sectionItem.id"
            :class="sectionItem.background == 'blank' ? 'blank' : ''"
          >
            <ImageTextSection
              v-if="sectionItem['__component'] == 'sections.image-text-section'"
              :sectionItem="sectionItem"
            />
            <TextSection
              v-else-if="sectionItem['__component'] == 'sections.text-section'"
              :sectionItem="sectionItem"
            />
            <DownloadSection
              v-else-if="
                sectionItem['__component'] == 'sections.download-section'
              "
              :sectionItem="sectionItem"
            />
            <TableListSection
              v-else-if="
                sectionItem['__component'] == 'sections.table-list-section'
              "
              :sectionItem="sectionItem"
            />
            <SerializationListSection
              v-else-if="
                sectionItem['__component'] ==
                  'sections.serialization-list-section'
              "
              :sectionItem="sectionItem"
            />
          </section>
        </article>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { useConfigurationStore } from '~/stores/configuration';
  import { prepareDescription } from '../helpers/meta';
  import { getStrapiElementFromCollection } from '../api/strapi';

  definePageMeta({
    layout: 'minimal',
  });

  const route = useRoute();
  const articleTopElement = ref(null);

  watch(route.path, value => {
    articleTopElement.value.scrollIntoView({
      behavior: 'smooth',
    });
  });

  const configurationStore = useConfigurationStore();
  const page = ref(null);
  const title = ref(null);
  const description = ref(null);

  try {
    const slugName = route.params.slug.toLowerCase();

    const { data } = await useAsyncData(`get${slugName}`, () => {
      const populateParams = [
        'sections',
        'sections.items',
        'sections.items.image',
      ];
      return getStrapiElementFromCollection(
          'pages',
          populateParams,
          slugName,
        );
    });
    page.value = data?.value?.data?.[0]?.attributes?.sections;
    title.value = data?.value?.data?.[0]?.attributes?.title || configurationStore.config.ontpubFamily;
    description.value = prepareDescription(
        data?.value?.data?.[0]?.attributes?.sections?.[0]?.text_content ?? '',
      );
  } catch (e) {
    title.value = configurationStore.config.ontpubFamily;
    console.error(e);
    throw createError({ statusCode: 503, message: 'Service Unavailable' });
  }
</script>

<style lang="scss" scoped>
section {
  overflow: visible;
  margin-bottom: 10px;
  h2 {
    position: relative;
  }
}
</style>
