<template>
  <Head>
    <Title>Release Notes</Title>
  </Head>
  <div class="container px-0">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <span class="text-display"
            >{{ ontologyNameUppercase }} Release Notes</span
          >
        </section>

        <div class="release-content">
          <div class="left">
            <div class="left-content">
              <div class="release-tree-title">
                <div class="release-tree-title__subtitle">Choose version</div>
                <div class="release-tree-title__content">
                  {{ ontologyNameUppercase }} Releases
                </div>
              </div>
              <TreeExpandable
                v-for="(releaseTreeGroupKey, index) in releaseTree.keys()"
                :key="releaseTreeGroupKey"
                :default-expanded="index == 0 ? true : false"
              >
                <template #title>
                  <p class="title" v-html="releaseTreeGroupKey"></p>
                </template>
                <template #content>
                  <ul>
                    <li
                      v-for="item in releaseTree.get(releaseTreeGroupKey)"
                      :key="item.title"
                    >
                      <a
                        :href="'release-notes#' + item.tag"
                        @click="expandNotes"
                        v-html="item.title"
                      ></a>
                    </li>
                  </ul>
                </template>
              </TreeExpandable>
            </div>
          </div>

          <div class="right">
            <section :id="topRelease.tag" class="blank">
              <h1>{{ topRelease.title || '' }}</h1>
              <div v-html="$md.render(topRelease.content || '')"></div>
            </section>

            <LongContentCollapse
              ref="longContentCollapse"
              :collapsed-text="'Show more notes'"
            >
              <section
                v-for="(item, index) in releaseList"
                :id="item.tag"
                :key="index"
                class="blank"
              >
                <h1>{{ item.title || '' }}</h1>
                <div v-html="$md.render(item.content || '')"></div>
              </section>
            </LongContentCollapse>
          </div>
        </div>
      </article>
    </main>
    <button
      ref="topButton"
      class="top-button"
      title="Go to top"
      @click="topBtnClick"
    ></button>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useConfigurationStore } from '@/stores/configuration';
import { getStrapiCollection } from '../api/strapi';

export default {
  name: 'ReleaseNotes',
  async setup() {
    definePageMeta({
      layout: 'minimal'
    });

    const collectionTypeName = 'release-notes';
    const sortParams = ['title:desc'];

    try {
      const runtimeConfig = useRuntimeConfig();

      const response = await useAsyncData(`getReleaseNotes`, () => {
        return getStrapiCollection(
          collectionTypeName,
          [],
          sortParams,
          runtimeConfig
        );
      });

      if (response?.data?.value?.data == null) {
        console.error(
          `Page data(sections) is not recognized in the response from the server.
        Error occurred while rendering page ${collectionTypeName}.\n
        Current server response:\n`,
          response
        );
        // error({ statusCode: 503, message: 'Service Unavailable' });
      }

      const responseData = response.data.value.data;
      const releaseTree = new Map();
      const releaseList = [];
      for (const releaseItem of responseData) {
        const itemData = releaseItem.attributes;
        const titleSplit = itemData.title.split(' ');
        const releaseYear = titleSplit[0];
        const releaseTag = titleSplit.join('');

        // release tree
        const treeItem = releaseTree.has(releaseYear)
          ? releaseTree.get(releaseYear)
          : [];
        treeItem.push({ title: itemData.title, tag: releaseTag });
        releaseTree.set(releaseYear, treeItem);

        // release list
        const releaseItemList = itemData;
        releaseItemList.tag = releaseTag;
        releaseList.push(releaseItemList);
      }

      return {
        releaseTree,
        topRelease: releaseList[0] || {},
        releaseList: releaseList.slice(1) || []
      };
    } catch (e) {
      console.error(e);
      // error({ statusCode: 503, message: 'Service Unavailable' });

      return {};
    }
  },
  computed: {
    ...mapState(useConfigurationStore, {
      ontologyNameUppercase: (store) => {
        return store.config.ontpubFamily.toUpperCase();
      }
    })
  },
  mounted() {
    const self = this;
    window.onscroll = function () {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        self.$refs.topButton.style.display = 'block';
      } else {
        self.$refs.topButton.style.display = 'none';
      }
    };
  },
  unmounted() {
    window.onscroll = function () {};
  },
  methods: {
    scrollTop() {
      this.$refs.scrollTopHandler.scrollBackUp();
    },
    topBtnClick() {
      this.scrollTop();
    },
    expandNotes() {
      this.$refs.longContentCollapse.expand();
    }
  }
};
</script>

<style lang="scss" scoped>
article {
  word-wrap: break-word;
}
.top-button {
  &:after {
    content: '↑';
  }
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  width: 60px;
  height: 60px;
  z-index: 99;
  border: none;
  outline: none;
  background-color: black;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 30px;
  font-size: 18px;
}

.release-content {
  padding-top: 60px;
  display: flex;
  gap: 60px;
  .left {
    width: 360px;

    .left-content {
      position: sticky;
      top: 30px;
    }
  }

  .right {
    max-width: 800px;

    .long-content-container section:first-child {
      margin-top: 60px;
    }
  }
}

.release-tree-title {
  padding-left: 30px;
  margin-bottom: 40px;
  cursor: default;

  .release-tree-title__subtitle {
    color: var(--black-40, rgba(0, 0, 0, 0.4));
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.14px;
  }

  .release-tree-title__content {
    color: var(--black-100, #000);
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
  }
}

.top-button:hover {
  background-color: #252525;
}

@media (max-width: 991px) {
  .release-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-top: 15px;
    .left {
      width: auto;
      padding: 0 30px;

      .left-content {
        position: relative;
        top: 0px;
      }

      .release-tree-title {
        padding-left: 30px;
        margin-bottom: 20px;
      }
    }

    .right {
      max-width: unset;
    }
  }
}
</style>
