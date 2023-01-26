<template>
  <div>
    <div class="container px-0">
      <main>
        <div ref="article-top-element"></div>
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
              v-else-if="sectionItem['__component'] == 'sections.download-section'"
              :sectionItem="sectionItem"
            />
            <TableListSection
              v-else-if="sectionItem['__component'] == 'sections.table-list-section'"
              :sectionItem="sectionItem"
            />
            <SerializationListSection
              v-else-if="sectionItem['__component'] == 'sections.serialization-list-section'"
              :sectionItem="sectionItem"
            />
          </section>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import { prepareDescription } from "../../helpers/meta";
import { getStrapiElementFromCollection } from "../../api/strapi";

export default {
  name: "PageView",
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
    }
  },
  scrollToTop: false,
  mounted() {
    const scrollTopElement = this.$refs["article-top-element"];
    scrollTopElement.scrollIntoView({
      behavior: "smooth",
    });
  },
  async asyncData({ params, error }) {
    const slugName = params.slug.toLowerCase();
    const populateParams = ["sections", "sections.items", "sections.items.image"];

    try {
      const response = await getStrapiElementFromCollection(
        "pages",
        populateParams,
        slugName
      );

      if(response?.data?.data?.[0]?.attributes?.sections == null)
      {
        console.error(`Page data(sections) is not recognized in the response from the server.
        Error occurred while rendering page ${slugName}.\n
        Current server response:\n`, response);
        error({ statusCode: 503, message: "Service Unavailable" });
      }

      const title = response?.data?.data?.[0]?.attributes?.title || process.env.VUE_ONTOLOGY_NAME;
      const description = prepareDescription(response?.data?.data?.[0]?.attributes?.sections?.[0]?.text_content ?? "");
      return {
        page: response?.data?.data?.[0]?.attributes?.sections,
        title: title,
        description: description
      };
    } catch (e) {
      console.error(e);
      error({ statusCode: 503, message: "Service Unavailable" });
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
