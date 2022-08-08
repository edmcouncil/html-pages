<template>
  <div>
    <div class="container">
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
import helpers from "../store/helpers.js";
import { outboundClick, outboundLinkClick } from "../helpers/ga";
import { getStrapiSingleType } from "../api/strapi";

export default {
  extends: helpers,
  name: "AboutView",
  components: {},
  methods: {
    outboundClick,
    outboundLinkClick,
  },
  async asyncData({ error }) {
    const singleTypeName = "about";
    const populateParams = ["sections", "sections.items", "sections.items.image"];

    try {
      const response = await getStrapiSingleType(singleTypeName, populateParams);

      return {
        page: response.data.data.attributes.sections,
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
