<template>
  <bs-modal
    :id="modalId"
    modal-class="help modal-lg"
    footer-class="d-none"
    scrollable
    second-level
  >
    <template #modal-header>
      <h5 class="modal-title">
        <slot name="label"></slot>
      </h5>
      <div
        type="button"
        class="close-btn"
        data-dismiss="modal"
        aria-label="Close"
        @click="$emit('closeEvent')"
        @keydown="$emit('closeEvent')"
      ></div>
    </template>
    <slot name="content"></slot>
  </bs-modal>
</template>

<script>
export default {
  name: 'GraphGuideModal',
  props: ['modalId'],
  emits: ['closeEvent']
};
</script>

<style lang="scss">
.modal.help {
  article .img-zoom {
    max-width: 70%;
    height: 250px;
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    margin: 30px 0;
    overflow: hidden;

    div.img-zoom__content {
      background-size: cover;
      width: 100%;
      height: 100%;
      transition: transform 0.5s;

      &:hover {
        transform: scale(2);
      }

      &.basics-0 {
        background-image: url('../../assets/img/graph-guide-basics-0.png');
      }

      &.basics-1 {
        background-image: url('../../assets/img/graph-guide-basics-1.png');
      }

      &.basics-2 {
        background-image: url('../../assets/img/graph-guide-basics-2.png');
      }

      &.basics-3 {
        background-image: url('../../assets/img/graph-guide-basics-3.png');
      }

      &.basics-4 {
        background-position: right;
        background-image: url('../../assets/img/graph-guide-basics-4.png');
      }

      &.layouts-0 {
        background-image: url('../../assets/img/graph-guide-layouts-0.png');
      }

      &.connections-class-specific {
        background-image: url('../../assets/img/graph-guide-connections-class-specific.png');
      }

      &.connections-inherited {
        background-image: url('../../assets/img/graph-guide-connections-inherited.png');
      }

      &.connections-optional {
        background-image: url('../../assets/img/graph-guide-connections-optional.png');
      }

      &.connections-required {
        background-image: url('../../assets/img/graph-guide-connections-required.png');
      }

      &.layouts-tree {
        background-image: url('../../assets/img/graph-guide-layouts-tree.png');
      }

      &.layouts-tree-cluster {
        background-image: url('../../assets/img/graph-guide-layouts-tree-cluster.png');
      }

      &.layouts-radial {
        background-image: url('../../assets/img/graph-guide-layouts-radial.png');
      }

      &.layouts-radial-cluster {
        background-image: url('../../assets/img/graph-guide-layouts-radial-cluster.png');
      }

      &.layouts-force {
        background-image: url('../../assets/img/graph-guide-layouts-force.png');
      }

      &.sort-0 {
        background-image: url('../../assets/img/graph-guide-sort-0.png');
      }

      &.sort-1 {
        background-image: url('../../assets/img/graph-guide-sort-1.png');
      }

      &.sort-2 {
        background-image: url('../../assets/img/graph-guide-sort-2.png');
      }

      &.sort-3 {
        background-image: url('../../assets/img/graph-guide-sort-3.png');
      }

      &.layouts-tree-cluster {
        background-image: url('../../assets/img/graph-guide-layouts-tree-cluster.png');
      }

      &.configuration-0 {
        background-position: right bottom;
        background-image: url('../../assets/img/graph-guide-configuration-0.png');
      }

      &.configuration-1 {
        background-position: right bottom;
        background-image: url('../../assets/img/graph-guide-configuration-1.png');
      }
    }
  }

  article {
    .see-also-box {
      background: map-get($colors-map, 'black-5');
      margin-bottom: 60px;
      padding: 30px;
      border-radius: 2px;

      p {
        margin: 0;
      }
    }

    h2 {
      margin-top: 40px;
      margin-bottom: 30px;
    }
  }

  .modal-header {
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border: none;
    padding: 15px 30px;

    justify-content: space-between;

    .close-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 24px;
      height: 30px;
      padding: 0;
      margin-left: 20px;

      &::before {
        content: '';
        background-image: url('../../assets/icons/close.svg');
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    h5.modal-title {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: #000000;

      padding: 0;
      margin: 0;
      position: relative;
    }
  }
  .modal-content {
    border-radius: 2px;
    border: none;
    background: white;
  }
  .modal-body {
    padding: 0px 30px;
    height: 100%;
    position: relative;

    .collapsible-section {
      width: 100%;
      background: rgb(242, 242, 242);
      z-index: 1;
      .collapsible-section-title {
        padding: 20px 0px;
      }
    }
  }
  .modal-footer {
    border: none;
    box-shadow: 0px -5px 20px -5px rgba(8, 84, 150, 0.15);
    padding: 15px 30px;

    justify-content: space-between;

    .normal-button.small {
      margin-bottom: 0 !important;
    }
  }
}
</style>
