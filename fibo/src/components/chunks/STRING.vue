<template>
  <div>
    <div v-if="!isShowMore" v-html="lines.join('<br />')" />

    <div v-else>
      <div v-html="lines.slice(0, 6).join('<br />')" />

      <div
        v-show="!isMoreVisible"
        @click.prevent="isMoreVisible = !isMoreVisible"
      >
        <div class="seeMoreBtnString">Show more</div>
        <br />
      </div>

      <div v-show="isMoreVisible" v-html="lines.slice(6).join('<br />')" />

      <div
        v-show="isMoreVisible"
        @click.prevent="isMoreVisible = !isMoreVisible"
      >
        <div class="seeLessBtnString">Show less</div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'STRING',
  props: ['value'],

  data() {
    return {
      lines: this.value.split(/(?:\r\n|\r|\n)/g),
      isShowMore: false,
      isMoreVisible: false,
    };
  },

  mounted() {
    if (this.lines.length > 6) {
      // yes 6, first line is "title"
      this.isShowMore = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.seeMoreBtnString {
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 30px;
  cursor: pointer;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 25px;

  &::before {
    content: "";
    background-image: url("../../assets/icons/triangle-down.svg");
    background-repeat: no-repeat;
    background-size: 24px 24px;

    display: block;
    width: 24px;
    height: 24px;

    margin-right: 6px;
  }
}
.seeLessBtnString {
  cursor: pointer;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 25px;
  font-size: 18px;
  line-height: 30px;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    background-image: url("../../assets/icons/triangle-up.svg");
    background-repeat: no-repeat;
    background-size: 24px 24px;

    display: block;
    width: 24px;
    height: 24px;

    margin-right: 6px;
  }
}

@media (max-width: 768px) {
  .seeMoreBtnString {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    margin-top: 20px;
    &::before {
      content: "";
      background-image: url("../../assets/icons/triangle-down.svg");
      background-repeat: no-repeat;
      background-size: 24px 24px;

      display: block;
      width: 24px;
      height: 24px;
    }
  }
  .seeLessBtnString {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    margin-top: 20px;
    &::before {
      content: "";
      background-image: url("../../assets/icons/triangle-up.svg");
      background-repeat: no-repeat;
      background-size: 24px 24px;

      display: block;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
