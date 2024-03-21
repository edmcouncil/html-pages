<template>
  <Head>
    <Meta name="description" :content="description" />
  </Head>
  <div>
    <div class="container px-0">
      <main>
        <article class="full-page">
          <section
            v-for="sectionItem in page"
            :key="sectionItem.id"
            :class="sectionItem.background == 'blank' ? 'blank' : ''"
          >
            <ImageTextSection
              v-if="sectionItem['__component'] == 'sections.image-text-section'"
              :section-item="sectionItem"
            />
            <TextSection
              v-else-if="sectionItem['__component'] == 'sections.text-section'"
              :section-item="sectionItem"
            />
            <DownloadSection
              v-else-if="
                sectionItem['__component'] == 'sections.download-section'
              "
              :section-item="sectionItem"
            />
            <TableListSection
              v-else-if="
                sectionItem['__component'] == 'sections.table-list-section'
              "
              :section-item="sectionItem"
            />
            <SerializationListSection
              v-else-if="
                sectionItem['__component'] ==
                'sections.serialization-list-section'
              "
              :section-item="sectionItem"
            />
          </section>
        </article>
      </main>
    </div>
  </div>
</template>

<script setup>
import { prepareDescription } from '../helpers/meta';
import { getStrapiSingleType } from '../api/strapi';

const singleTypeName = 'about';
const populateParams = ['sections', 'sections.items', 'sections.items.image'];

const runtimeConfig = useRuntimeConfig();

const { data } = await useAsyncData('getAbout', () => {
  return getStrapiSingleType(singleTypeName, populateParams, runtimeConfig);
});
const page = data?.value?.data?.attributes?.sections;
const description = prepareDescription(page[0]?.text_content ?? '');
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
  margin-bottom: 10px;
  h2 {
    position: relative;
  }
}
</style>
