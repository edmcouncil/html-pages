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
            <div v-if="sectionItem.type == 'text'">
              <div
                v-for="item in sectionItem.items"
                :key="item.id"
                v-html="$md.render(item.text)"
              ></div>
            </div>
            <div v-else-if="sectionItem.type == 'image_text'">
              <div class="subsection">
                <div v-for="item in sectionItem.items" :key="item.id">
                  <div class="image-container">
                    <img
                      :src="require(`~/assets/img/${item.img_name}`)"
                      class="transparent-image"
                    />
                  </div>
                  <div class="text-content">
                    <p v-html="$md.render(item.text)"></p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="sectionItem.type == 'download'">
              <div v-html="$md.render(sectionItem.text)"></div>
              <button
                class="normal-button"
                @click="visit(sectionItem.button.url)"
              >
                {{ sectionItem.button.text }}
              </button>
            </div>
          </section>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import helpers from "../../store/helpers.js";
import { outboundClick, outboundLinkClick } from "../../helpers/ga";
import { getStrapiData, getPageElementsStrapiData } from "../../api/strapi";

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
    const scrollTopElement = this.$refs['article-top-element'];
    scrollTopElement.scrollIntoView({
        behavior: "smooth"
    });
  },
  async asyncData({ params, error }) {
    var collectionName = params.page.toLowerCase();
    var populateParams = ["content", "content.items", "content.button"];

    try {
      const response = await getStrapiData(collectionName, populateParams);
      return {
        page: response.data.data.attributes.content,
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
