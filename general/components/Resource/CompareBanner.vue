<template>
  <div class="compare-banner sticky-top" :class="{ shadowVisible: isShadowVisible }" ref="banner">
    <div class="row">
      <div class="col-2 title">Comparing</div>
      <div class="col-5 version-name left">current</div>
      <div class="col-5 version-name right">v1.0.1</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompareBanner",
  data() {
    return {
      scrollY: 0,
      bannerY: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
      this.bannerY = this.$refs.banner.scrollTop;
      console.log(
        'document', this.scrollY,
      )
      console.log(
        'banner', this.bannerY,
      )
    },
  },
  computed: {
    isShadowVisible() {
        return this.scrollY > this.bannerY;
    }
  },
};
</script>

<style lang="scss">
.compare-banner {
  margin-top: 30px;

  font-style: normal;
  font-size: 18px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.8);
  text-overflow: ellipsis;
  transition: box-shadow 0.3s;

  z-index: 40;

  &.shadowVisible {
    box-shadow: 0px 5px 20px #07539526;
  }

  .title {
    padding: 30px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 18px;
    background: rgb(255, 255, 255);
    border-right: 2px solid rgba(0, 0, 0, 0.05);
  }

  .version-name {
    padding: 30px;
    text-align: center;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
    background: rgb(255, 255, 255);

    &.right {
      border-left: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
