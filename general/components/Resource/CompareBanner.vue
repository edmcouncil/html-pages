<template>
  <div class="compare-banner sticky-top">
    <div class="device-specific d-block d-lg-none">
      <p>Version comparing feature is only supported on desktop.</p>
      <p>Please refresh the app.</p>
    </div>
    <div class="row d-none d-lg-flex">
      <div class="col-2 title">Comparing</div>
      <div class="col-5 version-name left">{{ version || "current" }}</div>
      <div class="col-5 version-name right">
        {{ versionCompare || "current" }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useServersStore } from '@/stores/servers';

export default {
  name: 'CompareBanner',
  computed: {
    ...mapState(useServersStore, {
      version: store => store.version,
      versionCompare: store => store.versionCompare,
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
    padding: 25px 20px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 18px;
    background: rgb(255, 255, 255);
    border-right: 2px solid rgba(0, 0, 0, 0.05);
  }

  .version-name {
    padding: 25px 20px;
    text-align: center;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
    background: rgb(255, 255, 255);

    &.right {
      border-left: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
}

.device-specific {
  padding: 25px 20px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  background: rgb(255, 255, 255);
  border-right: 2px solid rgba(0, 0, 0, 0.05);
}

@media (max-width: 991px) {
  .compare-banner {
    margin: 60px 30px;
  }
}

@media (max-width: 1254px) {
  .compare-banner {
    .title {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      background: rgb(255, 255, 255);
      border-right: 2px solid rgba(0, 0, 0, 0.05);
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .version-name {
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
      background: rgb(255, 255, 255);

      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
