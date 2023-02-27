<template>
  <div class="compare-banner sticky-top">
    <div class="row">
      <div class="col-2 title">Comparing</div>
      <div class="col-5 version-name left">{{ version || "current" }}</div>
      <div class="col-5 version-name right">{{ versionCompare || "current" }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CompareBanner",
  mounted() {
    console.log(this.version, this.versionCompare)
  },
  computed: {
    ...mapState({
      version: (state) => state.servers.version,
      versionCompare: (state) => state.servers.versionCompare,
    }),
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
  box-shadow: 0px 5px 20px #07539526;

  top: -1px;

  z-index: 40;

  .title {
    padding: 25px 30px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 18px;
    background: rgb(255, 255, 255);
    border-right: 2px solid rgba(0, 0, 0, 0.05);
  }

  .version-name {
    padding: 25px 30px;
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
