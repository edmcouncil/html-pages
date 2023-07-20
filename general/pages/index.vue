<template>
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

<script>
import { prepareDescription } from '../helpers/meta';
import { getStrapiSingleType } from '../api/strapi';

export default {
  name: 'AboutView',
  components: {},
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
      ],
    };
  },
  async asyncData({ error }) {
    const singleTypeName = 'about';
    const populateParams = [
      'sections',
      'sections.items',
      'sections.items.image',
    ];

    try {
      const response = await getStrapiSingleType(
        singleTypeName,
        populateParams,
      );
      if (response?.data?.data?.attributes?.sections == null) {
        console.error(
          `Page data(sections) is not recognized in the response from the server.
        Error occurred while rendering page ${singleTypeName}.\n
        Current server response:\n`,
          response,
        );
        error({ statusCode: 503, message: 'Service Unavailable' });
      }

      const title = response?.data?.data?.attributes?.sections?.[0]?.title
        ?? process.env.VUE_ONTOLOGY_NAME;
      const description = prepareDescription(
        response?.data?.data?.attributes?.sections?.[0]?.items?.[0]
          ?.text_content ?? '',
      );

      return {
        page: response?.data?.data?.attributes?.sections,
        title,
        description,
      };
    } catch (e) {
      console.error(e);
      error({ statusCode: 503, message: 'Service Unavailable' });
    }
  },
};
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
