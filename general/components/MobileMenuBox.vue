<template>
  <div class="mobile-multiselect-container multiselect-container outside-modal">
    <div class="menu-box" @click="toggleModal()" @keydown="toggleModal()">
      <div class="menu-box__label">
        <slot name="label"></slot>
      </div>

      <div class="menu-box__content-text">
        <div ref="outsideTarget">
          <div>
            <slot name="multiselect"></slot>
          </div>
        </div>
        <slot name="textOnly"></slot>
      </div>

      <div class="menu-box__icons">
        <div class="menu-box__icons__icon" :class="icon"></div>
      </div>
    </div>

    <bs-modal
      :id="id"
      :open="showModal"
      :header-class="noMultiselect ? '' : 'no-shadow'"
      :no-fade="true"
      fullscreen
      modal-class="mobile-menu-box"
      footer-class="mobile-modal-footer"
      @shown="onModalShown()"
    >
      <template #modal-header>
        <div
          type="button"
          class="close-btn"
          data-dismiss="modal"
          aria-label="Close"
          @click="hideModal()"
          @keydown="hideModal()"
        ></div>
        <h5 class="modal-title">
          <slot name="label"></slot>
        </h5>
      </template>
      <div v-if="noMultiselect" class="modal-text-only-content">
        <slot name="textOnlyContent"></slot>
      </div>
      <div v-else class="modal-with-multiselect">
        <div
          class="mobile-multiselect-container multiselect-container inside-modal"
        >
          <div class="menu-box">
            <div ref="modalTarget" class="menu-box__content-text"></div>
          </div>
        </div>
      </div>
    </bs-modal>
  </div>
</template>

<script>
export default {
  name: 'MobileModal',
  props: ['icon', 'id'],
  data() {
    return {
      showModal: false
    };
  },
  computed: {
    noMultiselect() {
      return !this.$slots.multiselect;
    }
  },
  methods: {
    hideModal() {
      if (this.$refs.modalTarget)
        this.$refs.outsideTarget.appendChild(this.$refs.modalTarget.firstChild);
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
      if (this.noMultiselect) return;
    },
    onModalShown() {
      this.$refs.modalTarget?.appendChild(this.$refs.outsideTarget.firstChild);
    },
    toggleModal() {
      if (this.showModal) this.hideModal();
      else this.openModal();
    }
  }
};
</script>

<style lang="scss">
.modal-header.no-shadow {
  box-shadow: none !important;
}
.outside-modal.mobile-multiselect-container {
  padding: 0 30px !important;

  .menu-box {
    cursor: pointer;
  }
  .menu-box__content-text {
    user-select: none;
    pointer-events: none;
  }
}

.mobile-modal-footer {
  display: none;
}

.modules-list--mobile {
  padding: 0 30px;
}

.modal-text-only-content {
  height: 100%;
  overflow-y: scroll;
  background: white;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: map-get($colors-map, 'black-40');
  }

  &::-webkit-scrollbar-thumb {
    background: map-get($colors-map, 'black-80');
  }
}

.modal-with-multiselect {
  height: calc(100vh - 60px);
  position: relative;
}

.inside-modal {
  .menu-box {
    margin-top: 0;

    .menu-box__content-text > * {
      padding: 0;
      margin: 0;
    }
  }
  .multiselect__content-wrapper {
    position: static !important;
    max-height: unset !important;
    overflow-y: scroll;
    display: block !important;
    opacity: 1 !important;
    flex-grow: 1;
    flex-shrink: 0;
    flex: 1;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: map-get($colors-map, 'black-40');
    }

    &::-webkit-scrollbar-thumb {
      background: map-get($colors-map, 'black-80');
    }
  }

  .multiselect {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);

    .multiselect__tags {
      margin-top: 0 !important;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: map-get($colors-map, 'black-40');
      }

      &::-webkit-scrollbar-thumb {
        background: map-get($colors-map, 'black-80');
      }
    }
  }

  .search-box .multiselect .multiselect__spinner {
    margin-top: -5px;
    background: transparent;
  }
  .search-box .multiselect .multiselect__clear {
    top: 0;
    height: 24px;
  }
  .search-box .mobile-search-icon {
    z-index: 1000;
    position: absolute;
    right: 39px;
    top: 34px;
    width: 24px;
    height: 24px;
    background-image: url('@/assets/icons/search.svg');
  }

  .multiselect__select {
    display: none;
  }

  .multiselect__single {
    margin-top: 15px;
  }

  .advanced-search-box--mobile .multiselect__tags {
    min-height: 60px;
    max-height: 30vh;
    overflow: auto;
  }
  .multiselect-container.secondary-column__versions.secondary-column__versions--mobile {
    .multiselect__tags {
      user-select: none;
      pointer-events: none;
    }
  }
}

.modal.fullscreen.mobile-menu-box {
  --bs-modal-border-radius: 0;

  .modal-dialog {
    max-width: unset;
    margin: 0;
  }
  .modal-content {
    border-radius: 0;
    border: none;
    height: 100vh;
    width: 100vw;

    .center-btn {
      position: absolute;
      left: 40px;
      bottom: 40px;
    }
  }

  .modal-header {
    display: flex;
    justify-content: flex-start;
    padding: 18px 30px;

    .close-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 24px;
      height: 24px;
      padding: 0;

      &::before {
        content: '';
        background-image: url('../assets/icons/return-arrow.svg');
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    h5.modal-title {
      color: var(--black-60, rgba(0, 0, 0, 0.6));
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;

      padding: 0;
      margin: 0;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .modal-body {
    background: rgba(0, 0, 0, 0.05);
    padding: 0;
    height: 100%;
    position: relative;
    overflow: hidden;

    .collapsible-section {
      width: 100%;
      background: rgb(242, 242, 242);
      z-index: 1;
      .collapsible-section-title {
        padding: 20px 0px;
      }
    }
  }
}
</style>
