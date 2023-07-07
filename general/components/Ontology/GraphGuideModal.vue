<template>
  <b-modal :id="modalId" modal-class="help" size="lg" centered scrollable>
    <template v-slot:modal-header>
      <div
        type="button"
        class="close-btn"
        data-dismiss="modal"
        aria-label="Close"
        @click="$emit('returnEvent')"
      ></div>
      <h5 class="modal-title">
        <slot name="label"></slot>
      </h5>
    </template>
    <template v-slot:modal-footer>
      <div class="left">
        <slot name="footer-left"></slot>
      </div>
      <div class="right">
        <button class="btn normal-button small" @click="$emit('closeEvent')">
          Close
        </button>
      </div>
    </template>
    <slot name="content"></slot>
  </b-modal>
</template>

<script>
export default {
  name: 'GraphGuideModal',
  props: ['modalId'],
};
</script>

<style lang="scss" scoped>
.normal-button.small {
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 0px 10px 10px 0px !important;
}

.modal.help {
  .modal-header {
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border: none;
    padding: 18px 30px;

    justify-content: start;

    .close-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 24px;
      height: 30px;
      padding: 0;
      margin-right: 20px;

      &::before {
        content: "";
        background-image: url("../../assets/icons/return-arrow.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    h5.modal-title {
      font-style: normal;
      font-weight: normal;
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
    padding: 15px 30px;
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
    padding: 18px 30px;

    justify-content: space-between;

    .normal-button.small {
      margin-bottom: 0 !important;
    }
  }
}
</style>
