<template>
  <div class="container px-0">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>FIBO Release Notes</h1>

          <TreeExpandable v-for="(releaseTreeGroupKey, index) in releaseTree.keys()" :key="releaseTreeGroupKey" :defaultExpanded=" index == 0 ? true : false">
            <template #title>
              <p class="title" v-html="releaseTreeGroupKey"></p>
            </template>
            <template #content>
              <ul>
                <li v-for="item in releaseTree.get(releaseTreeGroupKey)" :key="item.title">
                  <a @click="expandNotes" :href="'release-notes#'+item.tag" v-html="item.title"></a>
                </li>
              </ul>
            </template>
          </TreeExpandable>

        </section>

        <section :id="topRelease.tag">
          <h1>{{topRelease.title || ''}}</h1>
          <div v-html="$md.render(topRelease.content || '')"></div>
        </section>

        <LongContentCollapse  :collapsedText="'Show more notes'" ref="longContentCollapse">
          <section v-for="(item, index) in releaseList" :key="index" :id="item.tag">
            <h1>{{item.title || ''}}</h1>
            <div v-html="$md.render(item.content || '')"></div>
          </section>
        </LongContentCollapse>

      </article>
    </main>
    <button
      class="top-button"
      title="Go to top"
      @click="topBtnClick"
      ref="topButton"
    ></button>
  </div>
</template>

<script>
import { getStrapiCollection } from "../api/strapi";

export default {
  name: "ReleaseNotes",
  head(){
    return {
      title: "FIBO Release Notes"
    }
  },
  async asyncData({ error }) {
    const collectionTypeName = "release-notes";
    const sortParams = ["title:desc"];

    try {
      const response = await getStrapiCollection(collectionTypeName, [], sortParams);

      if(response?.data?.data == null)
      {
        console.error(`Page data(sections) is not recognized in the response from the server.
        Error occurred while rendering page ${collectionTypeName}.\n
        Current server response:\n`, response);
        error({ statusCode: 503, message: "Service Unavailable" });
      }

      let responseData = response.data.data;
      let releaseTree = new Map();
      let releaseList = [];
      for (const releaseItem of responseData){
        let itemData = releaseItem.attributes;
        const titleSplit = itemData.title.split(' ');
        const releaseYear = titleSplit[0];
        const releaseTag = titleSplit.join('');

        //release tree
        let treeItem = releaseTree.has(releaseYear) ? releaseTree.get(releaseYear) : [];
        treeItem.push({title: itemData.title, tag: releaseTag})
        releaseTree.set(releaseYear, treeItem);

        //release list
        let releaseItemList = itemData;
        releaseItemList.tag = releaseTag;
        releaseList.push(releaseItemList);

      }

      return {
        releaseTree: releaseTree,
        topRelease: releaseList[0] || {},
        releaseList: releaseList.slice(1) || []
      };
    } catch (e) {
      console.error(e);
      error({ statusCode: 503, message: "Service Unavailable" });
    }
  },
  mounted() {
    const self = this;
    window.onscroll = function () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        self.$refs.topButton.style.display = "block";
      } else {
        self.$refs.topButton.style.display = "none";
      }
    };
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
  },
};
</script>

<style lang="scss" scoped>
.top-button {
  &:after {
    content: "\f077";
    font-family: "Font Awesome 5 Solid";
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

.top-button:hover {
  background-color: #252525;
}
</style>
