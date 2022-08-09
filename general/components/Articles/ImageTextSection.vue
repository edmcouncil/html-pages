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
        <div v-if="getImageUrl(item)!='undefined'" class="image-container">
          <img :src="getImageUrl(item)" class="transparent-image" />
          <p v-if="item.image_description" class="muted small">
            {{ item.image_description }}
          </p>
        </div>
        <div class="text-content" v-html="$md.render(item.text_content || '')"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageTextSection',
  props: [ 'sectionItem' ],
  methods: {
    getImageUrl(item) {
      const strapiUrl = process.env.strapiBaseUri;
      const location = item?.image?.data?.attributes?.url
      if(location == 'undefined'){
        return 'undefined';
      }
      return strapiUrl + location;
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.image-text-content-container {
  margin-bottom: 60px;
  text-align: justify;
  display: flex;
  .image-container {
    width: 100%;
    max-width: 460px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin: 30px;
      width: calc(100% - 60px);
      // background: white;
      // box-shadow: 0px 0px 60px 60px white;
    }
    p {
      padding: 30px;
    }
  }
  .text-content {
    padding-left: 45px;
  }

  &.right {
    flex-direction: row-reverse;
  }

  &.center {
    flex-direction: column;
    align-items: center;

    .image-container {
      max-width: 885px;
    }
  }
}
.image-text-content-container:last-child {
  margin-bottom: 0;
}

@media (max-width: 1199px) {
  section .image-text-content-container {
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
  section .image-text-content-container {
    .image-container {
      max-width: 100%;
    }
  }
}
</style>
