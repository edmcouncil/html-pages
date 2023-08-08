<template>
  <div>
    <h1 v-if="sectionItem.title">{{ sectionItem.title }}</h1>
    <div v-for="item in sectionItem.items" :key="item.id">
      <h2 v-if="item.subheading">{{ item.subheading }}</h2>
      <div
        class="image-text-content-container"
        :class="{
          left: item.image_align === 'left',
          right: item.image_align === 'right',
          center: item.image_align === 'center',
        }"
      >
        <div v-if="getImageUrl(item) != 'undefined'" class="image-container">
          <img :src="getImageUrl(item)" class="transparent-image" alt="" />
          <p v-if="item.image_description" class="muted small">
            {{ item.image_description }}
          </p>
        </div>
        <div
          class="text-content"
          v-html="$md.render(item.text_content || '')"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageTextSection',
  props: ['sectionItem'],
  methods: {
    getImageUrl(item) {
      const strapiUrl = process.env.strapiBasePath;
      const location = item?.image?.data?.attributes?.url;
      if (location === undefined) {
        return 'undefined';
      }
      if (location.includes('_nuxt') && location.includes('downloads')) {
        return location;
      }
      return strapiUrl + location;
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
h1, h2 {
  max-width: 800px;
}
.image-text-content-container {
  margin-bottom: 60px;
  display: flex;

  .text-content {
    max-width: 800px;
  }

  .image-container {
    width: 100%;
    max-width: 460px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      padding: 30px;
      width: calc(100% - 60px);
    }
    p {
      margin-top: -15px;
      padding: 0px 30px 30px 30px;
    }
  }

  &.left {
    .text-content {
      padding-left: 45px;
    }
  }

  &.right {
    flex-direction: row-reverse;
    justify-content: flex-end;

    .text-content {
      padding-right: 45px;
      flex: 1;
    }
  }

  &.center {
    flex-direction: column;
    align-items: flex-start;

    .image-container {
      max-width: 800px;

      img {
        padding: 30px 0;
        width: 100%;
      }
    }
    .text-content {
      width: 100%;
    }
  }
}
.image-text-content-container:last-child {
  margin-bottom: 0;
}

@media (max-width: 1199px) {
  section .image-text-content-container {
    flex-direction: column !important;
    align-items: center;
    .image-container {
      max-width: 70%;
    }
    .text-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
      width: 100%;
    }
  }
}

@media (max-width: 575px) {
  section .image-text-content-container {
    .image-container {
      max-width: 100%;
    }
  }
}
</style>
