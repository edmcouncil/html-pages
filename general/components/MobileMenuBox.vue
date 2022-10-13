<template>
  <div class="mobile-multiselect-container multiselect-container outside-modal">
    <div class="menu-box" @click="toggleModal()">
      <div class="menu-box__label">
        <slot name="label"></slot>
      </div>

      <div class="menu-box__content-text">
        <div ref="outsideTarget">
          <slot name="multiselect"></slot>
        </div>
        <slot name="textOnly"></slot>
      </div>

      <div class="menu-box__icons">
        <div class="menu-box__icons__icon" :class="icon"></div>
      </div>
    </div>

    <b-modal :header-class="noMultiselect ? '' : 'no-shadow'" no-fade v-model="showModal" footer-class="mobile-modal-footer">
      <template v-slot:modal-header>
        <div
          type="button"
          class="close-btn"
          data-dismiss="modal"
          aria-label="Close"
          v-on:click="hideModal()"
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
          class="
            mobile-multiselect-container
            multiselect-container
            inside-modal
          "
        >
          <div class="menu-box">
            <div class="menu-box__content-text" ref="modalTarget"></div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "MobileModal",
  props: [ 'icon' ],
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    hideModal() {
      if (!this.noMultiselect)
        this.$refs.outsideTarget.appendChild(this.$refs.modalTarget?.firstChild);

      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
      if (this.noMultiselect)
        return

      this.$nextTick(() => {
        this.$refs.modalTarget.appendChild(this.$refs.outsideTarget?.firstChild);
      });

    },
    toggleModal() {
      if (this.showModal)
        this.hideModal();
      else
        this.openModal();
    }
  },
  computed: {
    noMultiselect() {
      return !this.$slots.multiselect;
    }
  },
}
</script>

<style lang="scss">
.modal-header.no-shadow {
  box-shadow: none!important;
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
    background: map-get($colors-map, "black-40");
  }

  &::-webkit-scrollbar-thumb {
    background: map-get($colors-map, "black-80");
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
      background: map-get($colors-map, "black-40");
    }

    &::-webkit-scrollbar-thumb {
      background: map-get($colors-map, "black-80");
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
        background: map-get($colors-map, "black-40");
      }

      &::-webkit-scrollbar-thumb {
        background: map-get($colors-map, "black-80");
      }
    }
  }

  .search-box .multiselect .multiselect__spinner {
    margin-top: -5px;
    background: transparent;
  }
  .search-box .multiselect .multiselect__clear {
    top: 3px;
  }
  .search-box .mobile-search-icon {
    z-index: 1000;
    position: absolute;
    right: 39px;
    top: 18px;
    width: 24px;
    height: 24px;
    background-image: url("@/assets/icons/search.svg");
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
</style>
