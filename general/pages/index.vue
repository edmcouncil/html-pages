<template>
  <div>
    <div class="container">
      <main>
        <article class="full-page">
          <section
            v-for="sectionItem in page"
            :key="sectionItem.id"
            :class="sectionItem.type == 'download' ? 'blank' : ''"
          >
            <div v-if="sectionItem.type == 'text'">
              <p
                v-for="item in sectionItem.items"
                :key="item.id"
                v-html="$md.render(item.text)"
              ></p>
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
              <p v-html="$md.render(sectionItem.text)"></p>
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
import helpers from "../store/helpers.js";
import { outboundClick, outboundLinkClick } from "../helpers/ga";
import { getStrapiData, getPageElementsStrapiData } from "../api/strapi";

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
  async asyncData({ error }) {
    var collectionName = "about";
    var populateParams = ["sections", "sections.image-text-section"];

    try {
      const response = await getStrapiData(collectionName, populateParams);

      // console.log(response.data.data.attributes.sections)

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
