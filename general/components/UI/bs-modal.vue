<template>
  <Teleport to="body">
    <div
      class="modal"
      :class="
      [
        modalClass, {
          fade: !noFade,
          'fullscreen': fullscreen
        }]
      "
      :id="correctId"
      :aria-labelledby="correctId + 'Label'"
      aria-hidden="true"
      data-bs-backdrop="static"
      tabindex="-1"
      ref="modalElement"
    >
      <div class="modal-dialog modal-dialog-centered" :class="{'modal-dialog-scrollable': scrollable}">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="modal-header" :class="headerClass"></slot>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" :class="footerClass">
            <slot name="modal-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'bs-modal',
  props: {
    open: Boolean,
    id: String,
    modalClass: String,
    headerClass: String,
    footerClass: String,
    noFade: Boolean,
    scrollable: Boolean,
    fullscreen: Boolean,
  },
  data() {
    return {
      instance: null,
      shownListener: null,
    };
  },
  methods: {
    onShown() {
      this.$emit('shown');
      if (this.open) {
        this.instance.show();
      } 
      else {
        this.instance.hide();
      }
    },
    onHidden() {
      this.$emit('hidden');
      if (this.open) {
        this.instance.show();
      } 
      else {
        this.instance.hide();
      }
    },
    destroyModal() {
      this.instance.dispose();
      window.document.body.classList.remove('modal-open');
      window.document.getElementsByClassName('modal-backdrop').remove();
    }
  },
  mounted() {
    const { $bootstrap } = useNuxtApp();
    const element = this.$refs.modalElement;
    this.instance = new $bootstrap.Modal(element);
    this.shownListener = element.addEventListener('shown.bs.modal', this.onShown);
    this.hiddenListener = element.addEventListener('hidden.bs.modal', this.onHidden);

    if (this.open)
      this.instance.show();
    else
      this.instance.hide();
  },
  beforeUnmount() {
    this.instance.dispose();
    if (window) {
      window.document.body.classList.remove('modal-open');
      window.document.body.style = '';
    }
    const element = this.$refs.modalElement;
    element.removeEventListener('shown.bs.modal', this.onShown);
    element.removeEventListener('hidden.bs.modal', this.onHidden);
  },
  watch: {
    async open(newValue) {
      if (newValue) {
        await nextTick();
        this.instance.show();
      } 
      else {
        this.instance.hide();
      }
    }
  },
  computed: {
    correctId() {
      if (this.id)
        return this.id.replaceAll(' ', '-') + '-modal';
      else
        return 'modal-' + Math.random().toString(16).slice(2);
    }
  }
};
</script>

<style lang="scss">
.modal .modal-dialog-scrollable .modal-body {
  overflow-y: scroll!important;
}
.modal:nth-of-type(even) {
    z-index: 1062 !important;
}
.modal-backdrop.show:nth-of-type(even) {
    z-index: 1061 !important;
}
</style>
