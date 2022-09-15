<template>
  <div class="expandable">
    <div class="expandable__title" @click="isExpanded = !isExpanded">
      <div
        class="expandable__title__icon"
        :class="{ expanded: isExpanded }"
      ></div>
      <div class="expandable__title__text">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="expandable__content" v-if="isExpanded">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeExpandable',
  props: [ 'defaultExpanded' ],
  data() {
    return {
      isExpanded: this.defaultExpanded || false,
    }
  }
}
</script>

<style scoped lang="scss">
.expandable {
  border-radius: 2px;
  margin: 10px 0;

  .expandable__content {
    margin-left: 32px;
  }

  .expandable__title {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    user-select: none;

    .expandable__title__icon {
      width: 24px;
      height: 24px;

      margin-right: 10px;

      background-image: url("../../assets/icons/arrow.svg");
      background-position: center;

      &.expanded {
        transform: rotate(90deg);
      }
    }

    .expandable__title__text {
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
