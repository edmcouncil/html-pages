<template>
  <div>
    <div class="container">
      <main>
        <div ref="article-top-element"></div>
        <article class="full-page">
          <section
            v-for="sectionItem in page"
            :key="sectionItem.id"
            :class="sectionItem.type == 'download' ? 'blank' : ''"
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
import { getStrapiSingleType, getStrapiCollection } from "../api/strapi";

export default {
  extends: helpers,
  name: "PageView",
  components: {},
  methods: {
    outboundClick,
    outboundLinkClick,
    visit(url) {
      this.outboundClick(url);
      const aElement = document.createElement("a");
      aElement.setAttribute("href", url);
      aElement.setAttribute("target", "_blank");
      aElement.style.display = "none";
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    },
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
      const response = await getStrapiCollection(
        "pages",
        populateParams,
        slugName
      );

      return {
        page: response.data.data[0].attributes.sections,
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

  .subsection {
    margin-bottom: 60px;
    text-align: justify;
    display: flex;

    .image-container {
      width: 100%;
      max-width: 460px;
      flex-shrink: 0;
    }

    .text-content {
      padding-left: 45px;
    }
  }

  .subsection:last-child {
    margin-bottom: 0;
  }
}

.transparent-image {
  margin: 30px;
  width: calc(100% - 60px);
}

.filled-image {
  margin: 30px;
  width: calc(100% - 60px);
  box-shadow: 0px 0px 60px 60px white;
}

@media (max-width: 1199px) {
  section .subsection {
    flex-direction: column;
    align-items: center;

    .image-container {
      max-width: 70%;
    }

    .text-content {
      padding-left: 0;
    }
  }
}

@media (max-width: 575px) {
  section .subsection {
    .image-container {
      max-width: 100%;
    }
  }
}
</style>
